# Prueba Técnica - Aplicación de Gestión de Tareas y Personas

![Logo Velaio](https://velaio.com/wp-content/uploads/logo-velaio.png)

Este proyecto es una aplicación web desarrollada con Angular 16 para gestionar tareas y personas asociadas a ellas. A continuación, se describen los requisitos y características principales de la prueba.

## Problema

Se requiere implementar una aplicación que permita:
1. Crear tareas.
2. Listar tareas creadas.
3. Marcar tareas como completadas.
4. Filtrar tareas por estado (completadas o pendientes).
5. Asignar personas a las tareas, con nombre, edad y habilidades.
6. Añadir y eliminar personas y habilidades de las tareas.
7. Validar los datos ingresados en los formularios.

## Requerimientos

### 1. Interfaz Gráfica
- Desarrollada en **Angular 16**.
- Utilización de **formularios reactivos** con validaciones.
- Gestión de personas y habilidades a través de arreglos y arreglos anidados.
- Implementación de al menos un componente **standalone**.
- Diseño **Mobile First** para asegurar una interfaz responsiva.

### 2. Gestión del Estado
- Uso de un servicio Angular para manejar el estado de tareas, personas y habilidades.
- Las tareas, personas y habilidades se almacenan en **arreglos de objetos**.
- (Opcional) Uso de **NgRx** para la gestión del estado global.

### 3. Consumo de API REST (Opcional)
- Implementar el consumo de una **API REST** para obtener y almacenar las tareas y personas.
- Se puede utilizar como ejemplo: [jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos).

## Validaciones

### Arreglo de Personas
- El **nombre** no puede repetirse entre personas asociadas a la misma tarea.
- La **edad** debe ser mayor de 18 años.
- Cada persona debe tener al menos una **habilidad**.

### Arreglo Anidado de Habilidades
- El campo de **habilidad** no puede estar vacío.
- Cada persona debe tener al menos una **habilidad**.

## Tecnologías Utilizadas
- **Angular 16** (Obligatorio).
- **Gestión del Estado**: Angular Service o **NgRx** (Opcional).
- **Repositorio**: GitHub.

## Consideraciones Generales
- La prueba debe ser realizada por una sola persona.
- Se evaluará tanto la implementación técnica como la defensa del código.
- El proyecto debe subirse a un **repositorio de GitHub**.
- Tiempo estimado: **48 horas**.
- Se debe sustentar la solución con un video subido de manera privada en plataformas como YouTube o Google Drive.

## Instrucciones de Instalación

1. Clonar el repositorio:
    ```bash
    git clone <url-del-repositorio>
    ```

2. Instalar las dependencias:
    ```bash
    npm install
    ```

3. Ejecutar la aplicación:
    ```bash
    ng serve
    ```

4. Acceder a la aplicación en `http://localhost:4200/`.

## Enlaces Útiles
- [Documentación de Angular](https://angular.io/docs)
- [NgRx](https://ngrx.io/)
- [jsonplaceholder API](https://jsonplaceholder.typicode.com/)

