import { Component } from '@angular/core';
import { HeadbarComponent } from "../../components/headbar/headbar.component";
import { WeeklyPointsComponent } from "../../components/weekly-points/weekly-points.component";
import { TasksListComponent } from '../../components/tasks-list/tasks-list.component';
import { TasksDoneListComponent } from "../../components/tasks-done-list/tasks-done-list.component";

@Component({
  selector: 'app-home',
  imports: [HeadbarComponent, WeeklyPointsComponent, TasksListComponent, TasksDoneListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  pageTitle: string = 'ChoreChamp';
}
