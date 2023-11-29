import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { Router } from '@angular/router';
import { HOME_ROUTE } from '../../values/default-routes.values';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  private router = inject(Router)

  onRedirect() {
    this.router.navigate([HOME_ROUTE.path])
  }
}
