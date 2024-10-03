import { Component, ViewChild, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { JsonPlaceholderService } from 'src/app/services/json-placeholder.service';
import { Tarea } from 'src/app/models/tarea';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FiltroEstadoPipe } from 'src/app/pipes/filtro-estado.pipe';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatCheckboxModule,
    FiltroEstadoPipe,
    FormsModule,
  ],
})
export class InicioComponent {
  tareas: Tarea[] = [];
  estadoSeleccionado: any | null = null;
  dialogRef!: MatDialogRef<any>;

  constructor(
    public dialog: MatDialog,
    private jsonPlaceholderService: JsonPlaceholderService
  ) {
    this.obtenerTareas();
  }

  registrarFormulario(): void {
    this.dialogRef = this.dialog.open(ModalFormulario, {
      width: '70%',
      disableClose: true,
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.onModalClosed();
    });
  }

  onModalClosed() {
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.jsonPlaceholderService.obtenerActividades().subscribe(
      (data: Tarea[]) => {
        this.tareas = data;
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
      }
    );
  }

  actulizarEstado(element: Tarea, estado: boolean) {
    console.log(estado);

    this.jsonPlaceholderService
      .actualizarTarea(+element.id, { estado: estado })
      .subscribe(
        (response) => {
          this.mensajeExito();
          console.log('Tarea actualizada:', response);
          this.obtenerTareas();
        },
        (error) => {
          this.mensajeError();
          console.error('Error al actualizar la tarea:', error);
        }
      );
  }

  mensajeExito() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Proceso realizado con éxito.',
    });
  }

  mensajeError() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'error',
      title: 'No se logró completar el proceso.',
    });
  }
}

@Component({
  selector: 'modal-formulario',
  templateUrl: 'modal-formulario.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    CommonModule,
  ],
})
export class ModalFormulario {
  tareaForm: FormGroup;
  tareas: Tarea[] = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalFormulario>,
    public dialog: MatDialog,
    private jsonPlaceholderService: JsonPlaceholderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.obtenerTareas();
    this.tareaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      fecha: ['', Validators.required],
      personas: this.fb.array(
        [this.createPersona()],
        [this.nombresUnicosValidator]
      ),
      estado: [false],
    });
    this.personas.valueChanges.subscribe(() => {
      this.validarNombresDuplicados();
    });
  }

  createPersona(): FormGroup {
    return this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      habilidades: this.fb.array([this.createHabilidad()]),
    });
  }

  nombresUnicosValidator: ValidatorFn = (
    formArray: AbstractControl
  ): ValidationErrors | null => {
    const nombres = formArray.value.map((persona: any) => persona.nombre);
    const nombresUnicos = new Set(nombres);
    return nombres.length !== nombresUnicos.size
      ? { nombresDuplicados: true }
      : null;
  };

  validarNombresDuplicados() {
    if (this.personas.hasError('nombresDuplicados')) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Los nombres de las personas deben ser únicos.',
        timer: 3000,
        timerProgressBar: true,
        confirmButtonColor: '#17a2b8',
      });
    }
  }

  generarId(): string {
    return Math.floor(Math.random() * 1000).toString();
  }

  createHabilidad(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  get personas(): FormArray {
    return this.tareaForm.get('personas') as FormArray;
  }

  getHabilidades(i: number): FormArray {
    return this.personas.at(i).get('habilidades') as FormArray;
  }

  agregarPersona() {
    this.personas.push(this.createPersona());
    this.personas.updateValueAndValidity();
  }

  eliminarPersona(index: number) {
    this.personas.removeAt(index);
    this.personas.updateValueAndValidity();
  }

  agregarHabilidad(i: number) {
    this.getHabilidades(i).push(this.createHabilidad());
  }

  eliminarHabilidad(personIndex: number, habilidadIndex: number) {
    this.getHabilidades(personIndex).removeAt(habilidadIndex);
  }

  registrarTarea() {
    if (this.tareaForm.valid) {
      this.tareaForm.get('estado')!.setValue(false);
      const nuevaTarea: Tarea = {
        id: this.tareas.length + 1 + '',
        nombre: this.tareaForm.get('nombre')!.value,
        fecha: this.tareaForm.get('fecha')!.value,
        estado: this.tareaForm.get('estado')!.value,
        personas: this.tareaForm.value.personas.map(
          (persona: {
            id: any;
            nombre: any;
            edad: any;
            habilidades: { nombre: any }[];
          }) => ({
            id: this.generarId(),
            nombre: persona.nombre,
            edad: persona.edad,
            habilidades: persona.habilidades.map(
              (habilidad: { nombre: any }) => habilidad.nombre
            ),
          })
        ),
      };

      this.jsonPlaceholderService.registrarActividad(nuevaTarea).subscribe(
        (response) => {
          console.log('Tarea registrada:', response);
          this.mensajeExito();
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error al registrar tarea', error);
          this.mensajeError();
        }
      );
    } else {
      this.mensajeError();
    }
  }

  obtenerTareas() {
    this.jsonPlaceholderService.obtenerActividades().subscribe(
      (data: Tarea[]) => {
        this.tareas = data;
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
      }
    );
  }

  mensajeExito() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Proceso realizado con éxito.',
    });
  }

  mensajeError() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'error',
      title: 'No se logró completar el proceso.',
    });
  }
}
