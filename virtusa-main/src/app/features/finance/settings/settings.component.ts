import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-fi-settings',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Settings"></app-page-placeholder>'
})
export class SettingsComponent {}

