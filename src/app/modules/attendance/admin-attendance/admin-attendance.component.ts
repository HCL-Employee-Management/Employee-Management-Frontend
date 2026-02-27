import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/core/services/attendance.service';

@Component({
  selector: 'app-admin-attendance',
  templateUrl: './admin-attendance.component.html',
  styleUrls: ['./admin-attendance.component.css']
})
export class AdminAttendanceComponent implements OnInit {

  attendanceList: any[] = [];

  totalEmployees: number = 0;
  presentCount: number = 0;
  absentCount: number = 0;
  onLeaveCount: number = 0;
  attendancePercentage: number = 0;

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.loadTodayAttendance();
  }

  loadTodayAttendance() {
    this.attendanceService.getTodayAttendance()
      .subscribe(data => {
        this.attendanceList = data;
        this.calculateSummary();
      });
  }

calculateSummary() {

  this.totalEmployees = this.attendanceList.length;

  this.presentCount = this.attendanceList.filter(
    x => x.loginTime
  ).length;

  this.absentCount =
    this.totalEmployees - this.presentCount;

  this.attendancePercentage =
    this.totalEmployees > 0
      ? Math.round((this.presentCount / this.totalEmployees) * 100)
      : 0;
}
}