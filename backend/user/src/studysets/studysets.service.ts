import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AddCardDto,
  AddStudysetDto,
  DeleteCardDto,
  DeleteStudysetDto,
  EditCardDto,
  EditStudysetDto,
  ShareStudysetDto,
} from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument, Studyset, StudysetDocument } from './schemas';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas';
import { HelperService } from '../helper/services';
import { ObjectId } from 'mongodb';
import { GetCards } from './types';

@Injectable()
export class StudysetsService {
  constructor(
    @InjectModel(Studyset.name) private studysetModel: Model<StudysetDocument>,
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    private usersService: UsersService,
    private helperService: HelperService
  ) {
  }

  async getMany(email: string) {
    return this.studysetModel.find({createdBy: email});
  }

  async getOne(email: string, id: string) {
    const studysetObjectId = this.helperService.convertStringToObjectId(id);
    const studyset = await this.studysetModel.findOne({
      _id: studysetObjectId,
      accessTo: email,
    });
    if (!studyset) {
      throw new BadRequestException({
        message: 'У вас нет такого учебного модуля или доступа к нему',
      });
    }
    return studyset;
  }

  async getCards(email: string, id: string): Promise<GetCards> {
    const studysetObjectId = this.helperService.convertStringToObjectId(id);
    const studyset = await this.studysetModel.findOne({
      _id: studysetObjectId,
      accessTo: email,
    });
    if (!studyset) {
      throw new BadRequestException({
        message: 'У вас нет такого учебного модуля или доступа к нему',
      });
    }
    const cards: CardDocument[] = [];
    for (const cardId of studyset.cards) {
      const card = await this.cardModel.findById(cardId);
      cards.push(card);
    }
    return {
      studyset,
      cards,
    };
  }

  async getCardById(email: string, studysetId: string, cardId: string) {
    const studysetObjectId = this.helperService.convertStringToObjectId(studysetId);
    const cardObjectId = this.helperService.convertStringToObjectId(cardId);
    const studyset = await this.studysetModel.findOne({
      _id: studysetObjectId,
      accessTo: email,
    });
    if (!studyset) {
      throw new BadRequestException({
        message: 'У вас нет такого учебного модуля или доступа к нему',
      });
    }
    if (!studyset.cards.includes(cardObjectId)) {
      throw new BadRequestException({
        message: 'Нет такой карточки в учебном модуле'
      })
    }
    const card = await this.cardModel.findById(cardObjectId);
    if (!card) {
      throw new BadRequestException({
        message: 'Не найдена карточка'
      })
    }

    return card;
  }

  async addStudySet(email: string, addStudysetDto: AddStudysetDto) {
    const user = await this.usersService.getUserByEmail(email);
    this.usersService.isUserData(user);

    const newStudyset = await this.studysetModel.create({
      title: addStudysetDto.title,
      description: addStudysetDto.description,
      createdBy: email,
      accessTo: email
    });

    user.studysets.push(newStudyset._id);

    await user.save();

    return newStudyset;
  }

