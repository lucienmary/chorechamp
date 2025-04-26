import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'participants',
    loadComponent: () =>
      import('./pages/participants/participants.component')
        .then(m => m.ParticipantsComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component')
        .then(m => m.HomeComponent),
  },
  {
    path: 'podium',
    loadComponent: () =>
      import('./pages/podium/podium.component')
        .then(m => m.PodiumComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.component')
        .then(m => m.SettingsComponent),
  },
  // {
  //   path: 'add',
  //   loadComponent: () =>
  //     import('./components/task/add-task-dialog.component')
  //       .then(m => m.AddTaskDialogComponent),
  //   outlet: 'modal',
  // },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
