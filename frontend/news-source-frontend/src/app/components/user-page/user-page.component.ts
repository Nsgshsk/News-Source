import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth/auth.service';
import { UserToken } from '../../models/User';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit{
  constructor (private jwtHelper: JwtHelperService, authServvice: AuthService) {}

  userName!: UserToken;

  ngOnInit(): void {
      //var infoToken = JSON.parse(localStorage.getItem('tokens') || '').access;
      this.userName = this.jwtHelper.decodeToken() as UserToken;
  }
}
