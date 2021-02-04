import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CCDetails } from '../ccDetailsModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardDetailsService {

  constructor() { }

  private passCCDetailsSub = new BehaviorSubject<CCDetails | null>(null);

  saveCCDetails(ccDetails: CCDetails) {
    return of({ data: { ...ccDetails, new: true } }).pipe(delay(1000));
  }

  sendCCDetailsSaveData(data: CCDetails) {
    this.passCCDetailsSub.next(data);
  }

  getCCDetailsSaveData(): Observable<CCDetails | null> {
    return this.passCCDetailsSub.asObservable();
  }
}
