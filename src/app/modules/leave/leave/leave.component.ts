import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/core/services/leave.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  employeeId!: number;
  leaveList: any[] = [];

  fromDate!: string;
  toDate!: string;
  reason!: string;

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.employeeId = Number(localStorage.getItem('employeeId'));
    this.loadLeaves();
  }

  loadLeaves() {
    this.leaveService.getEmployeeLeaves(this.employeeId)
      .subscribe(data => {
        this.leaveList = data;
      });
  }

  applyLeave() {
    const leaveData = {
      employeeId: this.employeeId,
      fromDate: this.fromDate,
      toDate: this.toDate,
      reason: this.reason
    };

    this.leaveService.applyLeave(leaveData)
      .subscribe({
        next: () => {
          alert("Leave applied successfully");
          this.loadLeaves();
        },
        error: (err) => {
  console.log("FULL ERROR:", err);
  alert(err.error || "Error applying leave");
}
      });
  }
}