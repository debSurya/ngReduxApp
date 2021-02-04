import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { SubmitCCDetails } from '../ccDetailsActions';
import { CCDetails, CCDetailsInitial } from '../ccDetailsModel';
import * as ccDetailsReducer from '../ccDetailsReducer';
import { CreditCardDetailsService } from '../services/credit-card-details.service';

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.scss']
})
export class CreditCardDetailsComponent implements OnInit {

  constructor(private store: Store<CCDetailsInitial>,
    private toasterService: ToastrService,
    private router: Router,
    private ccService: CreditCardDetailsService,
    private ngxLoaderService: NgxUiLoaderService) { }

  creditCardForm: FormGroup = new FormGroup({
    ccNum: new FormControl('', [Validators.pattern(/^\s*(?:[0-9]{16})\s*$/g), Validators.required]),
    ccHolder: new FormControl('', Validators.required),
    ccExpDate: new FormControl(null, [this.expiryDateCheck, Validators.required]),
    ccCvv: new FormControl('', [Validators.pattern(/^\s*(?:[0-9]{3})\s*$/g)]),
    ccAmt: new FormControl(null, [Validators.nullValidator, Validators.min(1), Validators.required])
  });
  backdropLoader: boolean = false;

  @ViewChild(ToastContainerDirective, { static: true }) toastContainer: ToastContainerDirective;

  ngOnInit(): void {
    this.store.select(ccDetailsReducer.selectStateCCDetails)
      .subscribe((data: { success: CCDetails }) => {
        if (!!data.success.new) {
          this.ngxLoaderService.stopAll();
          console.log(data.success);
          this.backdropLoader = true;
          const toastrMethod = this.toasterService.success(`<h4 class="text-center pr-2"><i> SUCCESS!! </i></h4>`);
          const navToSaveDetails = toastrMethod.onHidden.subscribe(() => {
            this.ccService.sendCCDetailsSaveData(data.success);
            this.router.navigateByUrl('/success');
            navToSaveDetails.unsubscribe();
          });
        }
      });
    this.toasterService.overlayContainer = this.toastContainer;
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
    this.ngxLoaderService.start();
  }
}
