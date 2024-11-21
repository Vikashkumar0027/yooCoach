import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizelistPageRoutingModule } from './quizelist-routing.module';

import { QuizelistPage } from './quizelist.page';


@NgModule({
  declarations: [QuizelistPage],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizelistPageRoutingModule
  ]
 
})
export class QuizelistPageModule {}
