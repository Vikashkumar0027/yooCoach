import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LiveclassService {
  private _liveMeeting = new BehaviorSubject<any>(null);
  private _agoraliveMeeting = new BehaviorSubject<any>(null);

  get agoraLiveMeet(){
    return this._agoraliveMeeting.asObservable();
  }

  get liveMeet(){
    return this._liveMeeting.asObservable();
  }
  
  constructor() { }

  async getUserData(val) {
    // if(val)
     this._liveMeeting.next(val);
    console.log('value of add',val);
    }

    async getAgoraUserData(val) {
      // if(val)
       this._agoraliveMeeting.next(val);
      console.log('value of add',val);
      }
}
