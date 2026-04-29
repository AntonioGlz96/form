import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelacionesService {

  private http = inject(HttpClient);
  private apiUrl = '';

  getRelaciones() {
    return this.http.get<any[]>(this.apiUrl);
  }
}