import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpfieldPage } from './otpfield.page';

const routes: Routes = [
  {
    path: '',
    component: OtpfieldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpfieldPageRoutingModule {}
