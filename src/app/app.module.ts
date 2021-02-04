import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CCDetailsEffects } from './ccDetailsEffects';
import { ccDetailsReducer } from './ccDetailsReducer';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { CcSaveSuccessDisplayComponent } from './cc-save-success-display/cc-save-success-display.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardDetailsComponent,
    CcSaveSuccessDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center-center',
      enableHtml: true,
      timeOut: 2000,
      preventDuplicates: true,
      tapToDismiss: false
    }),
    NgxUiLoaderModule,
    ToastContainerModule,
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
