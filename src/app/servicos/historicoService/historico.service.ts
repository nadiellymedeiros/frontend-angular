import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoricoService {
  constructor(private http: HttpClient) {}

  private urlHistorico: string = 'http://localhost:5265/api/historico';

  getUserHistorico(cpf: string): Observable<any> {
    return this.http.get<any>(`${this.urlHistorico}/${cpf}`);
  }
}
