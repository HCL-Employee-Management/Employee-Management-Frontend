import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  presentDays: number = 0;
  employeeId!: number;
  attendanceList: any[] = [];
  attendancePercentage: number = 0;
  todayStatus: string = 'Absent';
  workingDaysTillToday: number = 0;
  constructor(
    private attendanceService: AttendanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = Number(localStorage.getItem('employeeId'));
    this.loadHistory();
    this.loadPercentage();
    this.calculateWorkingDaysTillToday();
  }

login() {
  this.attendanceService.markLogin(this.employeeId).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Login Marked',
        text: 'Attendance marked successfully!',
        timer: 2000,
        showConfirmButton: false
      });

      this.loadHistory();
      this.loadPercentage();
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.error || "Something went wrong"
      });
    }
  });
}

logout() {

  const todayRecord = this.attendanceList.find(
    x => new Date(x.date).toDateString() === new Date().toDateString()
  );

  if (todayRecord?.loginTime) {

    const loginTime = new Date(todayRecord.loginTime);
    const now = new Date();

    const hoursWorked =
      (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);

    if (hoursWorked < 8) {

      Swal.fire({
        title: 'Early Logout',
        text: `You worked only ${hoursWorked.toFixed(2)} hours. Are you sure you want to logout?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Logout',
        cancelButtonText: 'Cancel'
      }).then((result) => {

        if (result.isConfirmed) {
          this.confirmLogout();
        }

      });

      return;
    }
  }

  this.confirmLogout();
}

  loadHistory() {
  this.attendanceService
    .getAttendanceHistory(this.employeeId)
    .subscribe(data => {
      this.attendanceList = data;
      this.calculatePresentDays();
      this.setTodayStatus();
    });
}
calculatePresentDays() {
  this.presentDays = this.attendanceList.filter(
    x => x.loginTime
  ).length;
}

  loadPercentage() {
    const today = new Date();
    this.attendanceService
      .getAttendancePercentage(
        this.employeeId,
        today.getMonth() + 1,
        today.getFullYear()
      )
      .subscribe((res: any) => {
  console.log(res);
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
confirmLogout() {
  this.attendanceService.markLogout(this.employeeId).subscribe({
    next: () => {

      Swal.fire({
        icon: 'success',
        title: 'Logout Marked',
        text: 'Logout recorded successfully!',
        timer: 2000,
        showConfirmButton: false
      });

      this.loadHistory();
      this.loadPercentage();
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: this.getErrorMessage(err)
      });
    }
  });
}
  getErrorMessage(err: any): string {
    if (typeof err.error === 'string') return err.error;
    if (err.error?.title) return err.error.title;
    return "Something went wrong";
  }

  calculateWorkingDaysTillToday() {

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based

  let count = 0;

  for (let day = 1; day <= today.getDate(); day++) {

    const date = new Date(year, month, day);

    if (date.getDay() !== 0) { // 0 = Sunday
      count++;
    }
  }

  this.workingDaysTillToday = count;
}
}