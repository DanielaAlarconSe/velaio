import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root',
})
export class JsonPlaceholderService {
  private apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registrarPersona(persona: Persona): Observable<any> {
    return this.http.post(`${this.apiURL}/personas`, persona);
  }

  registrarActividad(actividad: Tarea): Observable<any> {
    return this.http.post(`${this.apiURL}/tareas`, actividad);
  }

  obtenerPersonas(): Observable<Persona[]> {
    return this.http.get<any[]>(`${this.apiURL}/personas`);
  }

  obtenerActividades(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiURL}/tareas`);
  }

  actualizarTarea(id: number, tarea: Partial<Tarea>): Observable<any> {
    return this.http.patch(`${this.apiURL}/tareas/${id}`, tarea);
  }
}
