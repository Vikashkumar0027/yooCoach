import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ZoomMtg } from '@zoomus/websdk';
import { ChatService } from 'src/app/services/chat/chat.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LiveclassService } from 'src/app/services/liveclass/liveclass.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

// ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.0/lib', '/av');

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();
// // loads language files, also passes any error messages to the ui
// ZoomMtg.i18n.load('en-US');
// ZoomMtg.i18n.reload('en-US');
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';
import { ZoomMtg } from '@zoom/meetingsdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
@Component({
  selector: 'app-live-class',
  templateUrl: './live-class.component.html',
  styleUrls: ['./live-class.component.scss'],
})
export class LiveClassComponent implements OnInit,OnDestroy {



  liveClassSub: Subscription;
  @Output() zoomMeeting: EventEmitter<any> = new EventEmitter();
  @Input() userDetails:any;
  //meetingNumber = '82790367280';    //Always enter current changes generated Meeting Nuber
  signatureEndpoint = '';
  sdkKey = 'mWl1qRDrScuqDvbaA6IsEA';  //Rb sing sdk Key
  sdkSecret='ZOAUGxwJAiRXNVM7GVBtZhVj5q3RVaEW';
  role:any = 0;
  leaveUrl = '/tabs/dashboard/liveClasses';
 // userName = 'Angular';
//  meeting_id = '75962433044'
//  passcode = 'X7z4Be';
  registrantToken = ''
  form: FormGroup;
  vdoListing:any[]=[];
  batchList:any[]=[];

 // New Zoom code start
 authEndpoint = ''
//  sdkKey = 'mWl1qRDrScuqDvbaA6IsEA'
//  meetingNumber = '5468163164'
//  passWord = '0LUu1z'
//  role = 0
//  userName = 'Shreya'
//  userEmail = 'vkjust4uarchu27@gmail.com';
 zakToken = '';

 client = ZoomMtgEmbedded.createClient();


  constructor(private chatService:ChatService,
    private commonService: CommonService,
    private global: GlobalService,
    private liveclassService:LiveclassService,
    private router:Router,
    private loginService:LoginService,
    private ngZone: NgZone
  ) { }
  ngOnInit() {
    // this.globalService.showLoader();
    this. batchListing();
    this.getMeetingListing();
    this.liveVideoUpdate();
    this.initForm();
  //  setTimeout(() => {
  //   console.log('userDetails aa raha hai',this.userDetails)
  //  }, 1000);
  }



  startMeeting(signature:any, details:any) {
console.log(details);
console.log('this.user data',this.userDetails);
    document.getElementById('zmmtg-root').style.display = 'block'
    // let meetingSDKElement = document.getElementById('meetingSDKElement');

    this.ngZone.runOutsideAngular(() => {
      ZoomMtg.init({
        leaveUrl: this.leaveUrl,
        patchJsMedia: true,
        success: (success) => {
          console.log(success)
          ZoomMtg.join({
            signature: signature,
            sdkKey: this.sdkKey,
            meetingNumber: details.meeting_id,
            passWord: details.passcode,
            userName: this.userDetails.name,
            userEmail:  this.userDetails.email,
            tk: this.registrantToken,
            zak: this.zakToken,
            success: (success) => {
              console.log(success)
            },
            error: (error) => {
              console.log(error)
            }
          })
        },
        error: (error) => {
          console.log(error)
        }
      })
    })

    // this.ngZone.runOutsideAngular(() => {
    //   this.client.init({zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true}).then(() => {
    //     this.client.join({
    //       signature: signature,
    //       sdkKey: this.sdkKey,
    //       meetingNumber: this.meetingNumber,
    //       password: this.passWord,
    //       userName: this.userName,
    //       userEmail: this.userEmail,
    //       tk: this.registrantToken,
    //       zak: this.zakToken
    //     }).then(() => {
    //       console.log('joined successfully')
    //     }).catch((error) => {
    //       console.log(error)
    //     })
    //   }).catch((error) => {
    //     console.log(error)
    //   })
    // })
  }

