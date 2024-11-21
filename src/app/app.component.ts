import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { GlobalService } from './services/global/global.service';
import { UserDetailService } from './services/userDetail/user-detail.service';
import { Subscription } from 'rxjs';
import { CommonService } from './services/common/common.service';
import {SplashScreen} from '@capacitor/splash-screen';
import { Preferences } from '@capacitor/preferences';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  public appPages = [
    { title: 'Home', url: '/tabs', icon: 'home' },
    { title: 'My Courses', url: '/tabs/courses', icon: 'caret-forward-circle' },
    { title: 'Live Classes', url: '/tabs/dashboard/liveClasses', icon: 'videocam' },
    { title: 'Live Chat with Teacher', url: '/tabs/chat', icon: 'chatbubbles' },
    { title: 'Notification', url: '/tabs/notification', icon: 'notifications' },
    { title: 'Account', url: '/tabs/account', icon: 'reader' },
    { title: 'Sample Paper', url: '/tabs/samplePaper', icon: 'reader' },
    { title: 'Recommended Course', url: '/tabs/recommended-course-list', icon: 'caret-forward-circle' },
    { title: 'Contact Us', url: '/tabs/contactus', icon: 'call' },
    // { title: 'LogOut', url: '/tabs/contactus', icon: 'call' },
    // { title: 'Support', url: '/tabs/dashboard/support', icon: 'settings' },
  ];
  userData: Subscription;
  userDetails:any;
  menu:boolean=true;


  constructor(
    private plateform: Platform,
    private router:Router,
    private navCtrl: NavController,
    private alertController: AlertController,
    private global: GlobalService,
    private userDetailService:UserDetailService,
    private commonService:CommonService
  ) {
    this.intializeApp();
    this.userDataSub();
  }

  intializeApp(){
    this.plateform.ready().then(async() =>{

      // await SplashScreen.show({
      //   showDuration: 2000,
      //   autoHide: true,
      // });
      setTimeout(()=>{
        SplashScreen.hide({
          fadeOutDuration: 1000
        });
      }, 2000)
      
      this.global.customeStatusBar();
      this.backButtonEvent();
    })
    
  }



  // When i Back throuh mobile back botton then work
  backButtonEvent(){
    this.plateform.backButton.subscribeWithPriority(10, () =>{
      if(this.router.url === "/tabs" || this.router.url === "/tabs/dashboard" || this.router.url === "/home" || this.router.url === "/admin" ){
        this.backButtonAlert();
        this.global.hideLoader();
      }else if(this.router.url === "/tabs/dashboard/liveClasses"){
        document.getElementById('zmmtg-root').style.display = 'none';
        SplashScreen.hide();
      
      }else if(this.router.url === "/tabs/test"){
        this.router.navigate(['/tabs/dashboard']);
        // '/', 'tabs', 'quizelist','quiz-questions'], navData
        const navData: any= {};
      } else if(this.router.url.slice(0,30) == "/tabs/quizelist/quiz-questions"){
        this.commonService.confirmExitExam();
      }else{
        this.navCtrl.back();
        this.global.hideLoader();
      }
    });
      }

      async backButtonAlert(){
        const alert = await this.alertController.create({
          message: 'Are you sure you want to exit',
          cssClass: 'exitApp',
          buttons: [{
            text: 'cancel',
            role: 'cancel',
           
          },
          {
            text:'Close App',
            handler: () =>{
              navigator['app'].exitApp();
            }
          }
        ]
        });
        await alert.present();
      }

      userDataSub(){
         this.userData = this.userDetailService.cart.subscribe(res => {
          console.log('result of the res userData in app.ts',res)
          this.userDetails = res;
          this.menu=false;
         })
      }

      confirmLogout(){
        this.global.showAlert(
          'Are You sure yoy Want to logout?',
          'confirm',
          [{
            text: 'No',
            role: 'Cancel'
          },{
            text: 'Yes',
            handler: () => {
              this.logOut();
            }
          }]
        );
      }

      logOut(){
        this.userDetailService.getUserData('');
        this.menu=true;
        this.global.showLoader();
        this.global.successToast('logOut SuccessFully');
                  Preferences.clear();
                  this.router.navigate(['/home'])
                   .then(() => {
                    window.location.reload();
                    });
                    this.global.hideLoader();
      }

  

      ngOnDestroy(){
        if(this.userData) this.userData.unsubscribe();
      }

}
