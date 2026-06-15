import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-st-alerts',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Alerts"></app-page-placeholder>'
})
export class AlertsComponent {}

