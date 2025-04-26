import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Participant, ParticipantsService } from '../../services/participants.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weekly-points',
  imports: [NgFor, CommonModule],
  templateUrl: './weekly-points.component.html',
  styleUrl: './weekly-points.component.scss'
})
export class WeeklyPointsComponent {
  participants$: Observable<Participant[]>;

  constructor(private participantService: ParticipantsService) {
    this.participants$ = this.participantService.participants$;
  }
}
