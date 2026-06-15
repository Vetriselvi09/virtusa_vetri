import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-fi-approvals',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Approvals"></app-page-placeholder>'
})
export class ApprovalsComponent {}

