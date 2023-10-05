import { BadRequestException, Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";

@Injectable()
export class HelperService {
  capitalizeFirstLetter(string: string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  convertStringToObjectId(string: string) {
    try {
      return new ObjectId(string);
    } catch (e) {
      throw new BadRequestException({
        message: "Неверный ID",
      });
    }
  }
}
