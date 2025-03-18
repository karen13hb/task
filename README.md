# Gestor de Tareas Angular con Tailwind CSS

Esta aplicación es un gestor de tareas sencillo desarrollado con Angular 19 (utilizando componentes standalone) y Tailwind CSS. Permite:

Visualizar una lista de tareas.

Agregar nuevas tareas (con título, descripción y estado pendiente/completado).

Marcar una tarea como completada (o revertir su estado).

Eliminar una tarea.

La aplicación utiliza Angular Router para navegar entre la lista de tareas y el formulario de nueva tarea, y centraliza la lógica de negocio en un servicio inyectable.

## Características

- **Gestión de Tareas:**  
  Crea, visualiza, actualiza (cambiando el estado) y elimina tareas.
  
- **Componentes Standalone:**  
  Se aprovecha la nueva forma de declarar componentes sin necesidad de un NgModule raíz.

- **Enrutamiento:**  
  Navegación entre diferentes vistas (lista de tareas y formulario de nueva tarea).

- **Interfaz Moderna:**  
  Utiliza Tailwind CSS para un diseño atractivo y responsive, con un sidebar persistente y tarjetas (task cards) para cada tarea.

### Arquitectura Utilizada

Esta aplicación adopta una arquitectura modular y basada en **componentes standalone**, lo que ofrece varias ventajas:

- **Componentes Standalone:**  
  Permiten eliminar la necesidad de un NgModule raíz, simplificando la configuración y facilitando la reutilización, pruebas y mantenimiento de cada componente de forma independiente.

- **Separación de Responsabilidades:**  
  La lógica de negocio se centraliza en servicios (por ejemplo, `TaskService`), mientras que la presentación se maneja en componentes específicos ( `TasksListComponent`, `TaskFormComponent` y `TaskCardComponent`). Esto resulta en un código más limpio, organizado y escalable.

- **Enrutamiento Centralizado:**  
  La configuración de rutas en un archivo independiente (`app.routes.ts`) facilita la navegación entre vistas, manteniendo el código modular y fácil de extender a medida que crece la aplicación.

- **Preparado para SSR y Hidratación:**  
  La arquitectura permite soportar Angular Universal (SSR) y maneja la hidratación del lado del cliente, lo que mejora el rendimiento y la optimización para motores de búsqueda.

  
## Instalación

**Requisitos**
- Node.js (versión 14 o superior; se recomienda la última LTS)
- npm

## Pasos de Instalación

1. Clonar el repositorio
```bash
 [ git clone https://github.com/tuusuario/my-tasks-app.git](https://github.com/karen13hb/task/)
  cd my-tasks-app
```
2. Instalar las dependencias
```bash
npm install
```
## Building

To build the project run:

```bash
ng build
```

## Running unit tests

```bash
ng test
```

Licencia
Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

