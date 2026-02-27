import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
   private baseUrl = 'https://localhost:5001/api/payroll';

  constructor(private http: HttpClient) {}

  getPayrollByEmployee(id: number) {
    return this.http.get<any[]>(`${this.baseUrl}/employee/${id}`);
  }

  generatePayroll(data: any) {
    return this.http.post(`${this.baseUrl}/generate`, data);
  }
}
