import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';
import { AccountPage } from './account.page';
// import { AccountbannerComponent } from 'src/app/share-components/accountbanner/accountbanner.component';
import { PaymentComponent } from 'src/app/share-components/payment/payment.component';
import { AttendanceComponent } from 'src/app/share-components/attendance/attendance.component';
import { PurchaseComponent } from 'src/app/share-components/purchase/purchase.component';
import { QuizComponent } from 'src/app/share-components/quiz/quiz.component';
import { ShareComponentsModule } from 'src/app/share-components/share-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,ShareComponentsModule
  ],
  declarations: [AccountPage,PaymentComponent,AttendanceComponent,PurchaseComponent,QuizComponent]
})
export class AccountPageModule {}
