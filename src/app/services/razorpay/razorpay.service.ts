import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Checkout } from 'capacitor-razorpay';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page';
@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  // api ='https://api.razorpay.com/v1/orders';
  api1 ='https://wps-dev.com/dev2/grocery-api/shop/razorpay_payment';
  constructor(private http: HttpClient) { }

   // Authorization: `Basic ${currentUser.authdata}`


   createRazorPayOrderid(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.createRazorOrderId, data);
   }

  //  async createRazoerpayOrder(param){
  //   try {
  //     // const httpOptions = {
  //     //     headers: new HttpHeaders({
           
  //     //       'Authorization': 'Basic ' + btoa(environment.razorpay.key_id+":"+environment.razorpay.key_secret),
  //     //       'Access-Control-Allow-Origin': '*',
  //     //       "Access-Control-Allow-Methods", "*"
  //     //       'Content-Type':  'application/json',
          
  //     //     })
  //     //   };
  //     // const data = await this.http.post<any>(this.api, param, httpOptions).toPromise();
  //     const data = await this.http.post<any>(this.api1, param).toPromise();
  //     console.log('Basic Api hit data ', data.data);
  //     return data.data;
  //   } catch (e) {
  //     throw(e);
  //   }
  // }

  async payWithRazor(param) {
    try {
      const options = {
        key: environment.razorpay.key_id,
        amount: (param.amount).toString(),
        // image: 'https://wps-dev.com/beta/grocery/public/frontend/images/invoice-logo.png',
        image: 'https://rbsingh.s3.us-east-2.amazonaws.com/rbsinghImage/logo.jpg',
        description: 'Great offers',
        order_id: param.order_id,
        currency: 'INR',
        name: param.name, 
        prefill: { 
          email: param.email, 
          contact: param.phone,
        },
        theme: {
          color: '#087DC0'
        },
      };
      const data = await Checkout.open(options);
      console.log(data.response);
      // rsponse data come when payment done
    //   {
    //     "razorpay_payment_id": "pay_Mq4wGqlRDE8Ehy",
    //     "razorpay_order_id": "order_Mq4w92csfT5y1Y",
    //     "razorpay_signature": "f10d9867544921d3ad6a5e8a7c2e5cb5a808227138b1481686573414d4743768"
    // }
      return data.response;
    } catch (e) {
      throw e;  //if cancel by user then give error
    }
  }


}
