import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { LiveClassComponent } from 'src/app/share-components/live-class/live-class.component';
import { ShareComponentsModule } from 'src/app/share-components/share-components.module';
import { BannerComponent } from 'src/app/share-components/banner/banner.component';
import { SwiperModule } from 'swiper/angular';
import { VdobannerComponent } from 'src/app/share-components/vdobanner/vdobanner.component';
import { VdoplayercomponetComponent } from 'src/app/share-components/vdoplayercomponet/vdoplayercomponet.component';
import { RecommendedCourseComponent } from 'src/app/share-components/recommended-course/recommended-course.component';
import { RecmndCourseBannerComponent } from 'src/app/share-components/recmnd-course-banner/recmnd-course-banner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,ShareComponentsModule,SwiperModule,ReactiveFormsModule
  ],
  declarations: [DashboardPage,LiveClassComponent, BannerComponent,VdobannerComponent,VdoplayercomponetComponent, RecommendedCourseComponent,RecmndCourseBannerComponent]
})
export class DashboardPageModule {}
