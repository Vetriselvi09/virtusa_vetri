import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-su-users',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Users"></app-page-placeholder>'
})
export class UsersComponent {}

