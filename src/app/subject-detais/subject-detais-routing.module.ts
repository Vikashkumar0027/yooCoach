import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectDetaisPage } from './subject-detais.page';

const routes: Routes = [
  {
    path: '',
    component: SubjectDetaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectDetaisPageRoutingModule {}
