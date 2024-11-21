import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BuyRecommondedCourseService } from 'src/app/services/buyRecommendedCourse/buy-recommonded-course.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RazorpayService } from 'src/app/services/razorpay/razorpay.service';
import { RecommendedService } from 'src/app/services/recomended/recommended.service';
import { UserDetailService } from 'src/app/services/userDetail/user-detail.service';


import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recmnd-view-couse',
  templateUrl: './recmnd-view-couse.page.html',
  styleUrls: ['./recmnd-view-couse.page.scss'],
})
export class RecmndViewCousePage implements OnInit,OnDestroy {
  userData: Subscription;
  userDetails:any;
  recommendedCourse:any[]=[];
  jwt:any;
  constructor(
    private recommendedService:RecommendedService,
    private buyRecommendedService:BuyRecommondedCourseService,
    private razorPayService:RazorpayService,
    private commonService:CommonService,
    private router:Router,
    private global:GlobalService,
    private userDetailService:UserDetailService,
    private navCtrl: NavController
  ) { }

  async ngOnInit() {
    this.jwt = await this.commonService.jwtToken();
    this.userDataSub();
    this.getRecommendedCourse();
  }

  userDataSub(){
    this.userData = this.userDetailService.cart.subscribe(res => {
     console.log('result of the res userData in app.ts',res)
     this.userDetails = res;
    })
 }

  getRecommendedCourse(){
    this.global.showLoader();
    this.recommendedService.recommendedCourseSmall().subscribe(res=>{
      this.global.hideLoader();
      if(res.success){
        this.recommendedCourse=res.list;
      }
    },err=>{
      this.global.hideLoader();
      console.log(err)
    })
}

checkPrice(courseDetail){
  const data =  courseDetail.class_id.filter(x => x === this.jwt.payload.user.class_id);
  console.log(data);
  if(data.length >= 1) {
    return false;
  } else{
    return true;
  }
}

premiumCourse(list){
  this.router.navigate(['/','tabs','premium_course',list._id])
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
// @ViewChild('back') myButtonRef: ElementRef;
async openRazorpayDashBord(data, courseDetail){
  try {
    this.global.hideLoader();
    const param = {
      name: 'RB Singh',
      email: this.userDetails?.email,
      phone: Number(this.userDetails?.mobile_number),
      amount: data.amount,
      nameC: this.userDetails?.name,
      order_id: data.id,
    };
    const data1: any = await this.razorPayService.payWithRazor(param);
    this.global.hideLoader();
    console.log('data of cart page', data1);
     
    const formdata = { student_id: this.jwt.payload.user._id, course_id: courseDetail._id, txn_id:data1.razorpay_payment_id, amount: this.discountPrice, status: "active" };
    this.addCourse(formdata);
  } catch (error) {
    console.log(error);
    // this.navCtrl.back();
  }
 
}

addCourse(data){
  this.buyRecommendedService.buyCourseAdd(data).subscribe(res=>{
    console.log(res);
    this.global.successToast(res.msg);
    },err=>{
    console.log(err);
    this.global.errorToast('Something went wrong');
    })
}

fullDiscountVdo(param:any){
  console.log(this.jwt);
  const data = { student_id: this.jwt.payload.user._id, course_id: param._id, txn_id:"Its Free For Claa 10th", amount: 0, status: "active" };
this.addCourse(data);
}

ngOnDestroy(){
  if(this.userData) this.userData.unsubscribe();
}


}


// <button class="modal-close svelte-1sop3ts"> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.59 5.59a.833.833 0 0 0-1.18-1.18L10 8.823 5.59 4.41a.833.833 0 1 0-1.18 1.178L8.822 10l-4.41 4.41a.833.833 0 1 0 1.178 1.18L10 11.178l4.412 4.41a.833.833 0 1 0 1.178-1.178L11.18 10l4.41-4.412Z" fill="#FFFFFF"></path></svg></button>
// document.addEventListener('DOMContentLoaded', function () {
//   // Wait for the DOM to be fully loaded

//   // Find the close button element
//   const closeButton = document.querySelector('.modal-close');

//   // Add a click event listener to the close button
//   closeButton.addEventListener('click', function () {
//     // Your code to close the modal goes here
//     // For example, you might toggle a CSS class that hides the modal
//     // or use a library or framework-specific method for closing modals
//     console.log('Modal closed');
//   });
// });