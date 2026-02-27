import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyLoginComponent } from './modules/dummy-login/dummy-login.component';
import { AttendanceComponent } from './modules/attendance/attendance/attendance.component';
import { LeaveComponent } from './modules/leave/leave/leave.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { PayrollComponent } from './modules/payroll/payroll/payroll.component';

const routes: Routes = [
  { path: '', component: DummyLoginComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'leave', component: LeaveComponent },
   { path: 'dashboard', component: DashboardComponent },
  { path: 'payroll', component: PayrollComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
