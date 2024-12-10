import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
// Base URL beállítása (pl. environment.ts-ben tárolva)
private baseUrl: string = environment.apiUrl;

constructor(private http: HttpClient) {}

private createHeaders() {
  // Ha szükséges token vagy egyéb header
  return new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}`
  });
}

// GET kérés
get<T>(endpoint: string): Observable<T> {
  return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
    headers: this.createHeaders(),
  });
}

// POST kérés
post<T>(endpoint: string, data: any): Observable<T> {
  return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, {
    headers: this.createHeaders(),
  });
}

// PUT kérés
put<T>(endpoint: string, data: any): Observable<T> {
  return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, {
    headers: this.createHeaders(),
  });
}

// DELETE kérés
delete<T>(endpoint: string): Observable<T> {
  return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
    headers: this.createHeaders(),
  });
}
}
