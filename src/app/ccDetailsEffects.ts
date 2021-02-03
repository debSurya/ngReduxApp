import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { SubmitCCDetails, SubmitCCDetailsSuccess } from "./ccDetailsActions";
import { CreditCardDetailsService } from "./services/credit-card-details.service";

@Injectable({
    providedIn: 'root'
})
export class CCDetailsEffects {

    constructor(private actions: Actions, private ccDetailsService: CreditCardDetailsService) { }

    ccDetailsEffect = createEffect(() => {
        return this.actions.pipe(
            ofType(SubmitCCDetails),
            switchMap((SubmitCCDetails) => {
                return this.ccDetailsService.saveCCDetails(SubmitCCDetails.data).pipe(
                    map((response) => SubmitCCDetailsSuccess(response))
                );
            })
        );
    })

}