         async getMeetingListing(){
            const jwt:any = await this.commonService.jwtToken();
        const data1 = jwt.payload.user.class_id;
            this.chatService.liveClass().subscribe(res=>{
              console.log(res);
              const fiterByclass = res.data.filter(x => x.class_id == data1);
              // this.globalService.hideLoader();
              if(res.success == true && fiterByclass.length > 0){
                // this.vdoListing = fiterByclass;
                this.liveclassService.getUserData(fiterByclass);
              }else{
                // this.vdoListing=''
                // 638f1d90da8cf12eec3cac2f
              }
            },
            (err)=> {
              console.log(err);
            })
          }

         
  liveVideoUpdate(){
    this.liveClassSub = this.liveclassService.liveMeet.subscribe(res => {
      console.log('live class data avilable',res);
      if(res?.length >= 1){
        this.vdoListing = res;
      }
    })
  }



  initForm(){
    this.form = new FormGroup({
      userName:new FormControl('',{validators: [Validators.required]}),
      meetingNumber:new FormControl('',{validators: [Validators.required]}),
      passWord:new FormControl('',{validators: [Validators.required]}),
    });
}

join(data){
  // console.log('connect meeting',data,this.userDetails);

   const signatureData = { meetingNumber: data.meeting_id, role: 0 };

  this.chatService.zoomCreateSignature(signatureData).subscribe(res=>{
    console.log(res);
    if(res.success){
  this.startMeeting(res.signature,data)
    }
  },err=>{
    console.log(err);
    this.global.errorToast('Can not get Signature');
  })

  // ZoomMtg.generateSDKSignature({
  //   sdkKey: this.sdkKey,
  //   sdkSecret: this.sdkSecret,
  //   meetingNumber: data.meeting_id,
  //   role: this.role,
  //   success : (res) => {
  //   console.log(res);
  //   this.startMeeting(res.result, data);
  //   },
  //   error : (err) => {
  //   console.log(err);
  //   }
  //   });
}



  // submit(){
  //   ZoomMtg.generateSDKSignature({
  //     sdkKey: this.sdkKey,
  //     sdkSecret: this.sdkSecret,
  //     meetingNumber: this.form.value.meetingNumber,
  //     role: this.role,
  //     success : (res) => {
  //     console.log(res);
  //     this.startMeeting(res.result);
  //     },
  //     error : (err) => {
  //     console.log(err);
  //     }
  //     });
  // }

  // startMeeting(signature, data) {
  //   document.getElementById('zmmtg-root').style.display = 'block';
  //   // ZoomMtg.init({
  //   //   leaveUrl:  this.leaveUrl,
  //   //   success: (success) => {
  //   //     console.log(success)
  //   //     ZoomMtg.join({
  //   //       signature: signature,
  //   //       meetingNumber: data.meeting_id,
  //   //       userName: this.userDetails.name,
  //   //       sdkKey: this.sdkKey,
  //   //       userEmail:this.userDetails.email,
  //   //       passWord:data.passcode,
  //   //       tk: this.registrantToken,
  //   //       success: (success) => {
  //   //         console.log(success)
  //   //       },
  //   //       error: (error) => {
  //   //         console.log(error)
  //   //       }
  //   //     })
  //   //   },
  //   //   error: (error) => {
  //   //     console.log(error)
  //   //   }
  //   // })
  // }

  cancel(){
    this.router.navigate(['/', 'tabs']);
    
  }

  timeFuction(timeString){
    // const data = timeString;
    // return data;
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }

  batchListing(){
    this.loginService.getBatch().subscribe(res=>{
      console.log(res)
      if(res.success){
        this.batchList = res.data;
      }
    },err => {
      console.log(err);
    })
  }

  batchName(id){
    const batch = this.batchList.filter(x => x._id == id);
    return batch[0]?.batch_time;
  }

  ngOnDestroy(): void {
    this.global.customeStatusBar();
    if(this.liveClassSub) this.liveClassSub.unsubscribe();
  }

}









//   liveClassSub: Subscription;
//   @Output() zoomMeeting: EventEmitter<any> = new EventEmitter();
//   @Input() userDetails:any;
//   //meetingNumber = '82790367280';    //Always enter current changes generated Meeting Nuber
//   signatureEndpoint = '';
//   sdkKey = 'RvcYnjDXOBZ1EEViABzK5CehK4NvHID1ciRJ'; //vikash Sdk Key
//   sdkSecret='HCWoPvkbK5faZcWmTv9e11IO68Ns4O5ZlHUL';
//   // sdkKey = ' J7tX65XyQQWNEJHVSti6kw';  //Rb sing sdk Key
//   // sdkSecret='bdLA7wkOimbte34RyUkotOb1UgDrQ9QL';
//   role:any = 0;
//   leaveUrl = '/tabs/dashboard/liveClasses';
//  // userName = 'Angular';
// //  meeting_id = '75962433044'
// //  passcode = 'X7z4Be';
//   registrantToken = ''
//   form: FormGroup;
//   vdoListing:any[]=[];
//   batchList:any[]=[];
//   constructor(private chatService:ChatService,
//     private commonService: CommonService,
//     private global: GlobalService,
//     private liveclassService:LiveclassService,
//     private router:Router,
//     private loginService:LoginService) { }
//   ngOnInit() {
//     // this.globalService.showLoader();
//     this. batchListing();
//     this.getMeetingListing();
//     this.liveVideoUpdate();
//     this.initForm();
//   //  setTimeout(() => {
//   //   console.log('userDetails aa raha hai',this.userDetails)
//   //  }, 1000);
//   }

