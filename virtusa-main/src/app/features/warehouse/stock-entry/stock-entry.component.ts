import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-wa-stock-entry',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Stock Entry"></app-page-placeholder>'
})
export class StockEntryComponent {}

