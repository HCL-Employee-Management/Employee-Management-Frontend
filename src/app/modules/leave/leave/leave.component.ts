import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/core/services/leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  employeeId!: number;
  leaveList: any[] = [];
  // totalRequested: number = 0;
  // totalApproved: number = 0;
  fromDate!: string;
  toDate!: string;
  reason!: string;
  totalRequestedDays: number = 0;
totalApprovedDays: number = 0;
  todayDate: string = '';
  isSubmitting: boolean = false;

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.employeeId = Number(localStorage.getItem('employeeId'));
    this.loadLeaves();

    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
  }

loadLeaves() {
  this.leaveService.getEmployeeLeaves(this.employeeId)
    .subscribe(data => {
      this.leaveList = data;

      this.totalRequestedDays = 0;
      this.totalApprovedDays = 0;

      this.leaveList.forEach(l => {

        const from = new Date(l.fromDate);
        const to = new Date(l.toDate);

        const diffTime = to.getTime() - from.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        // Add to requested
        this.totalRequestedDays += diffDays;

        // Add to approved only
        if (l.status === 'Approved') {
          this.totalApprovedDays += diffDays;
        }

      });
    });
}

  onFromDateChange() {
    if (this.toDate && this.toDate < this.fromDate) {
      this.toDate = '';
    }
  }

  applyLeave() {

    // 🔴 Validation
    if (!this.fromDate || !this.toDate || !this.reason) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill all fields'
      });
      return;
    }

    if (this.toDate < this.fromDate) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Dates',
        text: 'To Date cannot be before From Date'
      });
      return;
    }

    const leaveData = {
      employeeId: this.employeeId,
      fromDate: this.fromDate,
      toDate: this.toDate,
      reason: this.reason
    };

    this.isSubmitting = true;

    this.leaveService.applyLeave(leaveData)
      .subscribe({
        next: () => {

          this.loadLeaves();
          this.resetForm();
          this.closeModal();

          Swal.fire({
            icon: 'success',
            title: 'Leave Applied!',
            text: 'Your leave request has been submitted successfully.',
            timer: 2000,
            showConfirmButton: false
          });

          this.isSubmitting = false;
        },
        error: (err) => {

          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.error || 'Something went wrong'
          });

          this.isSubmitting = false;
        }
      });
  }

  resetForm() {
    this.fromDate = '';
    this.toDate = '';
    this.reason = '';
  }

  closeModal() {
    const modalElement = document.getElementById('applyLeaveModal');
    if (modalElement) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  }
}