  async editStudySet(email: string, editStudysetDto: EditStudysetDto) {
    const user = await this.usersService.getUserByEmail(email);
    this.usersService.isUserData(user);

    const updateData = {
      title: editStudysetDto.title,
      description: editStudysetDto.description,
    };

    const studySetObjectId = this.helperService.convertStringToObjectId(
      editStudysetDto.studysetId
    );

    const candidateStudySet = await this.studysetModel.findOneAndUpdate(
      {
        _id: studySetObjectId,
        createdBy: email,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!candidateStudySet) {
      throw new BadRequestException({
        message: 'У вас нет такого учебного модуля или доступа к нему',
      });
    }

    return await candidateStudySet.save();
  }

  async deleteStudySet(email: string, deleteStudysetDto: DeleteStudysetDto) {
    const user = await this.usersService.getUserByEmail(email);
    this.usersService.isUserData(user);

    const studySetObjectId = this.helperService.convertStringToObjectId(
      deleteStudysetDto.studysetId
    );

    const deletedStudyset = await this.studysetModel.findOneAndDelete({
      _id: studySetObjectId,
      createdBy: email,
    });

    if (!deletedStudyset) {
      throw new BadRequestException({
        message: 'У вас нет такого учебного модуля или доступа к нему',
      });
    }

    for (const cardId of deletedStudyset.cards) {
      await this.deleteCard(cardId);
    }

    await this.usersService.deleteStudysetFromUser(user, deletedStudyset._id);

    return deletedStudyset;
  }

  async shareStudysetToUser(email: string, shareStudysetDto: ShareStudysetDto) {
    const user = await this.usersService.getUserByEmail(email);
    this.usersService.isUserData(user);

    const studyset = await this.getUserStudysetById(shareStudysetDto.studysetId, user);
    const isUserExist = await this.usersService.isUserExistByEmail(shareStudysetDto.accessToEmail);
    if (!isUserExist) {
      throw new BadRequestException({
        message: 'Не найден указанный пользователь'
      });
    }
    if (studyset.createdBy === shareStudysetDto.accessToEmail) {
      throw new BadRequestException({
        message: 'Невозможно дать доступ к учебному модулю создателю учебного модуля'
      });
    }
    if (studyset.accessTo.some((email) => email === shareStudysetDto.accessToEmail)) {
      throw new BadRequestException({
        message: 'Невозможно добавить доступ к учебному модулю человеку, у которого уже есть доступ'
      });
    }
    studyset.accessTo.push(shareStudysetDto.accessToEmail);
    return await studyset.save();
  }

  async addCardToStudyset(email: string, addCardDto: AddCardDto) {
    const user = await this.usersService.getUserByEmail(email);
    this.usersService.isUserData(user);

    const studyset = await this.getUserStudysetById(
      addCardDto.studysetId,
      user
    );
    const newCard = await this.cardModel.create({
      term: addCardDto.term,
      definition: addCardDto.definition,
    });
    studyset.cards.push(newCard._id);
    await studyset.save();

    return newCard;
  }

  async editCardToStudyset(email: string, editCardDto: EditCardDto) {
    const user = await this.usersService.getUserByEmail(email);
    this.usersService.isUserData(user);

    const cardObjectId = this.helperService.convertStringToObjectId(
      editCardDto.cardId
    );
    const studysetObjectId = this.helperService.convertStringToObjectId(
      editCardDto.studysetId
    );

    const updateData = {
      term: editCardDto.term,
      definition: editCardDto.definition,
    };

    const studyset = await this.getUserStudysetById(studysetObjectId, user);

    await this.isStudysetHasCard(studyset, cardObjectId);

    return this.cardModel.findByIdAndUpdate(cardObjectId, updateData, {
      new: true,
    });
  }

  async deleteCardStudyset(email: string, deleteCardDto: DeleteCardDto) {
    const user = await this.usersService.getUserByEmail(email);
    this.usersService.isUserData(user);

    const studySetObjectId = this.helperService.convertStringToObjectId(
      deleteCardDto.studysetId
    );
    const cardObjectId = this.helperService.convertStringToObjectId(
      deleteCardDto.cardId
    );

    const studyset = await this.getUserStudysetById(studySetObjectId, user);

    await this.isStudysetHasCard(studyset, cardObjectId);

    const deletedCard = await this.cardModel.findOneAndDelete({
      _id: cardObjectId,
    });

    await this.deleteCardFromStudyset(studyset, cardObjectId);

    return deletedCard;
  }

  async getUserStudysetById(id: string | ObjectId, user: User) {
    let studysetObjectId: ObjectId;
    if (typeof id === 'string') {
      studysetObjectId = this.helperService.convertStringToObjectId(id);
    } else {
      studysetObjectId = id;
    }

    const studyset = await this.studysetModel.findOne({
      _id: studysetObjectId,
      createdBy: user.email,
    });

    if (!studyset) {
      throw new BadRequestException({
        message: 'У вас нет такого учебного модуля или доступа к нему',
      });
    }

    return studyset;
  }

  async getStudysetByCardId(id: ObjectId) {
    return this.studysetModel.findOne({cards: id});
  }

  private async deleteCard(cardId: ObjectId) {
    await this.cardModel.findByIdAndDelete(cardId);
  }

  private async deleteCardFromStudyset(
    studyset: StudysetDocument,
    cardId: ObjectId
  ) {
    const cardIndex = studyset.cards.indexOf(cardId);

    if (cardIndex !== -1) {
      studyset.cards.splice(cardIndex, 1);
      await studyset.save();
    } else {
      throw new BadRequestException({
        message: 'Card ID не найден в массиве cards учебного модуля',
      });
    }
  }

  private async isStudysetHasCard(studyset: Studyset, cardId: ObjectId) {
    if (!studyset.cards.includes(cardId)) {
      throw new BadRequestException({
        message: 'В учебном модуле нет такой карточки',
      });
    }
    return true;
  }
}
