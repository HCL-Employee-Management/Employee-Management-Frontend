import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Payroll {
   payrollId: number;
  employeeId: number;
  firstName: string;
  lastName: string;
  basicSalary: number;
  leaveDays: number;
  deduction: number;
  bonus: number;
  netSalary: number;
  month: string;
  year: number;
}

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  private baseUrl = 'https://localhost:7123/api/Payroll';

  constructor(private http: HttpClient) {}

  getAllPayroll(): Observable<Payroll[]> {
  return this.http.get<Payroll[]>(`${this.baseUrl}/employee/1`);
}

  getPayrollByEmployee(id: number): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(`${this.baseUrl}/employee/${id}`);
  }

  generatePayroll(data: any) {
    return this.http.post(`${this.baseUrl}/generate`, data);
  }
}