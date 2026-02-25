import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private baseUrl = 'https://localhost:7123/api/Leave';

  constructor(private http: HttpClient) {}

  applyLeave(data: any) {
    return this.http.post(`${this.baseUrl}/apply`, data);
  }

  getEmployeeLeaves(employeeId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/employee/${employeeId}`);
  }

  getLeaveHistory(employeeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/${employeeId}`);
  }
}
