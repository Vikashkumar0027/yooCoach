import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendedCourseListPageRoutingModule } from './recommended-course-list-routing.module';

import { RecommendedCourseListPage } from './recommended-course-list.page';
import { ShareComponentsModule } from 'src/app/share-components/share-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendedCourseListPageRoutingModule,ShareComponentsModule
  ],
  declarations: [RecommendedCourseListPage]
})
export class RecommendedCourseListPageModule {}
