import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from 'src/app/services/common/common.service';
@Injectable({
  providedIn: 'root'
})
export class AuthUidService {

  private _uid = new BehaviorSubject<any>(null);
  
  get uid(){
    return this._uid.asObservable();
  }
  constructor(private commonService:CommonService) { }

  getUid(uid){
    try {
      console.log('T0kent get in authUid',uid);
      this._uid.next(uid);
    } catch(e){
      console.log(e);
      throw(e);
    }
  }
}
