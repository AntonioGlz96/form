import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private url = 'http://127.0.0.1:8000/api/usuarios';

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
  saveUsuario(datos: any): Observable<any> {
    return this.http.post(this.url, datos);
  }

  getUsuario(id: any): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  deleteUsuario(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateUsuario(id: any, datos: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, datos);
  }

  buscarPorEmail(email: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}/buscar/${email}`);
  }
}