import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { SessionService } from 'src/app/services/session/session.service';
import { SubjectDetailService } from 'src/app/services/subjectDetail/subject-detail.service';
import { UserDetailService } from 'src/app/services/userDetail/user-detail.service';
import { PdfComponent } from 'src/app/share-components/pdf/pdf.component';
import { SampleImageComponent } from 'src/app/share-components/sample-image/sample-image.component';
import { VdoplayercomponetComponent } from 'src/app/share-components/vdoplayercomponet/vdoplayercomponet.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit,OnDestroy {
  dataIs:boolean = false;
  selectedHeader:any;
  model: any ={
    title: 'No data Available',
    icon: 'alert-circle-outline',
    color: 'danger'
  };
  // header:any[] =[{id:1,name:'Math'},{id:2,name:'Physics'},{id:3,name:'HINDI'},{id:4,name:'Chemistry'},{id:5,name:'Biology'},{id:6,name:'English'}];
//   alldataList:any[]=[
//     { "title":"Chapter-2",
//   "exercise":[
//     {"name":"Important point -1"},
//     {"name":"Exercise-2.1"},
//     {"name":"Exercise-2.2"},
//     {"name":"Exercise-2.3"},
//     {"name":"Exercise-2.4"},
// ]},
// { "title":"Chapter-3",
// "exercise":[
//   {"name":"Important point -1"},
//   {"name":"Exercise-2.1"},
//   {"name":"Exercise-2.2"},
//   {"name":"Exercise-2.3"},
//   {"name":"Exercise-2.4"},
// ]},
// { "title":"Chapter-4",
// "exercise":[
//   {"name":"Important point -1"},
//   {"name":"Exercise-2.1"},
//   {"name":"Exercise-2.2"},
//   {"name":"Exercise-2.3"},
//   {"name":"Exercise-2.4"},
// ]},
// ]
alldataList:any[]=[];
header:any[] =[];

