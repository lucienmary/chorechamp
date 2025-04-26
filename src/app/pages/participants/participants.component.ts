import { Component } from '@angular/core';
import { Participant, ParticipantsService } from '../../services/participants.service';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participants',
  imports: [NgFor, CommonModule],
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.scss'
})
export class ParticipantsComponent {
  participants$: Observable<Participant[]>;

  constructor(private participantService: ParticipantsService, private router: Router) {
    this.participants$ = this.participantService.participants$;
  }

  onSelect(participantId: string): void {
    this.participantService.setActiveUser(participantId);
    this.router.navigate(['/home']).catch((err) => console.error(err));
  }
}
