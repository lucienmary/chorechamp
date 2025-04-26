import { Participant, ParticipantsService } from './participants.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

export type Task = {
  id: number;
  label: string;
  score: number;
  assignedTo: string;
  doneBy: string | null;
  done: boolean;
};

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly API = 'http://localhost:3000/tasks';

  // Stocker les tâches dans BehaviorSubject
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient, private participantService: ParticipantsService) {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.http.get<Task[]>(this.API).subscribe({
      next: (tasks) => {
        this.tasksSubject.next(tasks);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des tâches :', err);
      }
    });
  }

  update(id: number, patch: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.API}/${id}`, patch);
  }

  signalRefreshTasksDone(): void {
    this.loadTasks();
  }

  taskStatus(task: Task, bool: boolean): void {
    let doneBy:string | null = '';
    if(bool == true) {
      doneBy = this.participantService.getActiveUser();
    }
    const updatedTask = { ...task, done: bool, doneBy: doneBy };

    this.update(task.id, { done: bool }).subscribe({
      next: () => {
        const tasks = this.tasksSubject.getValue();
        const updatedTasks = tasks.map(t => t.id === task.id ? updatedTask : t);
        this.tasksSubject.next(updatedTasks);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la tâche :', err);
      }
    });
  }

  /** Obtenir toutes les tâches */
  getAll(): Observable<Task[]> {
    return this.tasks$;
  }

  /** Obtenir les tâches non complétées */
  getNotCompleted(): Observable<Task[]> {
    return this.tasks$.pipe(map(tasks => tasks.filter(task => !task.done)));
  }

  /** Obtenir les tâches complétées */
  getCompleted(): Observable<Task[]> {
    return this.tasks$.pipe(map(tasks => tasks.filter(task => task.done)));
  }
}
