import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CCDetails } from '../ccDetailsModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardDetailsService {

  constructor() { }

  saveCCDetails(ccDetails: CCDetails) {
    return of({ data: JSON.parse(JSON.stringify({...ccDetails, new: true})) }).pipe(delay(2000));
  }
}
