import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CCDetailsEffects } from './ccDetailsEffects';
import { ccDetailsReducer } from './ccDetailsReducer';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      ccDetails: ccDetailsReducer
    }),
    EffectsModule.forRoot([
      CCDetailsEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
