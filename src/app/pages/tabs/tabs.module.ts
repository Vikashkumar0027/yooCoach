import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ContactUsComponent } from 'src/app/share-components/contact-us/contact-us.component';
import { ShareComponentsModule } from 'src/app/share-components/share-components.module';
import { LiveChatComponent } from 'src/app/share-components/live-chat/live-chat.component';
import { NotificationComponent } from 'src/app/share-components/notification/notification.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,ShareComponentsModule
  ],
  declarations: [TabsPage,ContactUsComponent,LiveChatComponent,NotificationComponent]
})
export class TabsPageModule {}
