import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LogIn } from '../../models/LogIn';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './log-in-page.component.html',
  styleUrl: './log-in-page.component.css'
})
export class LogInPageComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor (private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
      if (!this.authService.isRefreshExpired())
        this.router.navigate(['/personal']);
  }

  userLogin() {
    var loginData = this.loginForm.value as LogIn;
    if (loginData.email && loginData.password) {
      this.authService.userLogin(loginData).subscribe((data) => {
        if(data) {
          this.router.navigate(["/personal"]);
        }
        else {
          console.log('failed');
        }
      });
    }
    else {
      console.log('failed');
    }
    
  }
}
