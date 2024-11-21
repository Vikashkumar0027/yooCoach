import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UserDetailService } from 'src/app/services/userDetail/user-detail.service';

@Component({
  selector: 'app-loginwith-password',
  templateUrl: './loginwith-password.component.html',
  styleUrls: ['./loginwith-password.component.scss'],
})
export class LoginwithPasswordComponent implements OnInit {

  isLogin = false;
  type: boolean=true;
    constructor(
                private router: Router,
                private global: GlobalService,
                private loginService: LoginService,
                private commonService: CommonService,
                private authUid:AuthUidService,
                private userdataService:UserDetailService ) { }
  
    ngOnInit() {
      // this.isLoggedIn();
    }
    
    // when i Created auto login guard then it  became unneccessary
  
    // async isLoggedIn(){
    //   try {
    //     this.global.showLoader();
    //     const val = await this.authService.getId();
    //     console.log(val);
    //     if(val) this.navigate();
    //     this.global.hideLoader();
    //   } catch(e){
    //     console.log(e);
    //     this.global.hideLoader();
    //   }
    // }
    changeType(){
      this.type = !this.type;
    }
  
      onSubmit(form: NgForm){
        this.global.showLoader();
        console.log(form);
        // alert('working')
        if(!form.valid) return;
        // this.login(form);
        console.log('form data',form.value)
        const data = {"email":"vikash123@gmail.com","password":"123456"}
        this.loginService.loginByUser(data).subscribe(res=> {
          this.userdataService.getUserData(res); //its only for menbar true false
          console.log('login data res',res);
          if(res.success == true){
            this.commonService.setStorage('token',res.token);
            this.authUid.getUid(res.token);
            this.router.navigateByUrl('/tabs');
            this.global.hideLoader();
          }
        })


      }
      
  

      navigate(data?) {
        // let url = '/tabs';
        // let url = Strings.TABS;
        // if(data == 'admin') url = Strings.ADMIN;
        // this.router.navigateByUrl(url);
      }
  
  }
  