import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersDocument } from './schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RolesService } from '../roles/roles.service';
import { SignUpUserDto } from '../auth/dto';
import { UpdateUserDto } from './dto';
import { ObjectId } from 'mongodb';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuid } from 'uuid';
import { UserResponse } from './types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
    @Inject('EMAIL_SERVICE') private readonly emailClient: ClientProxy,
    private rolesService: RolesService
  ) {
  }

  async create(signUpUserDto: SignUpUserDto) {
    const activationLink = uuid();
    const userRole = await this.rolesService.getDefaultValueRole();
    const newUser = new this.userModel({
      email: signUpUserDto.email.trim(),
      password: signUpUserDto.password.trim(),
      activationLink: activationLink,
      roles: userRole
    });
    const responseEmail = await firstValueFrom(this.emailClient.send('sendMailConfirmation', {
      to: signUpUserDto.email,
      subject: 'Confirm email | Varapp Service',
      template: 'confirmEmail',
      text: activationLink
    }));
    return await newUser.save();
  }

  async updateUserDataByEmail(email: string, dataToUpdate: UpdateUserDto) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      {email: email},
      dataToUpdate,
      {
        new: true
      }
    );

    if (!updatedUser) {
      throw new UnauthorizedException();
    }

    return this.getResponseFromUser(updatedUser);
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({email: email.trim()});
  }

  async getUserById(id: string) {
    return this.userModel.findById(id.trim());
  }

  async getUserByActivationLink(activationLink: string) {
    return this.userModel.findOne({activationLink: activationLink});
  }

  async getUserDataByEmail(email: string) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.getResponseFromUser(user);
  }

  async deleteStudysetFromUser(user: UsersDocument, id: ObjectId) {
    const studysetIndex = user.studysets.indexOf(id);

    if (studysetIndex !== -1) {
      user.studysets.splice(studysetIndex, 1);
      await user.save();
    } else {
      throw new BadRequestException({
        message: 'Studyset ID не найден в массиве studysets пользователя'
      });
    }
  }


  async confirmMail(activationLink: string) {
    const user = await this.getUserByActivationLink(activationLink);
    if (!user) {
      throw new BadRequestException({
        message: 'Не найден пользователь по ссылке активации'
      });
    }
    user.isEmailActivated = true;
    await user.save();

    return {
      message: 'Почта подтверждена'
    };
  }

  isUserData(user: User) {
    if (!user) {
      throw new UnauthorizedException({
        message: 'Не существует такого пользователя'
      });
    }
    return true;
  }

  async isUserExistByEmail(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({email: email});
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  isUserHasStudyset(user: User, studysetId: ObjectId) {
    return user.studysets.some((studyset) => studyset === studysetId);
  }

  getResponseFromUser(user: any): UserResponse {
    const responseUser = user;
    delete responseUser._doc.password;
    return responseUser;
  }
}
