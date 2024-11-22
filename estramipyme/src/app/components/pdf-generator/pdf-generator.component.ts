import { Component } from '@angular/core';
import { GraphCircleComponent } from '../graph-circle/graph-circle.component';
import { GraphsComponent } from '../graphs/graphs.component';
import { TestService } from '@services/test.service';
import { number } from 'echarts';
import Swal from 'sweetalert2';
import { API_CONSTANTS } from '../../config/constants';

@Component({
  selector: 'app-pdf-generator',
  standalone: true,
  imports: [GraphCircleComponent, GraphsComponent],
  templateUrl: './pdf-generator.component.html',
  styleUrl: './pdf-generator.component.css',
})
export class PdfGeneratorComponent {
  private testService!: TestService;

  constructor(testService: TestService) {
    this.testService = testService;
  }

  clickPdf(): void {
    let testId = localStorage.getItem('testId');

    if (testId != undefined && testId != null) {
      let endpoint =
        `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.GETREPORTE_REPORTEPDF}` +
        '/' +
        testId;
      window.location.href = endpoint;
    }
  }
}
