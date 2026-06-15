import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-wa-updates',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Updates"></app-page-placeholder>'
})
export class UpdatesComponent {}

