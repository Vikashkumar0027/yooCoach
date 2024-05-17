import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  private _user = new BehaviorSubject<any>(null);

  get cart(){
    return this._user.asObservable();
  }
  constructor() { }

  async getUserData(val) {
  //  console.log('user detail data',val)
     this._user.next(val);
  }

}