//          async getMeetingListing(){
//             const jwt:any = await this.commonService.jwtToken();
//         const data1 = jwt.payload.user.class_id;
//             this.chatService.liveClass().subscribe(res=>{
//               console.log(res);
//               const fiterByclass = res.data.filter(x => x.class_id == data1);
//               // this.globalService.hideLoader();
//               if(res.success == true && fiterByclass.length > 0){
//                 // this.vdoListing = fiterByclass;
//                 this.liveclassService.getUserData(fiterByclass);
//               }else{
//                 // this.vdoListing=''
//                 // 638f1d90da8cf12eec3cac2f
//               }
//             },
//             (err)=> {
//               console.log(err);
//             })
//           }

         
//   liveVideoUpdate(){
//     this.liveClassSub = this.liveclassService.liveMeet.subscribe(res => {
//       console.log('live class data avilable',res);
//       if(res?.length >= 1){
//         this.vdoListing = res;
//       }
//     })
//   }



//   initForm(){
//     this.form = new FormGroup({
//       userName:new FormControl('',{validators: [Validators.required]}),
//       meetingNumber:new FormControl('',{validators: [Validators.required]}),
//       passWord:new FormControl('',{validators: [Validators.required]}),
//     });
// }

// join(data){
//   console.log('connect meeting',data);
//   console.log('this.user data',this.userDetails);

//   ZoomMtg.generateSDKSignature({
//     sdkKey: this.sdkKey,
//     sdkSecret: this.sdkSecret,
//     meetingNumber: data.meeting_id,
//     role: this.role,
//     success : (res) => {
//     console.log(res);
//     this.startMeeting(res.result, data);
//     },
//     error : (err) => {
//     console.log(err);
//     }
//     });
// }



//   // submit(){
//   //   ZoomMtg.generateSDKSignature({
//   //     sdkKey: this.sdkKey,
//   //     sdkSecret: this.sdkSecret,
//   //     meetingNumber: this.form.value.meetingNumber,
//   //     role: this.role,
//   //     success : (res) => {
//   //     console.log(res);
//   //     this.startMeeting(res.result);
//   //     },
//   //     error : (err) => {
//   //     console.log(err);
//   //     }
//   //     });
//   // }

//   startMeeting(signature, data) {
//     document.getElementById('zmmtg-root').style.display = 'block';
//     ZoomMtg.init({
//       leaveUrl:  this.leaveUrl,
//       success: (success) => {
//         console.log(success)
//         ZoomMtg.join({
//           signature: signature,
//           meetingNumber: data.meeting_id,
//           userName: this.userDetails.name,
//           sdkKey: this.sdkKey,
//           userEmail:this.userDetails.email,
//           passWord:data.passcode,
//           tk: this.registrantToken,
//           success: (success) => {
//             console.log(success)
//           },
//           error: (error) => {
//             console.log(error)
//           }
//         })
//       },
//       error: (error) => {
//         console.log(error)
//       }
//     })
//   }

//   cancel(){
//     this.router.navigate(['/', 'tabs']);
    
//   }

//   timeFuction(timeString){
//     // const data = timeString;
//     // return data;
//     const [hourString, minute] = timeString.split(":");
//     const hour = +hourString % 24;
//     return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
//   }

//   batchListing(){
//     this.loginService.getBatch().subscribe(res=>{
//       console.log(res)
//       if(res.success){
//         this.batchList = res.data;
//       }
//     },err => {
//       console.log(err);
//     })
//   }

//   batchName(id){
//     const batch = this.batchList.filter(x => x._id == id);
//     return batch[0]?.batch_time;
//   }

//   ngOnDestroy(): void {
//     this.global.customeStatusBar();
//     if(this.liveClassSub) this.liveClassSub.unsubscribe();
//   }

// }
