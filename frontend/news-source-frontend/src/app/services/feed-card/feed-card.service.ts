import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth/auth.service';
import { FeedCard } from '../../models/FeedCard';

const feedsLink = 'http://127.0.0.1:8000/api/feed/allfeeds/'
const userFeedsLink = 'http://127.0.0.1:8000/api/feed/'

@Injectable({
  providedIn: 'root'
})
export class FeedCardService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private authService: AuthService) { }

  getAllFeeds() {
    return this.http.get<FeedCard[]>(feedsLink);
  }

  getUserFeeds() {
    return this.http.get<FeedCard[]>(userFeedsLink);
  }

  removeUserFeed(id: number) {
    const options = {
      body: {
        feedids: id,
      },
    };
    if (id > -1) {
      this.http.delete(userFeedsLink, options).subscribe();
      return true;
    }
    else
      return false
  }

  addUserFeed(id: number) {
    const data = {
      feedids: id
    }
    if (id > -1) {
      this.http.post(userFeedsLink, data).subscribe();
      return true;
    }
    else
      return false
  }
}
