import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-st-suppliers',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Suppliers"></app-page-placeholder>'
})
export class SuppliersComponent {}

