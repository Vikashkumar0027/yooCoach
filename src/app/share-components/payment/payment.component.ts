import { Component, OnInit } from '@angular/core';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
paymentList:any[]=[];
totalFee:any;
isImpty:boolean = false;
model: any ={
  title: 'No Data Available',
  icon: 'alert-circle-outline',
  color: 'danger'
};
  constructor(private paymentService:PaymentService,
    private commonService:CommonService,
    private authToken:AuthUidService,
    private global:GlobalService
    ) { }

  async ngOnInit() {
    const token = await this.commonService.getStorage('token');
    const tokens = JSON.parse(token.value);
    this.authToken.getUid(tokens);
    this.getPaymentList();
    this.classFee();
  }

  async getPaymentList(){
    this.global.showLoader();
    const jwtToken:any = await this.commonService.jwtToken();
    // console.log('Token ID Get',jwtToken.payload.user._id);
    // const data ={"payment_id":jwtToken.payload.user._id}
this.paymentService.getPayment(jwtToken.payload.user._id).subscribe(res=>{
  console.log('result of payment api',res);
  if(res.success == true){
    res.data.length== 0 ? this.isImpty=true : this.isImpty=false;
    this.paymentList=res.data
    this.global.hideLoader();
  }
},
(err)=>{
  this.global.hideLoader();
  this.global.errorToast('Somthing Error', 2000);
})
  }

  classFee(){
    this.paymentService.totalPayment().subscribe(res => {
      console.log(res);
      if(res.success){
        this.totalFee = res.data.fees;
      }
    })
  }

}
