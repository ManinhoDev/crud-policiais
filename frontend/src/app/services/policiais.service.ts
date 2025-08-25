// src/app/services/policiais/policiais.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoliciaisService {
  private apiUrl = 'http://localhost:3000/policiais';

  constructor(private http: HttpClient) { }

  cadastrarPolicial(policial: any): Observable<any> {
    return this.http.post(this.apiUrl, policial);
  }

  listarPoliciais(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
