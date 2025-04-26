import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor (private router: Router) {}
  onPage(page: string) {
    this.router.navigate([`/${page}`]).catch((err) => console.error(err));
  }
}
