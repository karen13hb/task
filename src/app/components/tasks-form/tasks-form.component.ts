import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { TaskRequest } from '../../models/TaskRequest ';

@Component({
  selector: 'app-tasks-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.scss'
})
export class TaskFormComponent implements OnInit{
  taskForm!: FormGroup;
  isEdit: boolean = false;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false],
      assignedTo: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEdit = true;
      this.taskId = Number(idParam);
      this.getTask();
    }
  }

  getTask():void{
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task: Task) => {
        const formattedDate = new Date(task.dueDate).toISOString().split('T')[0];
        this.taskForm.patchValue({ ...task, dueDate: formattedDate });
      },
      error: err => console.error('No se pudo obtener la tarea', err)
    });
  }

  addTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    if (this.isEdit) {
      const updatedTask: Task = { id: this.taskId, ...this.taskForm.value };
     this.updateTask(updatedTask);
    } else {
      const newTask: TaskRequest = this.taskForm.value;
      this.createTask(newTask);
    }
  }

  createTask(task:TaskRequest):void{
    this.taskService.createTasks(task).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: err => console.error('Error al crear la tarea', err)
    });
  }

  updateTask(task:Task): void {
    this.taskService.updateTask(task, this.taskId).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: err => console.error('Error al actualizar la tarea', err)
    });
  }
}