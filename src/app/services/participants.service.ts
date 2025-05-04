import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export type Participant = {
  id: string;
  name: string;
  avatar: string;
  assignedTasks: number[];
  completedTasks: number[];
  score: number;
  nbOfVictories: number;
};

@Injectable({ providedIn: 'root' })
export class ParticipantsService {
  private readonly API = 'http://localhost:3000/participants';
  private readonly ACTIVE_KEY = 'chorechamp.activeUserId';

  private _participants$ = new BehaviorSubject<Participant[]>([]);
  public participants$ = this._participants$.asObservable();

  constructor(private http: HttpClient) {
    this.fetchAll();
  }

  /** Récupère tous les participants depuis l’API */
  fetchAll(): void {
    this.http.get<Participant[]>(this.API)
      .subscribe(data => this._participants$.next(data));
  }

  /** Récupère un participant précis (optionnel) */
  get(id: string): Observable<Participant> {
    return this.http.get<Participant>(`${this.API}/${id}`);
  }

  /** Ajoute un nouveau participant */
  create(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>(this.API, participant)
      .pipe(tap(() => this.fetchAll()));
  }

  /** Met à jour un participant partiellement */
  update(id: string, patch: Partial<Participant>): Observable<Participant> {
    return this.http.patch<Participant>(`${this.API}/${id}`, patch)
      .pipe(tap(() => this.fetchAll()));
  }

  /** Supprime un participant */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`)
      .pipe(tap(() => this.fetchAll()));
  }

  /** ID utilisateur actif stocké dans localStorage */
  setActiveUser(id: string): void {
    localStorage.setItem(this.ACTIVE_KEY, id.toString());
  }

  getActiveUser(): string {
    return localStorage.getItem(this.ACTIVE_KEY) || '';
  }

  addScore(id: string, pointsToAdd: number = 1): Observable<Participant> {
    return this.get(id).pipe(
      switchMap(participant => {
        const updatedScore = Number(participant.score) + pointsToAdd;
        return this.http.patch<Participant>(`${this.API}/${id}`, { score: updatedScore.toString() });
      }),
      tap(() => this.fetchAll())
    );
  }

  removeScore(id: string, pointsToAdd: number = 1): Observable<Participant> {
    return this.get(id).pipe(
      switchMap(participant => {
        const updatedScore = Number(participant.score) - pointsToAdd;
        return this.http.patch<Participant>(`${this.API}/${id}`, { score: updatedScore.toString() });
      }),
      tap(() => this.fetchAll())
    );
  }
}
