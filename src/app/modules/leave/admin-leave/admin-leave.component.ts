import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/core/services/leave.service';

@Component({
  selector: 'app-admin-leave',
  templateUrl: './admin-leave.component.html',
  styleUrls: ['./admin-leave.component.css']
})

export class AdminLeaveComponent implements OnInit {

  leaveList: any[] = [];

  totalLeaves = 0;
  pendingCount = 0;
  approvedCount = 0;
  rejectedCount = 0;

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves() {
    this.leaveService.getAllLeaves().subscribe(data => {
      this.leaveList = data;
      this.calculateSummary();
    });
  }

  calculateSummary() {

    this.totalLeaves = this.leaveList.length;

    this.pendingCount = this.leaveList.filter(
      x => x.status === 'Pending'
    ).length;

    this.approvedCount = this.leaveList.filter(
      x => x.status === 'Approved'
    ).length;

    this.rejectedCount = this.leaveList.filter(
      x => x.status === 'Rejected'
    ).length;
  }

  approve(id: number) {
    this.leaveService.approveLeave(id).subscribe(() => {
      this.loadLeaves();
    });
  }

  reject(id: number) {
    this.leaveService.rejectLeave(id).subscribe(() => {
      this.loadLeaves();
    });
  }
}

