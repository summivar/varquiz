import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { StudysetsService } from "./studysets.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards";
import { User } from "../helper/decorators";
import {
  AddCardDto,
  AddStudysetDto,
  DeleteCardDto,
  DeleteStudysetDto,
  EditCardDto,
  EditStudysetDto,
  ShareStudysetDto
} from './dto';

@ApiTags('Учебные модули и карточки')
@Controller("studysets")
export class StudysetsController {
  constructor(private studysetService: StudysetsService) {}

  @ApiOperation({ summary: "Получение всех учебных модулей" })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Get("getmany")
  async getAll(@User() user) {
    const email: string = user?.email;
    return await this.studysetService.getMany(email);
  }

  @ApiOperation({ summary: "Получение учебного модуля" })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Get("get/:id")
  async getStudyset(@User() user, @Param('id') id: string) {
    const email: string = user?.email;
    return await this.studysetService.getOne(email, id);
  }

  @ApiOperation({ summary: "Добавление учебного модуля пользователю" })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Post("add")
  async add(@User() user, @Body() addStudysetDto: AddStudysetDto) {
    const email: string = user?.email;
    return await this.studysetService.addStudySet(email, addStudysetDto);
  }

  @ApiOperation({ summary: "Изменение учебного модуля пользователю" })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Put("edit")
  async edit(@User() user, @Body() editStudysetDto: EditStudysetDto) {
    const email: string = user?.email;
    return await this.studysetService.editStudySet(email, editStudysetDto);
  }

  @ApiOperation({ summary: "Удаление учебного модуля пользователю" })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Delete("delete")
  async delete(
    @User() user,
    @Body() deleteStudysetDto: DeleteStudysetDto
  ) {
    const email: string = user?.email;
    return await this.studysetService.deleteStudySet(email, deleteStudysetDto);
  }

  @ApiOperation({ summary: "Добавление доступа к учебному модулю создателем для второго пользователя" })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Post("sharestudyset")
  async share(@User() user, @Body() shareStudysetDto: ShareStudysetDto) {
    const email: string = user?.email;
    return await this.studysetService.shareStudysetToUser(email, shareStudysetDto);
  }

  @ApiOperation({ summary: "Получение всех карточек из учебного модуля" })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Get("getcards/:id")
  async getCards(@User() user, @Param('id') id: string) {
    const email: string = user?.email;
    return await this.studysetService.getCards(email, id);
  }

  @ApiOperation({ summary: "Получение всех карточек из учебного модуля" })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Get("getcard/:studysetId/card/:cardId")
  async getCardById(@User() user, @Param('studysetId') studysetId: string, @Param('cardId') cardId: string) {
    const email: string = user?.email;
    return await this.studysetService.getCardById(email, studysetId, cardId);
  }

  @ApiOperation({ summary: "Добавление карточки в учебный модуль" })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Post("addcard")
  async addCard(
    @User() user,
    @Body() addCardDto: AddCardDto
  ) {
    const email: string = user?.email;
    return await this.studysetService.addCardToStudyset(email, addCardDto);
  }

  @ApiOperation({ summary: "Изменение карточки в учебный модуль" })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Put("editcard")
  async editCard(
    @User() user,
    @Body() editCardDto: EditCardDto
  ) {
    const email: string = user?.email;
    return await this.studysetService.editCardToStudyset(email, editCardDto);
  }

  @ApiOperation({ summary: "Удаление карточки в учебном модуле" })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Delete("deletecard")
  async deleteCard(
    @User() user,
    @Body() deleteCardDto: DeleteCardDto
  ) {
    const email: string = user?.email;
    return await this.studysetService.deleteCardStudyset(email, deleteCardDto);
  }
}
