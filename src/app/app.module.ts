import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AttendanceComponent } from './modules/attendance/attendance/attendance.component';
import { DummyLoginComponent } from './modules/dummy-login/dummy-login.component';
import { CommonModule } from '@angular/common';
import { LeaveComponent } from './modules/leave/leave/leave.component';
import { PayrollComponent } from './modules/payroll/payroll/payroll.component';
import { DashboardComponent } from './modules/dashboard/dashboard/employee-dashboard.component';

import { AdminLeaveComponent } from './modules/leave/admin-leave/admin-leave.component';
import { PayslipComponent } from './modules/payslip/payslip.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AdminAttendanceComponent } from './modules/attendance/admin-attendance/admin-attendance.component';
@NgModule({
  declarations: [
    AppComponent,
    AttendanceComponent,
    DummyLoginComponent,
    LeaveComponent,
    PayrollComponent,
    DashboardComponent,
    AdminLeaveComponent,
    PayslipComponent,
    SidebarComponent,
    LoginComponent,
    AdminAttendanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
