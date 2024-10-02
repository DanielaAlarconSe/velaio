import { Pipe, PipeTransform } from '@angular/core';
import { Tarea } from '../models/tarea';

@Pipe({
  name: 'filtroEstado',
  standalone: true,
})
export class FiltroEstadoPipe implements PipeTransform {
  transform(tareas: Tarea[], estado?: boolean): Tarea[] {
    if (estado === null || '' + estado === 'null') {
      return tareas;
    }

    return tareas.filter((tarea) => tarea.estado === estado);
  }
}
