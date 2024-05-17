import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountbannerComponent } from './accountbanner/accountbanner.component';
// import { ContactUsComponent } from './contact-us/contact-us.component';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
// import { VdoplayercomponetComponent } from './vdoplayercomponet/vdoplayercomponet.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { MathjxComponent } from './mathjx/mathjx.component';
// import { PdfComponent } from './pdf/pdf.component';


@NgModule({
  // VdoplayercomponetComponent
  declarations: [AccountbannerComponent,EmptyScreenComponent,SkeletonComponent,MathjxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonModule,SwiperModule
  ],
  // VdoplayercomponetComponent
  exports: [ AccountbannerComponent,EmptyScreenComponent,SkeletonComponent,MathjxComponent
  ],
  entryComponents: [AccountbannerComponent
  ]
})
export class ShareComponentsModule { }
