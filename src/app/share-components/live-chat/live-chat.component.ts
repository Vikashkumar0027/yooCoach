import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';

import { interval, Subject } from 'rxjs';
import { map, takeUntil, takeWhile } from 'rxjs/operators';
import { addSeconds, format } from 'date-fns';
@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss'],
})
export class LiveChatComponent implements OnInit {
  txtMsg:string;
  chatList:any[]=[];
//   conservation:any[]=[
//     {added_date: "2022-07-20 08:15:46",
//     cs_id: "6",
//     message: "hello sir, Good Morning",
//     reply_on: "0",
//     reply_to: "0",
//     status: "1",
//     uid: "24"},
//     {
//       added_date: "2022-07-25 15:45:56",
// cs_id: "14",
// message: "Hi, How can i help you?",
// reply_on: "13",
// reply_to: "24",
// status: "2",
// uid: "24",
//     },
//     {added_date: "2022-07-20 08:17:20",
//     cs_id: "7",
//     message: "When new Batch Start",
//     reply_on: "0",
//     reply_to: "0",
//     status: "1",
//     uid: "24"},{
//       added_date: "2022-07-25 15:45:56",
// cs_id: "14",
// message: "Your batch start soon",
// reply_on: "13",
// reply_to: "24",
// status: "2",
// uid: "24",
//     }, {added_date: "2022-07-20 08:17:20",
//     cs_id: "7",
//     message: "We will be helping to finding a store for your order. A support representative will you shortly",
//     reply_on: "0",
//     reply_to: "0",
//     status: "1",
//     uid: "24"},
//   ];
id:any;
  counter = 1;
  countdownDisplay?: string;
  starter$ = new Subject<void>();
  // @ViewChild('content') private content: any;
  @ViewChild(IonContent) content: IonContent;
  constructor(private chatService:ChatService,
    private global: GlobalService,
    private commonService: CommonService,
    private authToken: AuthUidService,) { }

  async ngOnInit() {
   
    const token = await this.commonService.getStorage('gurukultkns');
    const tokens = JSON.parse(token.value);
    this.authToken.getUid(tokens);
    this.getList();
    this.scrollToBottom();
  }

  ionViewDidEnter(){
    // this.getList();
    this.repetition();
    this.scrollToBottom();
  }
  ionViewWillLeave(){
    if (this.id) {
          clearInterval(this.id);
        }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400);
  }

  async getList(){
    const jwtToken:any = await this.commonService.jwtToken();

    this.chatService.chatList(jwtToken.payload.user._id).subscribe(res=>{
      // console.log('result of chat api ',res);
      if(res.success==true && this.chatList.length!==res.data.length){
        this.chatList = res.data;
        // console.log('push chatlist data');
        // this.content.scrollToBottom(400);
        this.scrollToBottom();
      }
    })
  }

  repetition(){
    this.id= setInterval(() => {
      // this.scrollToBottom();
     this.getList();
      }, 2000);
  }
  
 
  
   async submit(){
    const jwtToken:any = await this.commonService.jwtToken();
    console.log('Token ID Get',jwtToken.payload.user._id);
    console.log('data of input',this.txtMsg);
    const data ={ "student_id":jwtToken.payload.user._id, "reply_to":"", "message":this.txtMsg }
    this.chatService.chatSend(data).subscribe(res=>{
      console.log('result of chat api ',res);
      if(res.success==true){
        this.txtMsg = '';
        this.getList();
      }
    })
  //  alert('working...');
  }
  
    anyQuery(){
  
    }

    // startCounter() {
    //   this.starter$.next(); // clear pending timers
    //   let nsecs = this.counter;
    //   interval(1000)
    //     .pipe(
    //       takeUntil(this.starter$),
    //       takeWhile((countup) => countup <= nsecs),
    //       map((countup) => {
    //         let countdown = nsecs - countup;
    //         let d = new Date();
    //         d.setHours(0, 0, 0, 0);
    //         d = addSeconds(d, countdown);
    //         let fmt = format(d, 'HH:mm:ss');
    //         // alert('working')
    //         return fmt;
    //       })
    //     )
    //     .subscribe(
    //       (cd) => (this.countdownDisplay = cd),
    //       (err) => console.log(err),
    //       () =>
    //         //  alert("ding")
    //         console.log('ding')
    //     );
    // }
  
  }
  