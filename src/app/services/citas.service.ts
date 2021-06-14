import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '../../models/negocio/cita.model';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLastCitas(size: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.baseUrl}/citas?_sort=Creacion&_order=desc&_limit=${size}`)
  }

  getCitaDetail(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.baseUrl}/citas/${id}`)
  }

  getAllCita(page: number): Observable<{total: string, citas: Cita[]}> {
    return this.http.get<any>(`${this.baseUrl}/citas?_sort=Creacion&_order=desc&_page=${page}&_limit=5`, {observe: 'response'}).pipe(
      map((a) => {
        if (a.headers.get('X-Total-Count') && a.body) return {total: a.headers.get('X-Total-Count'), citas: a.body}
        return {total: '', citas: []}
      })
    )
  }

  createCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.baseUrl}/citas`, {...cita})
  }

  updateCita(id: number, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.baseUrl}/citas/${id}`, {...cita})
  }

  deleteCita(id: number, cita: Cita): Observable<Cita> {
    return this.http.delete<Cita>(`${this.baseUrl}/citas/${id}`)
  }
}
