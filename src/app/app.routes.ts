import { Routes } from '@angular/router';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskFormComponent } from './components/tasks-form/tasks-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'tasks', component: TasksListComponent },
    { path: 'new-task', component: TaskFormComponent },
    { path: 'edit-task/:id', component: TaskFormComponent },
  ];