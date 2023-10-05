import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '@app/models';
import { configuration } from '@app/configuration';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public get userData(): UserResponse {
    return JSON.parse(localStorage.getItem('auth')!);
  }

  public get isAuth(): boolean {
    return !!JSON.parse(localStorage.getItem('auth')!)?.user?.email;
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(
      configuration.API_URL + 'auth/signin',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  public register(email: string, password: string): Observable<any> {
    return this.http.post(
      configuration.API_URL + 'auth/signup',
      {
        email,
        password,
      },
      httpOptions
    );
  }
}
