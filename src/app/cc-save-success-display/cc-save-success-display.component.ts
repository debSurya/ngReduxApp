import { Component, OnInit } from '@angular/core';
import { CCDetails } from '../ccDetailsModel';
import { CreditCardDetailsService } from '../services/credit-card-details.service';

@Component({
  selector: 'app-cc-save-success-display',
  templateUrl: './cc-save-success-display.component.html',
  styleUrls: ['./cc-save-success-display.component.scss']
})
export class CcSaveSuccessDisplayComponent implements OnInit {

  constructor(private ccService: CreditCardDetailsService) { }

  data: CCDetails;

  ngOnInit(): void {
    this.ccService.getCCDetailsSaveData().subscribe(
      (data: CCDetails | null) => {
        if (!!data) {
          this.data = data;
        }
      }
    )
  }

}
