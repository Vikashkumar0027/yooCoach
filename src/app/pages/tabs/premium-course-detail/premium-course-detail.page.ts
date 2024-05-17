import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BuyRecommondedCourseService } from 'src/app/services/buyRecommendedCourse/buy-recommonded-course.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RazorpayService } from 'src/app/services/razorpay/razorpay.service';
import { RecommendedService } from 'src/app/services/recomended/recommended.service';
import { UserDetailService } from 'src/app/services/userDetail/user-detail.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-premium-course-detail',
  templateUrl: './premium-course-detail.page.html',
  styleUrls: ['./premium-course-detail.page.scss'],
})
export class PremiumCourseDetailPage implements OnInit,OnDestroy {

  userData: Subscription;
  userDetails:any;
recommendedCourseId:any;
  courseDetail:any;
  studentDetail:any;
  isfree:boolean= false;
  constructor(
    private recommendedService:RecommendedService,
    private route:ActivatedRoute,
    private global:GlobalService,
    private razorPayService:RazorpayService,
    private commonService:CommonService,
    private buyRecommendedService:BuyRecommondedCourseService,
    private userDetailService:UserDetailService,
    ) { }

 async ngOnInit() {
  const jwt:any = await this.commonService.jwtToken();
  console.log(jwt.payload.user);
  this.studentDetail =jwt.payload.user;
    this.recommendedCourseId = this.route.snapshot.paramMap.get('id');
    this.userDataSub();
    this.getrecommendedeList();

  }

  getrecommendedeList(){
    this.global.showLoader();
    this.recommendedService.recommendedCourseBig(this.recommendedCourseId).subscribe(res=> {
      console.log(res)
      this.global.hideLoader();
      if(res.success){
        this.courseDetail = res.list;
        this.filterFreeClass();
      }
    },err=> {
      this.global.hideLoader();
      console.log(err);
    });
  }

  
  filterFreeClass(){
    const data =  this.courseDetail.class_id.filter(x => x === this.studentDetail.class_id);
    console.log(data);
    (data.length >= 1) ? this.isfree = true : this.isfree = false;
  }

  buyAddCourse(){
    if(this.isfree){
      const data = { student_id: this.studentDetail._id, course_id: this.courseDetail._id, txn_id:"Its Free For this Class", amount: 0, status: "active" };
      this.buyVdo(data);
    }else {
      this.createOrderRazor();
    }
  }

  buyVdo(data:any){
this.buyRecommendedService.buyCourseAdd(data).subscribe(res=>{
console.log(res);
this.global.successToast(res.msg);
},err=>{
console.log(err);
this.global.errorToast('Something went wrong');
})
  }

  discountPrice:any;
  createOrderRazor(){
    this.global.showLoader();
 this.discountPrice =  (this.courseDetail.price - (this.courseDetail.price * this.courseDetail.discount / 100)).toFixed(2);
 console.log(this.discountPrice);
 
    const data = {"key_id":environment.razorpay.key_id,"key_secret":environment.razorpay.key_secret,"amount":Number(this.discountPrice)*100};
    this.razorPayService.createRazorPayOrderid(data).subscribe(res=>{
      console.log(res);
      this.openRazorpayDashBord(res.data);
    },err=>{
      console.log(err);
    })
  }

  userDataSub(){
    this.userData = this.userDetailService.cart.subscribe(res => {
     console.log('result of the res userData in app.ts',res)
     this.userDetails = res;
    })
 }

  async openRazorpayDashBord(data){
    this.global.hideLoader();
    const param = {
      name: 'YOO COACH',
      email: this.userDetails?.email,
      phone: Number(this.userDetails?.mobile_number),
      amount: data.amount,
      nameC: this.userDetails?.name,
      order_id: data.id,
    };
    const data1: any = await this.razorPayService.payWithRazor(param);
    this.global.hideLoader();
    console.log('data of cart page', data1);
     
    const formdata = { student_id: this.studentDetail._id, course_id: this.courseDetail._id, txn_id:data1.razorpay_payment_id, amount: this.discountPrice, status: "active" };
    this.buyVdo(formdata);
  }

  ngOnDestroy(){
    if(this.userData) this.userData.unsubscribe();
  }

}
