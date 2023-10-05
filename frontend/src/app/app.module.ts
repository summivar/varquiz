import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from '@app/services';
import { AuthInterceptor, ErrorInterceptor } from '@app/interceptors';
import { ComponentsModule } from '@app/components/components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    ComponentsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
