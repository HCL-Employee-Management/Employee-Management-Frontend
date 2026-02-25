import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  employeeId!: number;
  attendanceList: any[] = [];
  attendancePercentage: number = 0;
  todayStatus: string = 'Absent';

  constructor(
    private attendanceService: AttendanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = Number(localStorage.getItem('employeeId'));
    this.loadHistory();
    this.loadPercentage();
  }

  login() {
    this.attendanceService.markLogin(this.employeeId).subscribe({
      next: () => {
        alert("Login marked successfully");
        this.loadHistory();
      },
      error: (err) => {
  console.log("LOGIN ERROR:", err);
  alert(err.error || "Something went wrong");
}
    });
  }

  logout() {
    this.attendanceService.markLogout(this.employeeId).subscribe({
      next: () => {
        alert("Logout marked successfully");
        this.loadHistory();
      },
      error: (err) => {
        alert(this.getErrorMessage(err));
      }
    });
  }

  loadHistory() {
    this.attendanceService
      .getAttendanceHistory(this.employeeId)
      .subscribe(data => {
        this.attendanceList = data;
        this.setTodayStatus();
      });
  }

  loadPercentage() {
    const today = new Date();
    this.attendanceService
      .getAttendancePercentage(
        this.employeeId,
        today.getMonth() + 1,
        today.getFullYear()
      )
      .subscribe(res => {
        this.attendancePercentage = res.attendancePercentage;
      });
  }

  setTodayStatus() {
    const today = new Date().toDateString();

    const todayRecord = this.attendanceList.find(
      x => new Date(x.date).toDateString() === today
    );

    if (!todayRecord) {
      this.todayStatus = 'Absent';
    } else if (todayRecord.loginTime && !todayRecord.logoutTime) {
      this.todayStatus = 'Logged In';
    } else if (todayRecord.logoutTime) {
      this.todayStatus = 'Present';
    }
  }

  getErrorMessage(err: any): string {
    if (typeof err.error === 'string') return err.error;
    if (err.error?.title) return err.error.title;
    return "Something went wrong";
  }

  switchUser() {
    localStorage.removeItem('employeeId');
    this.router.navigate(['/']);
  }
}