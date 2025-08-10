import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TaskResponse } from '../models/TaskResponse';
import { TaskRequest } from '../models/TaskRequest ';

// Datos mock - almacenados globalmente
let mockTasks: TaskResponse[] = [
  {
    id: 1,
    title: 'Completar diseño de interfaz',
    description: 'Terminar el diseño de la página principal de la aplicación',
    assignedTo: 'Ana García',
    dueDate: new Date('2024-08-15'),
    completed: false
  },
  {
    id: 2,
    title: 'Implementar autenticación',
    description: 'Desarrollar el sistema de login y registro de usuarios',
    assignedTo: 'Carlos Mendoza',
    dueDate: new Date('2024-08-20'),
    completed: true
  },
  {
    id: 3,
    title: 'Testing de API',
    description: 'Realizar pruebas exhaustivas de todos los endpoints',
    assignedTo: 'María Rodriguez',
    dueDate: new Date('2024-08-25'),
    completed: false
  },
  {
    id: 4,
    title: 'Documentación técnica',
    description: 'Crear documentación completa del proyecto',
    assignedTo: 'Roberto Silva',
    dueDate: new Date('2024-08-30'),
    completed: false
  }
];

let nextId = 5;

// Interceptor 
export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  // Solo interceptar llamadas que contengan '/api/Task'
  if (req.url.includes('/api/Task')) {
    console.log('🔄 Mock interceptor activado para:', req.method, req.url);
    
    // Simular delay de red y procesar la petición
    return handleMockRequest(req).pipe(
      delay(Math.random() * 300 + 200) 
    );
  }
  
  // Para cualquier otra petición, continuar normalmente
  return next(req);
};

function handleMockRequest(req: HttpRequest<any>): Observable<HttpResponse<any>> {
  const { method, url, body } = req;
  
  switch (method) {
    case 'GET':
      if (url.includes('/api/Task/')) {
        // GET /api/Task/{id}
        const id = extractIdFromUrl(url);
        return getTaskById(id);
      } else {
        // GET /api/Task
        return getAllTasks();
      }
      
    case 'POST':
      // POST /api/Task
      return createTask(body);
      
    case 'PUT':
      // PUT /api/Task/{id}
      const updateId = extractIdFromUrl(url);
      return updateTask(updateId, body);
      
    case 'DELETE':
      // DELETE /api/Task/{id}
      const deleteId = extractIdFromUrl(url);
      return deleteTask(deleteId);
      
    default:
      return throwError(() => ({ 
        status: 405, 
        statusText: 'Method Not Allowed',
        error: 'Método no soportado' 
      }));
  }
}

function getAllTasks(): Observable<HttpResponse<TaskResponse[]>> {
  console.log('📋 Mock: Obteniendo todas las tareas', mockTasks.length);
  return of(new HttpResponse({
    status: 200,
    body: mockTasks
  }));
}

function getTaskById(id: number): Observable<HttpResponse<TaskResponse>> {
  console.log(`🔍 Mock: Buscando tarea con ID ${id}`);
  const task = mockTasks.find(t => t.id === id);
  
  if (task) {
    return of(new HttpResponse({
      status: 200,
      body: task
    }));
  } else {
    return throwError(() => ({
      status: 404,
      statusText: 'Not Found',
      error: 'Tarea no encontrada'
    }));
  }
}

function createTask(taskRequest: TaskRequest): Observable<HttpResponse<TaskResponse>> {
  console.log('➕ Mock: Creando nueva tarea', taskRequest);
  
  const newTask: TaskResponse = {
    id: nextId++,
    ...taskRequest,
    dueDate: new Date(taskRequest.dueDate)
  };
  
  mockTasks.push(newTask);
  
  return of(new HttpResponse({
    status: 201,
    body: newTask
  }));
}

function updateTask(id: number, taskRequest: TaskRequest): Observable<HttpResponse<TaskResponse>> {
  console.log(`✏️ Mock: Actualizando tarea ${id}`, taskRequest);
  
  const taskIndex = mockTasks.findIndex(t => t.id === id);
  
  if (taskIndex !== -1) {
    const updatedTask: TaskResponse = {
      id,
      ...taskRequest,
      dueDate: new Date(taskRequest.dueDate)
    };
    
    mockTasks[taskIndex] = updatedTask;
    
    return of(new HttpResponse({
      status: 200,
      body: updatedTask
    }));
  } else {
    return throwError(() => ({
      status: 404,
      statusText: 'Not Found',
      error: 'Tarea no encontrada'
    }));
  }
}

function deleteTask(id: number): Observable<HttpResponse<any>> {
  console.log(`🗑️ Mock: Eliminando tarea ${id}`);
  
  const taskIndex = mockTasks.findIndex(t => t.id === id);
  
  if (taskIndex !== -1) {
    mockTasks.splice(taskIndex, 1);
    
    return of(new HttpResponse({
      status: 204,
      body: null
    }));
  } else {
    return throwError(() => ({
      status: 404,
      statusText: 'Not Found',
      error: 'Tarea no encontrada'
    }));
  }
}

function extractIdFromUrl(url: string): number {
  const matches = url.match(/\/api\/Task\/(\d+)/);
  return matches ? parseInt(matches[1], 10) : 0;
}
