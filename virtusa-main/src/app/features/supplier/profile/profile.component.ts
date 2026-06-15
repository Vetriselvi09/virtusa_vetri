import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-su-profile',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Profile"></app-page-placeholder>'
})
export class ProfileComponent {}

