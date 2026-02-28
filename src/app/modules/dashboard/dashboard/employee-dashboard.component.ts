import { Component, OnInit } from '@angular/core';
import { PayrollService } from 'src/app/core/services/payroll.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   totalEmployees = 4;
  presentToday = 4;
  pendingLeaves = 1;

  salaryPaid = 242000;
  salaryPercentage = 85;

  attendancePercentage = 100;
  leaveApprovalPercentage = 33;

  constructor(private payrollService: PayrollService) {}

  ngOnInit() {
    // If backend percentage API added, call here
  }
}
