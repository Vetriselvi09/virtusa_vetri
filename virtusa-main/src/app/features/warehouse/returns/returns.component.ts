import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-wa-returns',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Returns"></app-page-placeholder>'
})
export class ReturnsComponent {}

