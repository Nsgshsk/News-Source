import { MessageAPI } from './../../models/MessageAPI';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogIn } from '../../models/LogIn';
import { Token } from '../../models/Token';
import { catchError, map, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Register } from '../../models/Register';

const baseRegister: string = 'http://127.0.0.1:8000/api/auth/register/'
const baseLogin: string = 'http://127.0.0.1:8000/api/auth/token/'
const baseRefresh: string = 'http://127.0.0.1:8000/api/auth/token/refresh/'
const baseLogout: string = 'http://127.0.0.1:8000/api/auth/token/blacklist/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  jwtHelper = new JwtHelperService();

  getTokens(): Token {
    var tokens: Token = {
      refresh: localStorage.getItem("refresh") || '',
      access: localStorage.getItem("access") || '',
    }
    return tokens;
  }

  changeTokens(tokens: Token) {
    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);
  }

  removeTokens() {
    localStorage.clear()
  }

  isRefreshExpired() {
    var refreshToken = localStorage.getItem('refresh');
    if (refreshToken)
      return this.jwtHelper.isTokenExpired(refreshToken);
    else
      return true
  }

  userLogout() {
    var payload = this.getTokens();
    var payloadJson = {
      "refresh": payload.refresh
    }
    this.http.post(baseLogout, payloadJson).subscribe();
    this.removeTokens();
  }

  userRegister(payload: Register) {
    return this.http.post(baseRegister, payload).pipe(
      map(
        (data) => {
          return data as MessageAPI;
        }),
      catchError(
        (error) => {
          console.log(error);

          let data: MessageAPI = {
            message: '',
            email: error.error.email ?? [],
            password: error.error.password ?? []
          }

          return of(data);
        }
      )
    )
  }

  userLogin(payload: LogIn) {
    return this.http.post(baseLogin, payload).pipe(
      map(
        (data) => {
          var tokens = data as Token;

          this.changeTokens(tokens)

          return true;
        }),
      catchError(
        (error) => {
          console.log(error);
          return of(false)
        }
      )
    )
  }

  refreshTokens() {
    var payload = this.getTokens();
    return this.http.post(baseRefresh, payload).pipe(
      map(
        (data) => {
          var tokens = data as Token;

          this.changeTokens(tokens);

          return !this.jwtHelper.isTokenExpired(tokens.access);
        }),
      catchError(
        (error) => {
          console.log(error);
          return of(false);
        }
      )
    )
  }
}
