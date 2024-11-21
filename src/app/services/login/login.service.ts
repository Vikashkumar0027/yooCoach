import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // url= 'http://localhost:3000/api/otp'
  constructor(private http: HttpClient) {

   }
  //  signin(data: any): Observable<any>{
  //   return this.http.post<any>(this.url, data);
  //  }

   signin(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.otp, data);
   }
   adminLogin(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.adminLogin, data);
   }

   otpVerify(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.otpVerify, data);
   }

  //  login By Email
  loginByUser(data:any):Observable<any>{
    return this.http.post<any>(featureConfig.login, data);
  }


  unicCodeVerification(data:any):Observable<any>{
    return this.http.post<any>(featureConfig.unicCodeVerification, data);
  }

  signUp(data:any):Observable<any>{
    return this.http.post<any>(featureConfig.signup, data);
  }


    getClass(): Observable<any>{
    return this.http.get<any>(featureConfig.classlst);
   }

    getSession(): Observable<any>{
    return this.http.get<any>(featureConfig.session);
   }

    getBatch(): Observable<any>{
    return this.http.get<any>(featureConfig.batchTime);
   }

   checkMobileNumber(data:any):Observable<any>{
    return this.http.post<any>(featureConfig.checkNumber, data);
  }

  newuserByMobileNumber(data:any):Observable<any>{
    return this.http.post<any>(featureConfig.newUserMobileNumber, data);
  }

  mobileVerification(data:any):Observable<any>{
    return this.http.post<any>(featureConfig.MobileVerification, data);
  }

}
