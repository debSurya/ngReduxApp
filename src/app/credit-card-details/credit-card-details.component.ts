import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { SubmitCCDetails } from '../ccDetailsActions';
import { CCDetails, CCDetailsInitial } from '../ccDetailsModel';
import * as ccDetailsReducer from '../ccDetailsReducer';

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.scss']
})
export class CreditCardDetailsComponent implements OnInit {

  creditCardForm: FormGroup = new FormGroup({
    ccNum: new FormControl('', [Validators.pattern(/^\s*(?:[0-9]{16})\s*$/g), Validators.required]),
    ccHolder: new FormControl('', Validators.required),
    ccExpDate: new FormControl(null, [this.expiryDateCheck, Validators.required]),
    ccCvv: new FormControl('', [Validators.pattern(/^\s*(?:[0-9]{3})\s*$/g)]),
    ccAmt: new FormControl(null, [Validators.nullValidator, Validators.min(1), Validators.required])
  });

  constructor(private store: Store<CCDetailsInitial>) { }

  ngOnInit(): void {
    this.store.select(ccDetailsReducer.selectStateCCDetails)
      .subscribe((data) => {
        console.log(data);
      });
  }

  private expiryDateCheck(ctrl: AbstractControl): { dateErr: boolean } | null {
    return !!ctrl.value && (new Date()).setHours(0, 0, 0, 0) >= (new Date(ctrl.value)).setHours(0, 0, 0, 0) ? { dateErr: true } : null;
  }

  submitDetails() {
    this.store.dispatch(SubmitCCDetails({
      data: {
        ccAmt: this.creditCardForm.controls.ccAmt.value,
        ccNum: this.creditCardForm.controls.ccNum.value,
        ccHolder: this.creditCardForm.controls.ccHolder.value,
        ccCvv: this.creditCardForm.controls.ccCvv.value,
        ccExpDate: this.creditCardForm.controls.ccExpDate.value,
      }
    }));
  }
}
