import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimplePaperPageRoutingModule } from './simple-paper-routing.module';

import { SimplePaperPage } from './simple-paper.page';
import { ShareComponentsModule } from 'src/app/share-components/share-components.module';
import { SampleImageComponent } from 'src/app/share-components/sample-image/sample-image.component';
import { SwiperModule } from 'swiper/angular';
import { PinchZoomModule } from 'src/app/pinch-zoom/pinch-zoom.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimplePaperPageRoutingModule,ShareComponentsModule,SwiperModule,PinchZoomModule
  ],
  declarations: [SimplePaperPage,SampleImageComponent]
})
export class SimplePaperPageModule {}
