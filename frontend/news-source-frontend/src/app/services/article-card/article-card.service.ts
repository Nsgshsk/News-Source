import { map } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ArticleCard } from '../../models/ArticleCard';

const userArticlesLink = 'http://127.0.0.1:8000/api/feed/items/'

@Injectable({
  providedIn: 'root'
})
export class ArticleCardService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private authService: AuthService) { }

  getAll() {
    return this.http.get<ArticleCard[]>(userArticlesLink);
  }
}
