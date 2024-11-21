import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LoginwithPasswordComponent } from '../share-components/loginwith-password/loginwith-password.component';
import { SignupComponent } from '../share-components/signup/signup.component';
import { TermConditionComponent } from '../share-components/term-condition/term-condition.component';
import { AdminLoginComponent } from '../share-components/admin-login/admin-login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage,LoginwithPasswordComponent,SignupComponent,TermConditionComponent,AdminLoginComponent]
})
export class HomePageModule {}
