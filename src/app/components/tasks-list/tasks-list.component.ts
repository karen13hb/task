import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';

type FilterType = 'all' | 'completed' | 'pending';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  filter: FilterType = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
   this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => console.error('Error al cargar las tareas', err)
    });
  }

  get filteredTasks(): Task[] {
    switch (this.filter) {
      case 'completed':
        return this.tasks.filter(task => task.completed);
      case 'pending':
        return this.tasks.filter(task => !task.completed);
      default:
        return this.tasks;
    }
  }

  setFilter(filter: FilterType): void {
    this.filter = filter;
  }

  toggleCompletion(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task, task.id).subscribe({
      error: err => console.error('Error al alternar completado', err)
    });
  }


  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      error: err => console.error('Error al eliminar la tarea', err)
    });
  }
  
}
