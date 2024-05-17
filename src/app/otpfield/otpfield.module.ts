import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpfieldPageRoutingModule } from './otpfield-routing.module';

import { OtpfieldPage } from './otpfield.page';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpfieldPageRoutingModule,NgOtpInputModule
  ],
  declarations: [OtpfieldPage]
})
export class OtpfieldPageModule {}
