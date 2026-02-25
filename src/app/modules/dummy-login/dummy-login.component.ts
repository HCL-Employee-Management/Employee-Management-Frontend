import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dummy-login',
  templateUrl: './dummy-login.component.html',
  styleUrls: ['./dummy-login.component.css']
})
export class DummyLoginComponent {

  email!: string;
  password!: string;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    this.authService.login(this.email, this.password)
      .subscribe({
        next: (res:any) => {
          localStorage.setItem('employeeId', res.employeeId);
          localStorage.setItem('role', res.role);
          this.router.navigate(['/attendance']);
        },
        error: (err:any) => {
          this.errorMessage = err.error || "Login failed";
        }
      });
  }
}