import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PayrollDto {
  payrollId: number;
  employeeId: number;
  employeeName: string;
  month: string;
  year: number;
  basicSalary: number;
  leaveDays: number;
  deduction: number;
  bonus: number;
  netSalary: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  private baseUrl = 'https://localhost:7123/api/payroll'; // change if needed

  constructor(private http: HttpClient) { }

  getPayroll(month: string, year: number): Observable<PayrollDto[]> {
    const params = new HttpParams()
      .set('month', month)
      .set('year', year);

    return this.http.get<PayrollDto[]>(this.baseUrl, { params });
  }

  applyBonusToAll(month: string, year: number, bonus: number) {
    const params = new HttpParams()
      .set('month', month)
      .set('year', year)
      .set('bonus', bonus);

    return this.http.post(`${this.baseUrl}/apply-bonus-all`, null, { params });
  }

  addBonus(payrollId: number, bonus: number) {
    const params = new HttpParams().set('bonus', bonus);
    return this.http.post(`${this.baseUrl}/add-bonus/${payrollId}`, null, { params });
  }

  pay(payrollId: number) {
    return this.http.post(`${this.baseUrl}/pay/${payrollId}`, null);
  }

  payAll(month: string, year: number) {
    const params = new HttpParams()
      .set('month', month)
      .set('year', year);

    return this.http.post(`${this.baseUrl}/pay-all`, null, { params });
  }

  generatePayroll(month: string, year: number) {
  const params = new HttpParams()
    .set('month', month)
    .set('year', year);

  return this.http.post(`${this.baseUrl}/generate`, null, { params });
}
}