userData: Subscription;
userDetails:any;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private global:GlobalService,
    private subjectService:SubjectDetailService,
    private commonService:CommonService,
    private authToken:AuthUidService,
    private sessionService:SessionService,
    private userDetailService:UserDetailService) { }

  ngOnInit() {
  //  this.httpgetdata();
  this.userDataSub();
  }
   async ionViewDidEnter(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log('ion did enter snapSHot Active Route', id);
    this.httpgetdata();
          }

  alert(param){
    if(param?.topic.length >= 1){
      return;
    }else{
      this.global.errorToast('Topics are not avilable ');
    }
  }

  async httpgetdata(){
    try {
      
    const tokenDAta = await this.commonService.getStorage('gurukultkns');
    const tokens = JSON.parse(tokenDAta.value);
    this.authToken.getUid(tokens);
    this.getSubject();
    this.sessionCheck();
    // this.accordiansData();
    // setTimeout(() => {
    //   this.global.hideLoader();
    // });
    } catch (error) {
      this.global.hideLoader();
      this.global.errorToast('Something will Wrong');
      
    }
  }

  sessionCheck(){
    this.sessionService.checkSession().subscribe(res=>{
      console.log(res);
      if(res.msg == 'Session Is Inactive'){
         this.commonService.loginToAnotherDevice(res.msg);
      }
    });
  }

  bannerData(event){
    // console.log(event)
    // alert('dada')
    this.global.showLoader();
    // Here this.alldataList data Updated By subject Wise.
    console.log("all subjected selected in Cource Page",event);
    this.accordiansData(event);
  }

  async accordiansData(id){
    const tokenDAta = await this.commonService.getStorage('gurukultkns');
    const tokens = JSON.parse(tokenDAta.value);
    this.authToken.getUid(tokens);
    // const data={"subject_id":"63942e52abaaae896dee66f7"};
    const data={"subject_id":id};
    this.subjectService.accordinanData(data).subscribe(res=>{
      console.log('rsult of subjetc accordians data', res);
      if(res.success){
        (res.data.length <= 0 ) ?   this.dataIs = true :  this.dataIs = false;
        this.alldataList = res.data;
        this.global.hideLoader();
        setTimeout(() => {
          this.global.hideLoader();
        }, 1000);
      }
      else{
        this.dataIs = true;
        this.alldataList= [];
        this.global.hideLoader();
        setTimeout(() => {
          this.global.hideLoader();
        }, 1000);
        // this.global.errorToast(res?.message);
      }
    },(err)=>{
      this.global.hideLoader();
      this.commonService.tokenOutOfValid(err);
      this.alldataList= [];
    })
  }

  userDataSub(){
    this.userData = this.userDetailService.cart.subscribe(res => {
     console.log('result of the res userData in app.ts',res)
     this.userDetails = res;
    })
 }

  async getSubject(){
   const jwt:any = await this.commonService.jwtToken();
    const data = jwt.payload.user.class_id;
    // const data = "63942dcfabaaae896dee66f5";
    this.subjectService.getSubject(data).subscribe(res=>{
      console.log('subject data image',res);
      if(res.success==true){
        if(JSON.stringify(res.data) != JSON.stringify(this.header)  && this.header.length != 0 ){
          console.log(res.data[0]._id);
          this.accordiansData(res.data[0]._id);
          this.selectedHeader = res.data[0]._id;
        }
        // if(JSON.stringify(res.data) != JSON.stringify(this.header)) this.header=res.data;
        this.filterSUbject(res.data);
         
      }
    },
    (err)=>{
      this.global.errorToast(err.error);
    })
  }

  filterSUbject(subject){
    // this.image.package
    if(this.userDetails.package === 'all'){
      if(JSON.stringify(subject) != JSON.stringify(this.header)) this.header=subject;
    }else if(this.userDetails.package === 'math+science'){
 const subjectData = subject.filter(x=> x.name == "Math" || x.name == "Science");
 if(JSON.stringify(subjectData) != JSON.stringify(this.header)) this.header=subjectData;

    }else if(this.userDetails.package === 'arts'){
      const subjectData = subject.filter(x=> x.name == "Arts" || x.name == "Hindi" || x.name == "English");
 if(JSON.stringify(subjectData) != JSON.stringify(this.header)) this.header=subjectData;
      // this.form = subjectData;
    }else if(this.userDetails.package === 'commerce'){
      const subjectData = subject.filter(x=> x.name == "Commerce" || x.name == "Hindi" || x.name == "English");
      
 if(JSON.stringify(subjectData) != JSON.stringify(this.header)) this.header=subjectData;
      // this.form = subjectData;
    }else if(this.userDetails.package === 'pcm'){
      const subjectData = subject.filter(x=> x.name !== "Arts" && x.name !== "Commerce" && x.name !== "Biology");
      
 if(JSON.stringify(subjectData) != JSON.stringify(this.header)) this.header=subjectData;
      // this.form = subjectData;
    }else if(this.userDetails.package === 'pcm+bio'){
      const subjectData = subject.filter(x=> x.name !== "Arts" && x.name !== "Commerce");
      // this.form = subjectData;
 if(JSON.stringify(subjectData) != JSON.stringify(this.header)) this.header=subjectData;
    }
   

  }

  fileType:any;
  async openPdf(e){
    this.fileType = e.upload_pdf.substring(e.upload_pdf.lastIndexOf('.') + 1).toLowerCase();
    console.log(this.fileType);

    if(this.fileType == 'pdf'){
        this.global.showLoader();
    const options = {
          component: PdfComponent,
          cssClass: 'my-custom-class',
          handle: false,
          componentProps: {
            //  from: 'home'
            src:e.upload_pdf
           }
        };
      const modal = await this.global.createModal(options);
    }else{
      // this.global.showLoader();
    const options = {
          component: SampleImageComponent,
          cssClass: 'my-custom-class',
          handle: false,
          componentProps: {
            src:e.upload_pdf
           }
        };
      const modal = await this.global.createModal(options);
    }
    // this.global.showLoader();
   
  }

  async vdoOpen(id){
    try {
      // console.log(id);
    const options = {
      component: VdoplayercomponetComponent,
      cssClass: 'my-custom-class',
      handle: false,
      componentProps: {
        //  from: 'home'
        videoId:id
       }
    };
  const modal = await this.global.createModal(options);
    } catch (error) {
      
    }
  }

  ngOnDestroy(){
    if(this.userData) this.userData.unsubscribe();
  }

}
