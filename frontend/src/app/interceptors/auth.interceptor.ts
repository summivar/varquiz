import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configuration} from '@app/configuration';
import { AuthService } from '@app/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userResponse = this.authService.userData;
    const isLoggedIn = this.authService.isAuth;
    const isApiUrl = request.url.startsWith(configuration.API_URL);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userResponse.token}`,
          "ngrok-skip-browser-warning": "69420"
        }
      });
    }

    return next.handle(request);
  }
}
