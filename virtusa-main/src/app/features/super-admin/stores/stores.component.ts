import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-su-stores',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Stores"></app-page-placeholder>'
})
export class StoresComponent {}

