import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UserDetailService } from 'src/app/services/userDetail/user-detail.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
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

  ngOnInit() {}


  async adminOnSubmit(form: NgForm){

    // {"email":"admin@admin.com","password":"123456"}
    this.global.showLoader();
    const data = {email:form.value.email,password:form.value.password};
    console.log(data);
     
    this.loginService.adminLogin(data).subscribe(res=>{
      console.log(res)
      if(res.success){
        this.commonService.setStorage('admiTkns',res.token);
        this.authUid.getUid(res.token);
        this.router.navigateByUrl('/admin');
        // .then(() => {
        //   window.location.reload();
        //   });
        // this.router.navigate(['/','admin']);
      }
      this.global.hideLoader();
    },err=>{
      console.log(err);
      this.global.hideLoader();
      this.global.errorToast(err.error.errors[0].msg)
    })

    
  }
  changeType(){
    this.type = !this.type;
  }

}
