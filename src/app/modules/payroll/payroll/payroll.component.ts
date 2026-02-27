import { Component, OnInit } from '@angular/core';
import { PayrollService } from 'src/app/core/services/payroll.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {
   payrollList: any[] = [];

  constructor(private payrollService: PayrollService) {}

  ngOnInit() {
    this.loadPayroll();
  }

  loadPayroll() {
    this.payrollService.getPayrollByEmployee(1)
      .subscribe(data => {
        this.payrollList = data;
      });
  }
}
