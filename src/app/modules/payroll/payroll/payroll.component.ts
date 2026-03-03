import { Component, OnInit } from '@angular/core';
import { PayrollDto, PayrollService } from 'src/app/core/services/payroll.service';


@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

  payrollList: PayrollDto[] = [];
  bonusAmount: number = 0;

 month: string = '';
year: number = 0;

 constructor(private payrollService: PayrollService) {}
ngOnInit(): void {

  const today = new Date();

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  this.month = months[today.getMonth()];   // current month name
  this.year = today.getFullYear();         // current year
  this.generatePayroll();
  this.loadPayroll();
}

  loadPayroll() {
    this.payrollService.getPayroll(this.month, this.year)
      .subscribe(data => {
        this.payrollList = data;
      });
  }

  applyBonusToAll() {
    if (!this.bonusAmount) return;

    this.payrollService
      .applyBonusToAll(this.month, this.year, this.bonusAmount)
      .subscribe(() => {
        this.bonusAmount = 0;
        this.loadPayroll();
      });
  }

  addBonus(emp: PayrollDto, bonusInput: HTMLInputElement) {
    const bonus = Number(bonusInput.value);
    if (!bonus) return;

    this.payrollService.addBonus(emp.payrollId, bonus)
      .subscribe(() => {
        bonusInput.value = '';
        this.loadPayroll();
      });
  }

  pay(emp: PayrollDto) {
    this.payrollService.pay(emp.payrollId)
      .subscribe(() => this.loadPayroll());
  }

  payAll() {
    this.payrollService.payAll(this.month, this.year)
      .subscribe(() => this.loadPayroll());
  }

  get totalPaid() {
    return this.payrollList
      .filter(e => e.status === 'Paid')
      .reduce((sum, e) => sum + e.netSalary, 0);
  }

  get totalPending() {
    return this.payrollList
      .filter(e => e.status === 'Pending')
      .reduce((sum, e) => sum + e.netSalary, 0);
  }

  get paidPercent() {
    if (!this.payrollList.length) return 0;
    const paid = this.payrollList.filter(e => e.status === 'Paid').length;
    return Math.round((paid / this.payrollList.length) * 100);
  }
  get pendingPayrolls() {
  return this.payrollList.filter(e => e.status === 'Pending');
}

get paidPayrolls() {
  return this.payrollList.filter(e => e.status === 'Paid');
}

generatePayroll() {
  this.payrollService
    .generatePayroll(this.month, this.year)
    .subscribe(() => {
      this.loadPayroll();
    });
}
}