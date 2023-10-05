import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AddRoleDto, CreateRoleDto } from "./dto";
import { RolesGuard } from "../auth/guards";
import { Roles } from "../auth/decorators";

@ApiTags("Роли")
@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({
    summary:
      "Добавление новой роли (доступно только пользователям с ролью ADMIN)",
  })
  @ApiBearerAuth("JWT-auth")
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("createnewrole")
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.createNewRole(createRoleDto);
  }

  @ApiOperation({
    summary:
      "Добавление роли пользователю (доступно только пользователям с ролью ADMIN)",
  })
  @ApiBearerAuth("JWT-auth")
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("addnewrole")
  async addRole(@Body() addRoleDto: AddRoleDto) {
    return await this.rolesService.addRoleUser(addRoleDto);
  }
}
