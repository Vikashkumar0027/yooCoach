import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PremiumCourseDetailPage } from './premium-course-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PremiumCourseDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiumCourseDetailPageRoutingModule {}
