import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
// import { StreamingMedia, StreamingVideoOptions } from '@awesome-cordova-plugins/streaming-media/ngx';
// import YouTubePlayer from 'youtube-player';
import { Platform } from '@ionic/angular';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-vdoplayercomponet',
  templateUrl: './vdoplayercomponet.component.html',
  styleUrls: ['./vdoplayercomponet.component.scss'],
})
export class VdoplayercomponetComponent implements OnInit {
@Input() videoId:any;
isWatchYoutube:boolean = true;
// npm i youtube-player --save
// error:any;
// player:any;
// stopped:boolean=true; https://www.youtube-nocookie.com/embed/JJQo9iTKeNU?rel=0?&theme=dark&autohide=2&modestbranding=1&origin=https://key.bio
videodisabled:boolean = false;
innerHeight: any;
links:any = "";
urlSafe:any;
  constructor(private global: GlobalService,
    private platform: Platform,
    private screenOrientation: ScreenOrientation,
    public sanitizer: DomSanitizer
    ) {
      
    }

  // I use Screen Orientaion Plugin npm   https://ionicframework.com/docs/native/screen-orientation
  ngOnInit() {
      // this.play();
      this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.links);
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      this.platform.ready().then(() => {
        this.innerHeight =  (this.platform.width() - 10)+'px';
      });
      this.playVdo();
  }

  watchYoutube(){
    this.isWatchYoutube = false;
  }

  playVdo(){
    this.links =  "https://www.youtube-nocookie.com/embed/" + this.videoId + "?modestbranding=1&enablejsapi=1&widgetid=3&iv_load_policy=3&fs=0&rel=0";
    // this.links =  "https://www.youtube-nocookie.com/embed/" + this.videoId + "?&theme=dark&autohide=2&modestbranding=1&origin=https://key.bio";
  this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.links);
  }

  // cssPart(){
  //   document.getElementsByClassName("ytp-button ytp-share-button ytp-share-button-visible ytp-show-share-title")[0].style.display = 'none'
  // }

  ionViewWillLeave(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
  }
//  orientation: 'portrait',
  // play(){
  //   try {
  //     // this.youtube.openVideo('zC7B81ZtZV4');
  //     if(this.stopped){
  //       if(this.player == undefined){
  //         this.player = YouTubePlayer('divid');
          
  //       }
  //       this.player.loadVideoById(this.videoId).then(() => {
  //         this.stopped = false;
  //       })
  //     }
  //   } catch (e) {
  //     this.error = e;
  //     // console.log('get error',e)
  //   }
  // }

  cancel(){
    this.global.modalDismiss();
    // this.stopVdo();
    
  }

  // stopVdo() {
  //   if(!this.stopped){
  //     this.player.stopVideo().then(()=>{
  //       this.stopped = true;
  //     })
  //   }
  // }

}
