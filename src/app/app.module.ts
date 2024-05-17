import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './provider/auth-interceptor.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
// import { StreamingMedia } from '@awesome-cordova-plugins/streaming-media/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [ScreenOrientation,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent],
})
// StreamingMedia
export class AppModule {}
