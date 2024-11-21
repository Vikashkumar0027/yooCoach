import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { BannerService } from 'src/app/services/banner/banner.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { NewsService } from 'src/app/services/news/news.service';
import { VdoplayercomponetComponent } from 'src/app/share-components/vdoplayercomponet/vdoplayercomponet.component';
import { environment } from 'src/environments/environment';
// import { StreamingMedia, StreamingVideoOptions } from '@awesome-cordova-plugins/streaming-media/ngx';
import { VdobannerService } from 'src/app/services/vdobanner/vdobanner.service';
import { SubjectDetailService } from 'src/app/services/subjectDetail/subject-detail.service';
import { UserDetailService } from 'src/app/services/userDetail/user-detail.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat/chat.service';
import { LiveclassService } from 'src/app/services/liveclass/liveclass.service';
import { TokencheckerService } from 'src/app/services/tokenChecker/tokenchecker.service';
import { SessionService } from 'src/app/services/session/session.service';
import { LoginService } from 'src/app/services/login/login.service';
import { RecommendedService } from 'src/app/services/recomended/recommended.service';
import { BuyRecommondedCourseService } from 'src/app/services/buyRecommendedCourse/buy-recommonded-course.service';
import { RazorpayService } from 'src/app/services/razorpay/razorpay.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  liveClassSub: Subscription;
  isudate: boolean = false;
  public folder: string;
  isLoadingLoader: boolean;
  liveVideo = false;
  livevdoData: any;
  error: any;
  image: any;
  liveClass: boolean;
  internet: boolean;
  news: any[] = [];
  bannerImage: any[] = [];
  batchList:any[]=[];
  // public form = [
  //   { val: 'Physics',img:'assets/img/icon3.png', isChecked: false },
  //   { val: 'Chemistry',img:'assets/img/icon4.png', isChecked: false },
  //   { val: 'Biology',img:'assets/img/icon5.png', isChecked: false },
  //   { val: 'English',img:'assets/img/icon6.png', isChecked: false },
  //   { val: 'Hindi',img:'assets/img/icon7.png', isChecked: false },
  //   { val: 'Math',img:'assets/img/icon2.png', isChecked: false },
  // ];

  form: any[] = [];
  recommendedCourse: any[] = [];
  freeAccess:boolean = false;
  jwt:any;
  isPremiumCourse:boolean = false;
  // npm i ionic-marquee   npm uninstall ionic-marquee --save

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private global: GlobalService,
    private newService: NewsService,
    private commonService: CommonService,
    private authToken: AuthUidService,
    private bannerService: BannerService,
    // private streamingMedia: StreamingMedia,
    private chatService: ChatService,
    private subjectService: SubjectDetailService,
    private userdataService: UserDetailService,
    private notificationService: NotificationService,
    private liveclassService: LiveclassService,
    private tokenCheckerService: TokencheckerService,
    private sessionService: SessionService,
    private loginService:LoginService,
    private recommendedService:RecommendedService,
    private buyRecommendedService:BuyRecommondedCourseService,
    private razorPayService:RazorpayService
  ) {}

  async ngOnInit() {
    this.jwt = await this.commonService.jwtToken();
    this.global.showLoader();
    this.internet = true;
    const tokenDAta = await this.commonService.getStorage('token');
    const tokens = JSON.parse(tokenDAta.value);
    this.authToken.getUid(tokens);
    this.getItemHttp();
    this.liveVideoUpdate();
    this.internetStaus();

    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    // alert(this.folder);
    if (this.folder == 'liveClasses') {
      this.liveClass = true;
    }
    this.global.customeStatusBar(true);
  }

  refressDashBoard(){
    this.ngOnInit();
         location.reload();
  }

  preCourseLists:any[]=[];
  premiumCourseList(){
    // this.global.showLoader();
      this.buyRecommendedService.recommondedCourselisting().subscribe(res=>{
   
        if(res.success){
          this.preCourseLists = res.list;
          (this.preCourseLists.length >= 1) ?  this.isPremiumCourse = false :  this.isPremiumCourse = true;
          // this.premiumCourseAvilable()
        }
      },err=>{
        console.log(err);
      });
  }

  sessionCheck(){
    this.sessionService.checkSession().subscribe(res=>{
      console.log(res);
      if(res.msg == 'Session Is Inactive'){
         this.commonService.loginToAnotherDevice(res.msg);
      }
    });
  }

  agoraLiveData:any[]=[];
  isagora:boolean = false;
 async agoraMeetingListing(){
  const data1 = this.jwt.payload.user.class_id;
  this.freeAccess = this.jwt.payload.user?.freeAccess;
  this.chatService.agoraLiveClass().subscribe(
    (res) => {
      console.log(res);
      const fiterByclass = res.data.filter((x) => x.class_id == data1);
      
      if (res.success == true && fiterByclass.length > 0) {
        this.agoraLiveData = res.data;
        this.isagora =true
        this.liveclassService.getAgoraUserData(fiterByclass);
      } else {
        this.isagora =false;
        this.liveclassService.getAgoraUserData(null);
      }
    },
    (err) => {
      console.log(err);
      this.global.errorToast('Somthing Error in Zoom metting Api');
      this.isagora =false;
    }
  );
  }

  async zoomMeetingListing() {
   
    const data1 = this.jwt.payload.user.class_id;
    this.freeAccess = this.jwt.payload.user?.freeAccess;
    this.chatService.liveClass().subscribe(
      (res) => {
        console.log(res);
        const fiterByclass = res.data.filter((x) => x.class_id == data1);
        // this.globalService.hideLoader();
        if (res.success == true && fiterByclass.length > 0) {
          // this.vdoListing = fiterByclass;
          this.liveclassService.getUserData(fiterByclass);
        } else {
          this.liveclassService.getUserData(null);
        }
      },
      (err) => {
        console.log(err);
        this.global.errorToast('Somthing Error in Zoom metting Api');
      }
    );
  }
  
  liveVideoUpdate() {
    this.liveClassSub = this.liveclassService.liveMeet.subscribe((res) => {
      if(res?.length >= 1) {
        const time = this.timeFuction(res[0].time);
        this.liveVideo = true;
        this.livevdoData = res[0];
        this.livevdoData = {...this.livevdoData , time: time};

      } else {
        this.liveVideo = false;
        this.livevdoData = {};
      }
    });
  }

  async getSubject() {
    const jwt: any = await this.commonService.jwtToken();
    const data = jwt.payload.user.class_id;
    this.checkOneMobileDeviceLogin(jwt);
    this.sessionCheck();

    this.subjectService.getSubject(data).subscribe(
      (res) => {
        // console.log('subject data image',res);
        if (res.success == true) {
          // this.form = res.data;
          this.filterSUbject(res.data)
        }
      },
      (err) => {
        this.commonService.tokenOutOfValid(err);
        // this.global.errorToast(err.error.msg);
      }
    );
  }

  filterSUbject(subject){
    // this.image.package
    if(this.image.package === 'all'){
      this.form = subject;
    }else if(this.image.package === 'math+science'){
 const subjectData = subject.filter(x=> x.name == "Math" || x.name == "Science");
 this.form = subjectData;
    }else if(this.image.package === 'arts'){
      const subjectData = subject.filter(x=> x.name == "Arts" || x.name == "Hindi" || x.name == "English");
      this.form = subjectData;
    }else if(this.image.package === 'commerce'){
      const subjectData = subject.filter(x=> x.name == "Commerce" || x.name == "Hindi" || x.name == "English");
      this.form = subjectData;
    }else if(this.image.package === 'pcm'){
      const subjectData = subject.filter(x=> x.name !== "Arts" && x.name !== "Commerce" && x.name !== "Biology");
      this.form = subjectData;
    }else if(this.image.package === 'pcm+bio'){
      const subjectData = subject.filter(x=> x.name !== "Arts" && x.name !== "Commerce");
      this.form = subjectData;
    }
   

  }


