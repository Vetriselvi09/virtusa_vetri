import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-st-barcode',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="Barcode"></app-page-placeholder>'
})
export class BarcodeComponent {}

