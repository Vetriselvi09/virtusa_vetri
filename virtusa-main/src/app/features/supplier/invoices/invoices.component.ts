import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-su-invoices',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Invoices"></app-page-placeholder>'
})
export class InvoicesComponent {}

