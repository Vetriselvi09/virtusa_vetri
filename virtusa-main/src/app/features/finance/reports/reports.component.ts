import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-fi-reports',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Reports"></app-page-placeholder>'
})
export class ReportsComponent {}

