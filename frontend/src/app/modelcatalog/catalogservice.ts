
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelacionesService {

  private apiUrl = 'api';

  constructor(private http: HttpClient) {}

  insertRelacion(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}