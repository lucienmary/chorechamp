import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task, TasksService } from '../../services/tasks.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-tasks-done-list',
  imports: [NgFor, CommonModule],
  templateUrl: './tasks-done-list.component.html',
  styleUrls: ['./tasks-done-list.component.scss']
})
export class TasksDoneListComponent implements OnInit {
  tasksDone$!: Observable<Task[]>;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksDone$ = this.tasksService.tasks$.pipe(
      map(tasks => tasks.filter(task => task.done))
    );
  }

  taskStatus(task: Task, bool: boolean): void {
    this.tasksService.taskStatus(task, bool);
  }
}
