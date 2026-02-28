import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
     email!: string;
     password!: string;
     errorMessage: string = '';
   
     constructor(
       private router: Router,
       private authService: AuthService
     ) {}
   
login() {

  if (!this.email || !this.password) {
    this.errorMessage = "Please enter email and password";
    return;
  }

  this.authService.login(this.email, this.password)
    .subscribe({
      next: (res: any) => {

    if (res.employeeId) {
  localStorage.setItem('employeeId', res.employeeId);
} else {
  localStorage.removeItem('employeeId');
}

localStorage.setItem('role', res.role);

        // 🔥 Redirect based on role
        if (res.role === 'Admin') {
          this.router.navigate(['/admin/dashboard']);
        } 
        else if (res.role === 'Employee') {
  this.router.navigate(['/employee/dashboard']);
} 
        else {
          this.router.navigate(['/login']);
        }

      },
      error: (err: any) => {
        this.errorMessage = err.error || "Login failed";
      }
    });
}
}
