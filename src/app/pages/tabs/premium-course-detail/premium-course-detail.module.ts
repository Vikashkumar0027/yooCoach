import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PremiumCourseDetailPageRoutingModule } from './premium-course-detail-routing.module';

import { PremiumCourseDetailPage } from './premium-course-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PremiumCourseDetailPageRoutingModule
  ],
  declarations: [PremiumCourseDetailPage]
})
export class PremiumCourseDetailPageModule {}
