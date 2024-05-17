import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendedCourseTopicPageRoutingModule } from './recommended-course-topic-routing.module';

import { RecommendedCourseTopicPage } from './recommended-course-topic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendedCourseTopicPageRoutingModule
  ],
  declarations: [RecommendedCourseTopicPage]
})
export class RecommendedCourseTopicPageModule {}
