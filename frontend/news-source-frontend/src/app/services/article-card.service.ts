import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleCard } from '../models/ArticleCard';

const baseUrl = ''

@Injectable({
  providedIn: 'root'
})
export class ArticleCardService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<ArticleCard[]>{
    return this.http.get<ArticleCard[]>(baseUrl);
  }
}
