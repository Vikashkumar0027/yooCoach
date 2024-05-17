import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { QuizlistService } from 'src/app/services/quizlist/quizlist.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TestService } from 'src/app/services/test/test.service';
// import { QuizlistComponent } from 'src/app/share-components/quizlist/quizlist.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  selectedArray :any;
  dataIs = false;
  subjectLists:any[]=[];
  model: any ={
    title: 'No data Available',
    icon: 'alert-circle-outline',
    color: 'danger'
  };
  // form :any[]= [
  //   { val: 'business', img:'assets/img/icon1.png', isChecked: false },
  //   { val: 'math',img:'assets/img/icon2.png', isChecked: false },
  //   { val: 'physics',img:'assets/img/icon3.png', isChecked: false },
  //   { val: 'chemistry',img:'assets/img/icon4.png', isChecked: false },
  //   { val: 'biology',img:'assets/img/icon5.png', isChecked: false },
  //   { val: 'english',img:'assets/img/icon6.png', isChecked: false },
  //   { val: 'hindi',img:'assets/img/icon7.png', isChecked: false },
  //   { val: 'history',img:'assets/img/icon2.png', isChecked: false }
  // ];
  constructor(private global:GlobalService,
    private router:Router,
    private setService:TestService,
    private commonService:CommonService,
    private authToken:AuthUidService,
    private quizListService:QuizlistService,
    private sessionService:SessionService) { }

  ngOnInit() {
  //  this.InterCepetorToken();
  this.global.showLoader();
  this.subjetcdataList();
  }

  async subjetcdataList(){
    const tokenDAta = await this.commonService.getStorage('gurukultkns');
    const tokens = JSON.parse(tokenDAta.value);
    this.authToken.getUid(tokens);
    this.quizListService.getSubject().subscribe(res=>{
      console.log('res of subject api',res)
      if(res.success==true){ 
        // this.dataIs = true;
       (!res.data.length) ? this.dataIs = true : this.dataIs = false;
        this.subjectLists=res.data;
        console.log("subject listing api hiot",this.subjectLists);
        this.global.hideLoader();
      }else{
        this.dataIs = false;
        this.global.hideLoader();
        this.global.errorToast('something went Wrong');
      }
    },
    (err)=>{
      console.log('Error',err);
      this.global.errorToast(err.error.message)
      this.global.hideLoader();
    })
  }

//  async InterCepetorToken(){
//     const tokenDAta = await this.commonService.getStorage('gurukultkns');
//     const tokens = JSON.parse(tokenDAta.value);
//     this.authToken.getUid(tokens);
//   }

  // submit(){
  // console.log('total selective data',this.selectedArray);
  // }




 selectMember(data){
  console.log('all se',data);
      
    setTimeout(() => {

    if (data.isChecked == true) {
      this.selectedArray = data;

     this.subjectLists.forEach( (el) => {
      if(el._id.subject_id == data._id.subject_id){
          return;
         }else{
          el.isChecked = false;
         }
     });
     setTimeout(() => {
      //  this.openQuiseLists(this.selectedArray.subject_name);
      this.openQuiseLists(this.selectedArray);
      this.selectedArray.isChecked = false;  //its do unselected for selected subjected
     }, 200);

     } else {
      this.selectedArray = {};
      // console.log("All Subject",this.form);
    }
    console.log("selected subject",this.selectedArray);
    
  });
   }

   async openQuiseLists(param){
    const data = {class_id:param.class_id, subject_id: param.subject_id};
    // console.log('navData', data);
    const navData: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(data)
      }
    };
    // console.log('navData', data);
    this.router.navigate([this.router.url,'quizelist'], navData);
   
    // this.router.navigate(['/', 'tabs', 'quizelist', id]);

    // this.router.navigate([this.router.url,'quiz-questions'], navData);
   }

   async ionViewDidEnter(){
    this.sessionCheck();
 }

 sessionCheck(){
   this.sessionService.checkSession().subscribe(res=>{
     console.log(res);
     if(res.msg == 'Session Is Inactive'){
        this.commonService.loginToAnotherDevice(res.msg);
     }
   });
 }


}
