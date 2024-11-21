import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { SignupComponent } from '../share-components/signup/signup.component';
import { TermConditionComponent } from '../share-components/term-condition/term-condition.component';
import { AdminLoginComponent } from '../share-components/admin-login/admin-login.component';
import { LoginGuard } from '../guard/login/login.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'termCondition',
    component: TermConditionComponent,
  },
  {
    path: 'adminLogin',
    component: AdminLoginComponent,
    // canLoad:[LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