// ites, work only one device login permission, last Token  and cureent token matched
  async checkOneMobileDeviceLogin(data: any) {
    console.log(data.payload.user._id);
    const tokenStrng = await this.commonService.getStorage('token');
    const token = JSON.parse(tokenStrng.value);
    console.log(token);
    this.tokenCheckerService.checkToken(data.payload.user._id).subscribe(async res=>{
      console.log(res);
      if(res.data.token == token) {
        return;
      }else{
        this.commonService.loginToAnotherDevice();
      }
    },
    (err)=>{
console.log(err);
    })
  }

  async getItemHttp() {
    try {
      this.isLoadingLoader = true;
      this.batchListing();
      this.profileApi();
      this.zoomMeetingListing();
      this.agoraMeetingListing();
      this.premiumCourseList();

      await this.getBanner();
      await this.getNews();
      //  this.profileApi();
      this.getSubject();
      this.getRecommendedCourse();
      this.global.hideLoader();
    } catch (err) {
      // console.log(error);
      this.isLoadingLoader = false;
      this.commonService.tokenOutOfValid(err);
      // this.global.errorToast('error in Api');
      this.global.hideLoader();
    }
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

  timeFuction(timeString?){
    // const data = timeString;
    // return data;
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }

  

  batchName(id){
    const batch = this.batchList.filter(x => x._id == id);
    return batch[0]?.batch_time;
  }

  ionViewDidEnter() {
    if (this.isudate == false) {
      this.profileApi();
      this.isudate = true;
      return;
    } else {
      this.profileApi();
      this.getBanner();
      this.getNews();
      this.getSubject();
      this.zoomMeetingListing();
      this.agoraMeetingListing();
    }
  }

  async profileApi() {
    const jwtToken: any = await this.commonService.jwtToken();
    // console.log('Token ID Get',jwtToken.payload.user._id);
    // this.bannerService.getImage(jwtToken.payload.user._id).subscribe(
    this.bannerService.getImage().subscribe(
      (res) => {
        console.log('getProfile', res);
        if (res.success == true) {
          this.image = res.data;
          this.userdataService.getUserData(res?.data);
        }
      },
      (err) => {
        // this.global.errorToast('profile api error');
        this.error = err;
      }
    );
  }

  async getBanner() {

    console.log(this.jwt);
    this.bannerService.getBanner().subscribe((res) => {
      // console.log('resut of the banner api',res);
      if (res.success == true) {
        this.bannerImage = res.data;
        this.isLoadingLoader = false;
  
        const usersBanner = this.bannerImage.filter(x => x.type == 'user' || x.type == 'both');
        const freeUserBanner = this.bannerImage.filter(x => x.type == 'freeUser' || x.type == 'both');
      (this.jwt.payload.user.freeAccess) ? 
      this.bannerImage = freeUserBanner : this.bannerImage = usersBanner;
     
    }
    });
  }

  async getNews() {
    this.newService.getNews().subscribe((res) => {
      // console.log('News data',res);
      if (res.success == true) {
        this.news = res.data;
      }
    });
  }

  async internetStaus() {
    const data = await this.global.getnetworkStatus();
    //  console.log('data of enternet connection', data);
    if (data == false) {
      this.internet = false;
      this.isLoadingLoader = false;
      // alert( this.internet);
    }
  }

  subjectPdfCource(data) {
    // this.internetStaus();
    // alert(data);
    this.router.navigate(['/', 'tabs', 'courses', data]);
  }

  tryNet() {
    this.ngOnInit();
  }

  async notification(counter) {
    const jwtToken: any = await this.commonService.jwtToken();
    console.log('counter', jwtToken.payload.user._id);
    const data = { student_id: jwtToken.payload.user._id };
    if (!counter) {
      console.log(counter);
    } else {
      this.notificationService.seenNotification(data).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    this.router.navigate(['/', 'tabs', 'notification']);
  }
  // landscape
  async vdoOpen(id) {
    try {
      // console.log(id);
      const options = {
        component: VdoplayercomponetComponent,
        cssClass: 'my-custom-class',
        handle: false,
        componentProps: {
          //  from: 'home'
          videoId: id,
        },
      };
      const modal = await this.global.createModal(options);
    } catch (error) {}
  }

  async zoom() {
    // const options = {
    //       component: ZoomComponent,
    //       cssClass: 'myZoom',
    //       handle: false,
    //       componentProps: {
    //         //  from: 'home'
    //         // videoId:id
    //        }
    //     };
    //   const modal = await this.global.createModal(options);
  }

  premiumCourse(list){
    this.router.navigate(['/','tabs','premium_course',list._id])
  }

  // recomendace course

  getRecommendedCourse(){
      this.recommendedService.recommendedCourseSmall().subscribe(res=>{
        console.log(res)
        if(res.success){
          this.recommendedCourse=res.list;
        }
      },err=>{
        console.log(err)
      })
  }

  // filterFreeClass(){
  //   const data =  this.courseDetail.class_id.filter(x => x === this.studentDetail.class_id);
  //   console.log(data);
  //   (data.length >= 1) ? this.isfree = true : this.isfree = false;
  // }

  checkPrice(courseDetail){
    const data =  courseDetail.class_id.filter(x => x === this.jwt.payload.user.class_id);
    console.log(data);
    if(data.length >= 1) {
      return false;
    } else{
      return true;
    }
  }

  fullDiscountVdo(param:any){
    console.log(this.jwt);
    const data = { student_id: this.jwt.payload.user._id, course_id: param._id, txn_id:"Its Free For Claa 10th", amount: 0, status: "active" };
this.addCourse(data);
  }

  addCourse(data){
    this.buyRecommendedService.buyCourseAdd(data).subscribe(res=>{
      console.log(res);
      this.global.successToast(res.msg);
      this.premiumCourseList();
      },err=>{
      console.log(err);
      this.global.errorToast('Something went wrong');
      })
  }

     buyVdo(param:any){
      // console.log(param);
      this.createOrderRazor(param);
    }

    // buyvdo1(param:any){
    //   console.log(param);
    // }

    discountPrice:any;
    createOrderRazor(courseDetail){ 
      this.global.showLoader();
   this.discountPrice =  (courseDetail.price - (courseDetail.price * courseDetail.discount / 100)).toFixed(2);
   console.log(this.discountPrice);
  
      const data = {"key_id":environment.razorpay.key_id,"key_secret":environment.razorpay.key_secret,"amount":Number(this.discountPrice)*100};
      this.razorPayService.createRazorPayOrderid(data).subscribe(res=>{
        console.log(res);
        this.openRazorpayDashBord(res.data, courseDetail);
      },err=>{
        console.log(err);
      })
    }

    async openRazorpayDashBord(data, courseDetail){
      this.global.hideLoader();
      console.log(this.image);
      const param = {
        name: 'RB Singh',
        email: this.image?.email,
        phone: Number(this.image?.mobile_number),
        amount: data.amount,
        nameC: this.image?.name,
        order_id: data.id,
      };
      const data1: any = await this.razorPayService.payWithRazor(param);
      this.global.hideLoader();
      console.log('data of cart page', data1);
       
      const formdata = { student_id: this.jwt.payload.user._id, course_id: courseDetail._id, txn_id:data1.razorpay_payment_id, amount: this.discountPrice, status: "active" };
      this.addCourse(formdata);
    }

    // premiumCourseAvilable(data){
    //      this.isPremiumCourse = data;
    // }

  ngOnDestroy(): void {
    this.global.customeStatusBar();
    if (this.liveClassSub) this.liveClassSub.unsubscribe();
  }
}
