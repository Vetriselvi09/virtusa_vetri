import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-su-analytics',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Analytics"></app-page-placeholder>'
})
export class AnalyticsComponent {}

