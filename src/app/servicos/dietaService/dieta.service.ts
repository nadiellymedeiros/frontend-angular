import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DietaService {
  constructor(private http: HttpClient) {}

  private urlDieta: string = 'http://localhost:5265/api/diet';

  criarPrompt(obj: any): Observable<any> {
    return this.http.post<any>(this.urlDieta, obj);
  }
}
