import { Component, OnInit } from '@angular/core';
import { PayrollService, Payroll } from 'src/app/core/services/payroll.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

  payrollList: Payroll[] = [];

  employeeId: number = 1;
  month: string = '';
  year: number = new Date().getFullYear();
  bonus: number = 0;

  totalPaid: number = 0;

  constructor(private payrollService: PayrollService) {}

  ngOnInit(): void {
    this.loadPayroll();
  }

  loadPayroll() {
    this.payrollService.getPayrollByEmployee(this.employeeId)
      .subscribe({
        next: (data) => {
          this.payrollList = data;
          this.calculateTotal();
        },
        error: (err) => console.error(err)
      });
  }

  calculateTotal() {
    this.totalPaid = 0;
    this.payrollList.forEach(p => {
      this.totalPaid += p.netSalary;
    });
  }

  generate() {
    const payload = {
      employeeId: this.employeeId,
      month: this.month,
      year: this.year,
      bonus: this.bonus
    };

    this.payrollService.generatePayroll(payload)
      .subscribe(() => {
        this.loadPayroll();
        this.bonus = 0;
      });
  }

  paySalary(month: string) {
    alert('Salary Paid Successfully for ' + month);
  }

  payAll() {
    alert('All salaries marked as Paid');
  }

}