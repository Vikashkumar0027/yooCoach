import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUidService } from '../provider/authUid/auth-uid.service';
import { CommonService } from '../services/common/common.service';
import { GlobalService } from '../services/global/global.service';
import { LoginService } from '../services/login/login.service';
import { UserDetailService } from '../services/userDetail/user-detail.service';

@Component({
  selector: 'app-otpfield',
  templateUrl: './otpfield.page.html',
  styleUrls: ['./otpfield.page.scss'],
})
export class OtpfieldPage implements OnInit {
  @ViewChild('ngOtpInput') ngOtpInput:any;
  otp:any;
  button:boolean = true;
  // mobileNumber:any;
  // otpdata:any;
  loginData:any
  constructor(private router:Router,
    private loginService:LoginService,
    private global: GlobalService,
    private commonService: CommonService,
    private authUid:AuthUidService,
    private userdataService:UserDetailService ) { }

 async ngOnInit() {
    const getLogindata: any = await this.commonService.getStorage('newUserData');
    this.loginData = await JSON.parse(getLogindata.value);
    // this.otpCode();
  }
  configOtp = {
    length : 6,
    allowNumbersOnly : true,
    inputStyles : {
      'width' : '40px',
      'height' : '40px',
      // 'background' : '#FFF0DC',
      'border' : '1px solid #EED4B2',
      'border-radius' : '10px',
      'font-family' :' monospace',
      'font-weight': '700',
      // 'color' : '#654B28',
      'color' : 'black',
      'font-size' : '29px',
      'margin' : '10px 8px',
    }
  }

  // async otpCode(){
  //   const getLogin: any = await this.commonService.getStorage('otpCode');
  //   this.otpdata = await JSON.parse(getLogin.value);
  // }
  
  onOtpChange(otp: any){
    this.button = true;
    console.log("change in many ",otp);
    if (otp.length === 6) {
      this.otp =otp;
      this.button = false;
    }
  }

  submit(){
    // this.global.showLoader();
    console.log("otp data ",this.otp);
    // this.router.navigateByUrl('/subject-detais');
// const data = { mobile_number:Number(this.loginData.mob_number) , otp: this.otp.toString()};
const formData = {"mobile_number":this.loginData.mob_number ,"otp":this.otp.toString()};

console.log(formData)



    this.loginService.mobileVerification(formData).subscribe(res => {
      this.userdataService.getUserData(res);
      console.log(res);
      if(res.success == true){
        this.commonService.setStorage('token',res.token);
        this.authUid.getUid(res.token);
        // this.router.navigateByUrl('/subject-detais'); i have to hide subject detail and personal detail in RBsingh

        this.router.navigateByUrl('/tabs');
        this.global.hideLoader();
      }else{
     this.global.errorToast('Something went Wrong');
     this.global.hideLoader();
      }
    },
    (err) => {
       this.commonService.tokenOutOfValid(err);
      console.log('Error msg', err);
      // alert(err.error.message);
      this.global.errorToast(err.error.msg);
      this.global.hideLoader();
    }
    )
      }

}
