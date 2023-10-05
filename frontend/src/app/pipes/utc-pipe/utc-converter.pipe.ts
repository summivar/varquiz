import { Pipe, PipeTransform } from '@angular/core';
import { UtcConverterService } from '@app/services';

@Pipe({
  name: 'utcToLocalTime',
})
export class UtcToLocalTimePipe implements PipeTransform {

  constructor(private _dateConverter: UtcConverterService) {
  }

  transform(date: string, args?: any): string {
    return this._dateConverter.convertUtcToLocalTime(date, args);
  }
}
