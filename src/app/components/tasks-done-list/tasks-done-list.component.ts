import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task, TasksService } from '../../services/tasks.service';
import { CommonModule, NgFor } from '@angular/common';
import { Participant, ParticipantsService } from '../../services/participants.service';

@Component({
  selector: 'app-tasks-done-list',
  imports: [NgFor, CommonModule],
  templateUrl: './tasks-done-list.component.html',
  styleUrls: ['./tasks-done-list.component.scss']
})
export class TasksDoneListComponent implements OnInit {
  tasksDone$!: Observable<Task[]>;
  participants$: Observable<Participant[]>;

  constructor(private tasksService: TasksService, private participantService: ParticipantsService) {
    this.participants$ = this.participantService.participants$;
  }

  ngOnInit(): void {
    this.tasksDone$ = this.tasksService.tasks$.pipe(
      map(tasks => tasks.filter(task => task.done))
    );
  }

  getUserWhoMade(participants: Participant[], doneBy: number | undefined): string {
    const participant = participants.find(p => p.id === doneBy?.toString());
    return participant ? participant.name : '';
  }

  taskStatus(task: Task, bool: boolean): void {
    this.tasksService.taskStatus(task, bool);
  }
}
