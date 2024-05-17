import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  // For this npm install npm i moment
  todayDate:any;
  date ='1996-10-13T08:35:32.000Z';

  latest:any[]=[];
  oldest:any[]=[];

// latest:any[]=[
//   {"id":1,   "date": "2022-10-19T00:00:00.000Z",
//   "description": "MathMetics is a very practical subject ",
//   "title": "MathMetics"},
//   {"id":2,   "date": "2022-10-19T00:00:00.000Z",
//   "description": "New batch sarted from 23 march ",
//   "title": "MathMetics"},
//   {"id":3,   "date": "2022-10-19T00:00:00.000Z",
//   "description": "New batch sarted from 23 march ",
//   "title": "MathMetics"},
// ];
// oldest:any[]=[
//   {"id":4,   "date": "2022-10-19T00:00:00.000Z",
//   "description": "New batch sarted from 23 march ",
//   "title": "MathMetics"},
//   {"id":5,   "date": "2022-10-19T00:00:00.000Z",
//   "description": "MathMetics is a very practical subject ",
//   "title": "MathMetics"},
//   {"id":6,   "date": "2022-10-19T00:00:00.000Z",
//   "description": "MathMetics is a very practical subject ",
//   "title": "MathMetics"},
//   {"id":7,   "date": "2022-10-19T00:00:00.000Z",
//   "description": "New batch sarted from 23 march ",
//   "title": "MathMetics"},
// ]
  constructor(private notificationService: NotificationService,
    private authToken:AuthUidService,
    private commonService:CommonService,
    private global: GlobalService) { }

  ngOnInit() {

//  const data = this.timeCalculation();
//  console.log('day find calculation', data);

    this.global.showLoader();
    const currentDate = (new Date()).toISOString();
    console.log('new date',currentDate);
    
    let d1 = Date.parse(currentDate);
    console.log('Parse date',d1);
    this.todayDate = currentDate.slice(0,10);
    console.log('After Slice', this.todayDate);
    this.getAllNotification();
  }

  // timeCalculation(){
  //   var currenttime  =  new Date().toISOString();
  //   var expiretime  = '2022-10-23T12:18:33.000Z';
    
  //   let minutes = moment(expiretime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]').diff(moment(currenttime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'), 'minutes');
    
  //   const day = minutes/(60*24);
  //   return day.toFixed(0);
  // }


  ionViewDidEnter(){
    const currentDate = (new Date()).toISOString();
    console.log('new date',currentDate);
    
    let d1 = Date.parse(currentDate);
    console.log('Parse date',d1);
    this.todayDate = currentDate.slice(0,10);
    console.log('After Slice', this.todayDate);
    this.getAllNotification();

          }

   async getAllNotification(){
      const token = await this.commonService.getStorage('gurukultkns');
      const tokens = JSON.parse(token.value);
      this.authToken.getUid(tokens);
      this.notificationService.getData().subscribe(res => {
        console.log('Notification all Data get',res);
        this.global.hideLoader();
        if(res.success == true){
          this.latest = res.Notify.filter(x => x.added_at.slice(0,10) ==this.todayDate);
          this.latest.forEach(element =>{
            let currenttime  =  new Date().toISOString();
            let oldtime  = element.added_at;
            let minutes = moment(currenttime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]').diff(moment(oldtime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'), 'minutes');
            const day = minutes/(60);
            element.oldDate = day.toFixed(0);
            console.log('oldest data',element);
          })
         
          this.oldest = res.Notify.filter(x => x.added_at.slice(0,10) !== this.todayDate);
          this.oldest.forEach(element =>{
            let currenttime  =  new Date().toISOString();
            let oldtime  = element.added_at;
            let minutes = moment(currenttime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]').diff(moment(oldtime, 'YYYY-MM-DD[T]HH:mm:ss. SSS[Z]'), 'minutes');
            const day = minutes/(60*24);
            element.olddate = day.toFixed(0);
            console.log('oldest data',element);
          })
          // console.log('old notification data', this.oldest);
        }
      },
      (err)=>{
        console.log('error massage got',err);
        this.commonService.tokenOutOfValid(err);
      })
     }

}
