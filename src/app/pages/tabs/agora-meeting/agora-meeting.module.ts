import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgoraMeetingPageRoutingModule } from './agora-meeting-routing.module';

import { AgoraMeetingPage } from './agora-meeting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgoraMeetingPageRoutingModule
  ],
  declarations: [AgoraMeetingPage]
})
export class AgoraMeetingPageModule {}
