import { Component, Input } from '@angular/core';
import { ParticipantsService, Participant } from '../../services/participants.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headbar',
  imports: [CommonModule],
  templateUrl: './headbar.component.html',
  styleUrl: './headbar.component.scss'
})
export class HeadbarComponent {
  @Input() title!: string;
  participants$: Observable<Participant[]>;
  activeUserId!: string | undefined;
  activeUser$!: Observable<Participant>;

  constructor(private participantService: ParticipantsService, private router: Router) {
    this.participants$ = this.participantService.participants$;
    this.activeUserId = this.participantService.getActiveUser();

    if (typeof this.activeUserId == 'string')
      this.activeUser$ = this.participantService.get(this.activeUserId);
  }

  ngOnInit(): void {
    if (!this.activeUser$)
      this.router.navigate(['/participants']).catch(err => console.error(err));

  }

  DropdownChangeUser(): void  {
    this.router.navigate(['/participants']).catch(err => console.error(err));
  }
}
