import { Injectable } from '@angular/core';
import {HttpEvent,HttpHandler,HttpInterceptor,HttpRequest,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUidService } from './authUid/auth-uid.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

token:any;
  constructor(private authuidServie:AuthUidService,
    private router:Router) { 
    this.getToken();
  }

  getToken(){
this.authuidServie.uid.subscribe(res => {
  console.log('token found in interceptor',res);
  this.token = res;
});
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

          // .set('No-Auth', 'True')
          // .set('content-type', 'application/json')
    if(req.url) {
      if(req.url.indexOf('login_by_otp') >= 0 || req.url.indexOf('verify_otp') >=0 || req.url.indexOf('save') >=0
      || req.url.indexOf('password') >=0 || req.url.indexOf('classlist') >=0 || req.url.indexOf('sessionlist') >=0 || req.url.indexOf('batchlist') >=0 || req.url.indexOf('signin') >=0 || req.url.indexOf('verify') >=0 || req.url.indexOf('user') >=0){
        const cloned = req.clone({
          headers: req.headers
          // .set("content-type", "application/x-www-form-urlencoded; charset=utf-8")
          // .set("Accept","application/json, /")
          .set("cache-control","no-cache")
          .set("Access-Control-Allow-Origin","*")
          .set("Access-Control-Allow-Headers", "Origin, Content-Type,X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers")
          .set("Access-Control-Allow-Credentials","true")
          .set("Access-Control-Allow-Methods","GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT")
          .set('No-Auth', 'True')
          // .set('content-type', 'application/json')
        });
        return next.handle(cloned);
      } 
          
      else{

        if(this.token) {
          const cloned = req.clone({
            headers: req.headers
            // .set('Authorization', 'Bearer ' + this.token)
            .set('Bearer', this.token)
            // .set('content-type', 'application/json')
          });
          return next.handle(cloned);
        }else {
          this.router.navigateByUrl('/home');
        }
      }
    }

    // return next.handle(req);

  }
}
