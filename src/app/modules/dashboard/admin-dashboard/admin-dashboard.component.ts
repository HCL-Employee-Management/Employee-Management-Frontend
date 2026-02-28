import { Component } from '@angular/core';
import { PayrollService } from 'src/app/core/services/payroll.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

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
