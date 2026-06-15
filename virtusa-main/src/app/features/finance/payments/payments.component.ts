import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-fi-payments',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Payments"></app-page-placeholder>'
})
export class PaymentsComponent {}

