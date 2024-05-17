import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendedCourseListPage } from './recommended-course-list.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendedCourseListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendedCourseListPageRoutingModule {}
