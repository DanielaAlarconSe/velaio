import { Persona } from './persona';

export interface Tarea {
  id: string;
  nombre: string;
  fecha: Date;
  personas: Persona[];
  estado: boolean;
}
