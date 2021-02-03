import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  private expiryDateCheck(ctrl: AbstractControl): { dateErr: boolean } | null {
    return !!ctrl.value && (new Date()).setHours(0, 0, 0, 0) >= (new Date(ctrl.value)).setHours(0, 0, 0, 0) ? { dateErr: true } : null;
  }

  submitDetails() {

  }

}
