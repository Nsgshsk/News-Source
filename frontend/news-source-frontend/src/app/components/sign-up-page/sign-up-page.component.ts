import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Register } from '../../models/Register';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent implements OnInit {
  registerForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  errors = {
    message: '',
    any: false,
    email: '',
    password: '',
  }

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

  }

  userRegister() {
    this.authService.userRegister(this.registerForm.value as Register)
      .subscribe((data) => {
        if (data.message) {
          this.errors.message = data.message;

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);  //5s
        }
        else if (data.email || data.password) {
          this.errors.email = data.email[0];
          this.errors.password = data.password[0];
          this.errors.any = true;
        }
      })
  }
}
