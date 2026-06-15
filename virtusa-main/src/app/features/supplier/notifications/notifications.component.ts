import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-su-notifications',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Notifications"></app-page-placeholder>'
})
export class NotificationsComponent {}

