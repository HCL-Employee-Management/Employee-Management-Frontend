import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendanceComponent } from './modules/attendance/attendance/attendance.component';
import { LeaveComponent } from './modules/leave/leave/leave.component';
import { DashboardComponent } from './modules/dashboard/dashboard/employee-dashboard.component';
import { PayrollComponent } from './modules/payroll/payroll/payroll.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AdminDashboardComponent } from './modules/dashboard/admin-dashboard/admin-dashboard.component';
import { EmployeeListComponent } from './modules/employees/employee-list/employee-list.component';
import { AdminAttendanceComponent } from './modules/attendance/admin-attendance/admin-attendance.component';
import { AdminLeaveComponent } from './modules/leave/admin-leave/admin-leave.component';
import { EmployeeDashboardComponent } from './modules/dashboard/employee-dashboard/employee-dashboard.component';
import { PayslipComponent } from './modules/payslip/payslip.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },

  // ADMIN ROUTES
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/employees', component: EmployeeListComponent },
  { path: 'admin/attendance', component: AdminAttendanceComponent },
  { path: 'admin/leave-requests', component: AdminLeaveComponent },
  { path: 'admin/payroll', component: PayrollComponent},

  // EMPLOYEE ROUTES
  { path: 'employee/dashboard', component: EmployeeDashboardComponent },
  { path: 'employee/attendance', component: AttendanceComponent },
  { path: 'employee/leave', component: LeaveComponent },
  { path: 'employee/payslip', component: PayslipComponent},

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
