import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-fi-valuation',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Valuation"></app-page-placeholder>'
})
export class ValuationComponent {}

