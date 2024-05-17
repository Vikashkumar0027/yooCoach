import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizelistPageRoutingModule } from './quizelist-routing.module';

import { QuizelistPage } from './quizelist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizelistPageRoutingModule
  ],
  declarations: [QuizelistPage]
})
export class QuizelistPageModule {}
