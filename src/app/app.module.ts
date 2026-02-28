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
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    AttendanceComponent,
    DummyLoginComponent,
    LeaveComponent,
    PayrollComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
