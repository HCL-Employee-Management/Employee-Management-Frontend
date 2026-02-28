import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/core/services/leave.service';
import Swal from 'sweetalert2';
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

  Swal.fire({
    title: 'Approve Leave?',
    text: 'Are you sure you want to approve this leave request?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Approve'
  }).then((result) => {

    if (result.isConfirmed) {

      this.leaveService.approveLeave(id).subscribe(() => {

        Swal.fire({
          icon: 'success',
          title: 'Approved!',
          text: 'Leave has been approved.',
          timer: 2000,
          showConfirmButton: false
        });

        this.loadLeaves();
      });

    }

  });
}

 reject(id: number) {

  Swal.fire({
    title: 'Reject Leave?',
    text: 'Are you sure you want to reject this leave request?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, Reject'
  }).then((result) => {

    if (result.isConfirmed) {

      this.leaveService.rejectLeave(id).subscribe(() => {

        Swal.fire({
          icon: 'success',
          title: 'Rejected!',
          text: 'Leave has been rejected.',
          timer: 2000,
          showConfirmButton: false
        });

        this.loadLeaves();
      });

    }

  });
}
}

