import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecmndViewCousePage } from './recmnd-view-couse.page';

const routes: Routes = [
  {
    path: '',
    component: RecmndViewCousePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecmndViewCousePageRoutingModule {}
