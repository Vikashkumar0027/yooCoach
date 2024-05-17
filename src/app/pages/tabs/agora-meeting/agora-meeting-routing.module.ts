import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgoraMeetingPage } from './agora-meeting.page';

const routes: Routes = [
  {
    path: '',
    component: AgoraMeetingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgoraMeetingPageRoutingModule {}
