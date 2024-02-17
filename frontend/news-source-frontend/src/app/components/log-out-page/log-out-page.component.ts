import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-log-out-page',
  standalone: true,
  imports: [],
  templateUrl: './log-out-page.component.html',
  styleUrl: './log-out-page.component.css'
})
export class LogOutPageComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
      this.authService.userLogout();

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);  //5s
  }
}
