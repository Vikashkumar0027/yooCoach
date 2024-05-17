import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursesPageRoutingModule } from './courses-routing.module';

import { CoursesPage } from './courses.page';
import { ShareComponentsModule } from 'src/app/share-components/share-components.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfComponent } from 'src/app/share-components/pdf/pdf.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ShareComponentsModule,
    CoursesPageRoutingModule,ShareComponentsModule,PdfViewerModule,SwiperModule
  ],
  declarations: [CoursesPage,PdfComponent]
})
export class CoursesPageModule {}
