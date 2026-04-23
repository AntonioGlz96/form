import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private url = 'http://127.0.0.1:8000/api/usuarios';

  // Para el GET
  getUsuarios() {
    return this.http.get<any[]>(this.url);
  }
  saveUsuario(datos: any) {
    return this.http.post(this.url, datos);
}

}








