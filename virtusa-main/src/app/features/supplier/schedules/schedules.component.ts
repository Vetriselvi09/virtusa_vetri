import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-su-schedules',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Schedules"></app-page-placeholder>'
})
export class SchedulesComponent {}

