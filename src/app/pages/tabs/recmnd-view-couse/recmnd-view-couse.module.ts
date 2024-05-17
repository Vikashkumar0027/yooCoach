import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecmndViewCousePageRoutingModule } from './recmnd-view-couse-routing.module';

import { RecmndViewCousePage } from './recmnd-view-couse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecmndViewCousePageRoutingModule
  ],
  declarations: [RecmndViewCousePage]
})
export class RecmndViewCousePageModule {}
