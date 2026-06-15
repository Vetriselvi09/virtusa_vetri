import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-su-history',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="History"></app-page-placeholder>'
})
export class HistoryComponent {}

