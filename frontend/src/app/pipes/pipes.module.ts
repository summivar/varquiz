import { NgModule } from '@angular/core';
import { UtcToLocalTimePipe } from '@app/pipes/utc-pipe/utc-converter.pipe';
import { UtcConverterService } from '@app/services';

@NgModule({
  declarations: [
    UtcToLocalTimePipe
  ],
  providers: [
    UtcConverterService,
  ],
  exports: [
    UtcToLocalTimePipe
  ]
})
export class PipesModule {}
