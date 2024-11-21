import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUidService } from '../provider/authUid/auth-uid.service';
import { CommonService } from '../services/common/common.service';
import { GlobalService } from '../services/global/global.service';
import { SubjectDetailService } from '../services/subjectDetail/subject-detail.service';

@Component({
  selector: 'app-subject-detais',
  templateUrl: './subject-detais.page.html',
  styleUrls: ['./subject-detais.page.scss'],
})
export class SubjectDetaisPage implements OnInit {
  isLoading:boolean;
  classes:any[] = [];
  subject:any[] = [];
  selectedClass:any;
  selectedArray :any = [];
class:any[]=[
  {id:7, sub_name:"Class 7th"},
  {id:8, sub_name:"Class 8th"},
  {id:9, sub_name:"Class 9th"},
  {id:7, sub_name:"Class 10th"},
  {id:8, sub_name:"Class 11th"},
  {id:9, sub_name:"Class 12th"},
];
 form = [
  { val: 'Business', img:'assets/img/icon1.png', isChecked: true },
  { val: 'Mathmetics',img:'assets/img/icon2.png', isChecked: false },
  { val: 'Physics',img:'assets/img/icon3.png', isChecked: false },
  { val: 'Chemistry',img:'assets/img/icon4.png', isChecked: false },
  { val: 'Biology',img:'assets/img/icon5.png', isChecked: false },
  { val: 'English',img:'assets/img/icon6.png', isChecked: false },
  { val: 'Hindi',img:'assets/img/icon7.png', isChecked: false },
  { val: 'History',img:'assets/img/icon2.png', isChecked: false }
];
  constructor(
    private router: Router,
    private subjectService: SubjectDetailService,
    private global: GlobalService,
    private commonService: CommonService,
    private authuid: AuthUidService,
    ) { }

  ngOnInit() {
    this.global.showLoader()
    // this.getToken();
      this.getAllSubjectApi();
  }
  

  classData(d){
    console.log('selected class',d);
    this.selectedClass=d.class_name;
    console.log('selcted classs',this.selectedClass);
  }
  selectMember(data){
    setTimeout(() => {
      console.log('data of subject',data);
      if (data.isChecked == true) {
           this.selectedArray.push(data.subject_name);
         } else {
          let newArray = this.selectedArray.filter(function(el) {
            return el !== data.subject_name;
         });
          this.selectedArray = newArray;
        }
        console.log('selected subjected',this.selectedArray);
    }, );

   }


  async getAllSubjectApi(){
      const token = await this.commonService.getStorage('token');
      const tokens = JSON.parse(token.value);
      this.authuid.getUid(tokens);
this.subjectService.getData().subscribe(res => {
  console.log('subjectData api hit data', res);
  this.isLoading=true;
   if(res.success == true){
       this.classes = res.result.class;
       this.subject = res.result.subject;
        console.log(res.data);
        this.global.hideLoader();
   }else {
   this.global.errorToast("Something Went Wrong on Api");
   this.global.hideLoader();
   }
},
(error)=>{
  this.global.hideLoader();
  this.global.errorToast('error in Api');
})
     }

  submit(){
    this.global.showLoader();
    // console.log(this.selectedArray);
    if(this.selectedArray.length == 0 || !this.selectedClass){
      alert('please select Class and Interested Subject');
      return;
    }else{
      const data = {"class":this.selectedClass, "interest":[...this.selectedArray] };
      // console.log('all selected data', data);
      this.subjectService.selectedData(data).subscribe(res => {
        console.log('submit api heat',res);
        if(res.success == true){
          this.global.hideLoader();
          this.router.navigateByUrl('/personal-details');
          this.commonService.setStorage('_id',res.result._id);
        }else{
          this.global.errorToast('Somthing Went Wrong');
          this.global.hideLoader();
        }
      },
      (err)=>{
        console.log(err);
        this.commonService.tokenOutOfValid(err);
        this.global.hideLoader();
      })
    }
    // this.getAllSubjectApi();
   
      }

      async getToken(){
      const token =await this.commonService.getStorage('token');
      this.authuid.getUid(token.value);
      }

}
