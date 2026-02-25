import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private baseUrl = 'https://localhost:7123/api/Attendance';

  constructor(private http: HttpClient) { }

  markLogin(employeeId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/${employeeId}`, {});
  }


  markLogout(employeeId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout/${employeeId}`, {});
  }

  getAttendanceHistory(employeeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/${employeeId}`);
  }

  getAttendancePercentage(employeeId: number, month: number, year: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/percentage?employeeId=${employeeId}&month=${month}&year=${year}`
    );
  }
}
