import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface PayrollDto {
  payrollId: number;
  employeeId: number;
  employeeName: string;
  department:string;
  email:string;
  month: string;
  year: number;
  basicSalary: number;
  leaveDays: number;
  deduction: number;
  bonus: number;
  netSalary: number;
  status: string;
}

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {

  month!: string;
  year!: number;

  employee: any = {};
  basicSalary = 0;
  leaveDays = 0;
  deduction = 0;
  bonus = 0;
  status = 'Pending';

  salaryHistory: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    // ✅ Get current month & year
    const today = new Date();
    this.month = today.toLocaleString('default', { month: 'long' });
    this.year = today.getFullYear();

    this.loadPayroll();
  }

  loadPayroll() {

    // ✅ Get employeeId from login
    const employeeId = localStorage.getItem('employeeId');

    if (!employeeId) {
      console.error("Employee not logged in");
      return;
    }

    this.http.get<any[]>(
      `https://localhost:7123/api/payslip/${employeeId}`
    ).subscribe(res => {

      if (!res || res.length === 0) return;

      // 🔹 Current month record
      const current = res.find(p =>
        p.month === this.month && p.year === this.year
      );

      if (current) {

       this.employee = {
  name: current.employeeName,
  employeeId: current.employeeId,
  department: current.department,
  email: current.email
};

        this.basicSalary = current.basicSalary;
        this.leaveDays = current.leaveDays;
        this.deduction = current.deduction;
        this.bonus = current.bonus;
        this.status = current.status;
      }

      // 🔹 Salary History (only logged-in employee)
      this.salaryHistory = res.map(p => ({
        month: p.month + ' ' + p.year,
        basic: p.basicSalary,
        deduction: p.deduction,
        bonus: p.bonus,
        net: p.netSalary,
        status: p.status,

      }));
    });
  }

  get netSalary() {
    return this.basicSalary - this.deduction + this.bonus;
  }

  printPayslip() {
    window.print();
  }
}