import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-su-roles',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Roles"></app-page-placeholder>'
})
export class RolesComponent {}

