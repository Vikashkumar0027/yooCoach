import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserDetailService } from 'src/app/services/userDetail/user-detail.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { CommonService } from 'src/app/services/common/common.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  isLoading:boolean=false;
  classes:any[] = [];
  batchList:any[] = [];
  mainBatchList:any[] = [];
  studentList:any[] = [];
  attendence:any[] = [];
  // No data Available
  model: any ={
    title: 'Please Select Class and Batch, Thereafter click on Search Button ',
    icon: 'alert-circle-outline',
    color: 'danger'
  };
  // selectClass:any;
  @ViewChild('form') form: NgForm;
  constructor(
    private global:GlobalService,
    private userDetailService:UserDetailService,
    private router:Router,
    private loginService:LoginService,
    private commonService: CommonService,
    private adminService:AdminService,
    
    private authToken: AuthUidService
  ) { }

 async ngOnInit() {
    const tokenDAta = await this.commonService.getStorage('admiTkns');
    const tokens = JSON.parse(tokenDAta.value);
    this.authToken.getUid(tokens);
    this.gateBatchLst();
    this.getClass();
  }

  onClassChange(event){
    console.log(event.detail.value);
    this.batchList = this.mainBatchList.filter(x=>x.class_id==event.detail.value);
    this.isLoading = true;

  }

  noData(msg){
    this.model ={
      title: msg,
      icon: 'alert-circle-outline',
      color: 'danger'
    };
  }

  getClass(){
    
    this.global.showLoader()
    this.loginService.getClass().subscribe(res => {
      if(res.success == true){
        this.classes = res.data;
        this.global.hideLoader();
      }
    },
    (error) => {
      this.global.hideLoader();
      this.global.errorToast('Please Check internet');
      this.router.navigate(['/home']);
    }
    );
 
  }

  gateBatchLst(){
    this.loginService.getBatch().subscribe(res=> {
      // console.log(res);
      if(res.success == true){
        this.mainBatchList = res.data;
        // this.batchList = res.data;        
      }
    });      
  }

  getStudentList(form:any){
    console.log(form.value)
    if(form.invalid){
        this.global.errorToast('Please Select first class and batch');
        return;
    }
    this.attendence=[];
    const formData = {batchTime:form.value.batch,classId:form.value.class};
    this.global.showLoader()
    this.adminService.getStudent(formData).subscribe(res=>{
      console.log(res);
      if(res.success){
        this.studentList =res.newArr;
       
       if(this.studentList.length){
        res.newArr.forEach(x=>{
          const data = {_id:x._id, attendence:false};
          this.attendence.push(data);
        })
       }else{
         this.alreadyAttendace(res);
       }

      }
      this.global.hideLoader();
     
    },err=>{
      console.log(err);
      this.global.hideLoader();
    })
  }

    alreadyAttendace(res){
  if(res.newArr.length !== res.batchStudentLength){
  this.global.errorToast('You have already submitted attendance');
  this.noData('You have already marked your attendance for this batch.');
  }else{
    this.noData('No data Available For this Batch');
  }
    }

  logout(){
    this.global.showAlert(
      'Are You sure yoy Want to logout?',
      'confirm',
      [{
        text: 'No',
        role: 'Cancel'
      },{
        text: 'Yes',
        handler: () => {
          this.confirmLogout();
        }
      }]
    );
  }

  confirmLogout() {
    this.userDetailService.getUserData('');
  
        this.global.showLoader();
        this.global.successToast('logOut SuccessFully');
                  Preferences.clear();
                  this.router.navigate(['/home'])
                   .then(() => {
                    window.location.reload();
                    });
                    this.global.hideLoader();
      }

      //    selectMember(data:any,check){
      //      console.log(data,check);

      //  }

       onCheckboxChange(event: any,data:any) {
        const isChecked = event.detail.checked;
        console.log('Checkbox is now:', isChecked,data);
        this.attendence.forEach((x:any)=>{
          if(x._id== data._id){
            x.attendence=isChecked;
          }
        })

        console.log(this.attendence);
      };

      submitAttendance(){
 const formData = { "attendence":this.attendence };
 console.log(formData);

     this.global.showLoader();

      this.adminService.submitAttnds(formData).subscribe(res=>{
       console.log(res);
       if(res.success){
        this.global.successToast(res.msg);
        this.form.reset();
        this.studentList=[];
        this.attendence=[];
       }
       this.global.hideLoader();
      },err=>{
        this.global.hideLoader();
       console.log(err);
      })
    }

}
