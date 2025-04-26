import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task, TasksService } from '../../services/tasks.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Participant, ParticipantsService } from '../../services/participants.service';

@Component({
  selector: 'app-tasks-list',
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent {
  tasks$!: Observable<Task[]>;
  participants$: Observable<Participant[]>;

  constructor(
    private tasksService: TasksService,
    private participantService: ParticipantsService
  ) {
    this.tasks$ = this.tasksService.tasks$.pipe(
      map(tasks => tasks.filter(task => !task.done))
    );

    this.participants$ = this.participantService.participants$;
  }

  getParticipantSpan(participants: Participant[], assignedTo: string): string {
    const participant = participants.find(p => p.id === assignedTo);
    return participant ? `<span class="text-muted fs-7">– (${participant.name})</span>` : '';
  }

  taskStatus(task: Task, bool: boolean): void {
    this.tasksService.taskStatus(task, bool);
  }
}
