import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubjectDetaisPageRoutingModule } from './subject-detais-routing.module';

import { SubjectDetaisPage } from './subject-detais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubjectDetaisPageRoutingModule
  ],
  declarations: [SubjectDetaisPage]
})
export class SubjectDetaisPageModule {}
