import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';

const routes: Routes = [{
  path: 'details',
  component: CreditCardDetailsComponent
}, {
  path: '**',
  pathMatch: 'full',
  redirectTo: 'details'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
