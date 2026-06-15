import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-wa-scanner',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Scanner"></app-page-placeholder>'
})
export class ScannerComponent {}

