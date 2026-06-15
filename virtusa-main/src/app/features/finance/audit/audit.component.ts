import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-fi-audit',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Audit"></app-page-placeholder>'
})
export class AuditComponent {}

