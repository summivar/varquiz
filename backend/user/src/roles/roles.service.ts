import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role, RolesDocument } from "./schemas";
import { AddRoleDto, CreateRoleDto } from "./dto";
import { UsersService } from "../users/users.service";
import { AddRoleSuccess, CreateRoleSuccess } from "./types";

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RolesDocument>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
  ) {}

  async createNewRole(
    createRoleDto: CreateRoleDto
  ): Promise<CreateRoleSuccess> {
    const role = await this.roleModel.create({
      value: createRoleDto.value,
      description: createRoleDto.description,
    });

    return {
      message: "Успешно создано",
    };
  }

  async addRoleUser(addRoleDto: AddRoleDto): Promise<AddRoleSuccess> {
    const user = await this.usersService.getUserById(addRoleDto.userId);
    const role = await this.getRoleByValue(addRoleDto.value);
    if (!user || !role) {
      throw new BadRequestException(
        "Не найден пользователь или указана неправильная роль"
      );
    }

    user.roles.push(role.value);
    await user.save();

    return {
      message: "Роль добавлена пользователю",
    };
  }

  async getDefaultValueRole() {
    const role = await this.roleModel.findOne({ value: "USER" });

    if (!role) {
      const userRole = await this.roleModel.create({
        value: "USER",
        description: "Пользователь",
      });
      const adminRole = await this.roleModel.create({
        value: "ADMIN",
        description: "Администратор",
      });
      return userRole.value;
    }
    return role.value;
  }

  async getRoleByValue(value: string) {
    return this.roleModel.findOne({ value: value });
  }
}
