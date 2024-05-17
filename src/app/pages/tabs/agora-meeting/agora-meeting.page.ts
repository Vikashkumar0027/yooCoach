import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LiveclassService } from 'src/app/services/liveclass/liveclass.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
declare const myTest:any;
declare const mic:any;
declare const cam:any;
declare const leave:any;
// declare const screenShareing:any;
declare const startScreenStreaming:any;
declare const screenSharedjs:any;
@Component({
  selector: 'app-agora-meeting',
  templateUrl: './agora-meeting.page.html',
  styleUrls: ['./agora-meeting.page.scss'],
})
export class AgoraMeetingPage implements OnInit {
  liveClassSub: Subscription;
  vdoListing:any[]=[];

  join(){
    myTest(this.vdoListing[0]);
  }
  cam(){
    cam();
  }

  mic(){
    mic();
  }

  leave(){
    leave();
  }

  screenShared(){
    screenSharedjs()
  }

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  mediaStream: MediaStream | undefined;
  constructor(
    private liveclassService:LiveclassService,
    private screenOrientation: ScreenOrientation,
    ) { }

  ngOnInit() {
    this.liveVideoUpdate();
  }

  isROtate:boolean = true;
  rotateScreen(){
    if(this.isROtate){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }else{
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
    }
    this.isROtate = !this.isROtate;

    
  }

  liveVideoUpdate(){
    this.liveClassSub = this.liveclassService.agoraLiveMeet.subscribe(res => {
      console.log('live class data avilable',res);
      if(res?.length >= 1){
        this.vdoListing = res;
      }
    })
  }

  ionViewWillLeave(){
    this.leave();
  }

}
