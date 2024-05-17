import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUidService } from '../provider/authUid/auth-uid.service';
import { CommonService } from '../services/common/common.service';
import { GlobalService } from '../services/global/global.service';
import { LoginService } from '../services/login/login.service';
import { UserDetailService } from '../services/userDetail/user-detail.service';
import { Device } from '@capacitor/device';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mess:any;
  device:any;
  // error:boolean=false;
  number:any = '9341496174'
  type: boolean=true;
  form: FormGroup;
  @ViewChild('f1') fillForm: NgForm;

  constructor(private router:Router,
    private loginService: LoginService,
    private global: GlobalService,
    private commonService: CommonService,
    private userdataService:UserDetailService,
    private authUid:AuthUidService) 
    {}

    async ngOnInit() {
     this.initForm();
    //  setTimeout(() => {
    //   this.patchdata();
    //  }, 500);
    }


    initForm(){
      this.form = new FormGroup({
        contctnmbr: new FormControl(null, {validators: [Validators.required, Validators.minLength(10)]})
      });
  }

    async unicCodeVerification(){
 
    }


//  Auto save data 
    patchdata(){
 this.fillForm.form.patchValue({
        email:'ashutoshk2069@gmail.com',
        password: '7491098631'
      })
    }


    changeType(){
      this.type = !this.type;
    }
    // beautykumari70610@gmail.com
  async onSubmit(form: NgForm){
    const id = await Device.getId();
    this.device = id;
    const data = {"email":form.value.email,"password":form.value.password};
      const formdata = {"email":form.value.email,"model_no":id.uuid};
      this.loginService.unicCodeVerification(formdata).subscribe(res => {
        console.log(res);
        if(res.msg == 'New Model No. Save'){
          this.login(data);
        }else if (res.data[0].model_no == id.uuid){
          this.login(data);
        }else{
          this.global.errorToast('Not your device,Please contact Admin',4000);
        }
      },
      (err)=> {
        console.log(err);
        this.global.errorToast('Please Check User Id And Password');
      });
    
  }


  login(data){
    this.global.showLoader();
              this.loginService.loginByUser(data).subscribe(res => {
                this.userdataService.getUserData(res); //its only for menbar true false
                if(res?.success === true){       
                  this.global.hideLoader();
                  this.commonService.setStorage('gurukultkns',res.token);
                  // this.commonService.setStorage('token',res.token);
                  this.authUid.getUid(res.token);
                  this.router.navigateByUrl('/tabs');
                  // this.commonService.setStorage('otpCode', res.message);
                  // this.commonService.setStorage('login', Number(formValue.mob));
                  // this.router.navigateByUrl('/otpfield');
                }else{
             this.global.errorToast('res?.success==false Wrong');
             this.global.hideLoader();
                }
              },
              (err)=>{
                console.log('Error in Logi api',err)
                console.log('Error in Logi api',err.error.msg);
                (err.error.msg == 'Invalid Password' || 'Invalid Email' || 'You Cannot Login Because Your session Is Inactive') ? this.global.errorToast(err.error.msg): '';
                // this.error=true;
                this.mess=err;
             this.global.hideLoader();
                // this.global.errorToast('Somthing went Error');
              }
              )
  }

  error:any;
  onSubmitNewUser(){
if(this.form.invalid){
  this.global.errorToast('Please Enter 10 digit mobile number');
  return;
}

    this.global.showLoader();
   const formData = {"mobile_number":this.form.value.contctnmbr}
    console.log(this.form.value.contctnmbr);
    this.loginService.newuserByMobileNumber(formData).subscribe(res=>{
      // console.log(res);
      this.global.hideLoader();
      const newUserData = {mob_number:this.form.value.contctnmbr,otp:res.OTP};
      if(res.success){
     this.commonService.setStorage('newUserData',newUserData);
     this.router.navigateByUrl('/otpfield');
      }
     
    },err => {
      this.global.hideLoader();
      this.global.errorToast('Somthing went Error');
      this.error=err
      console.log(err);
    });
  }

}
