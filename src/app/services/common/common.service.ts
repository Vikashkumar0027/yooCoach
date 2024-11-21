import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import jwt_decode from "jwt-decode";    //npm i jwt-decode
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private global: GlobalService,
    private router: Router) { }

    confirmExitExam(){
      this.global.showAlert(
        'Are You sure yoy Want to exit Exam?',
        'confirm',
        [{
          text: 'No',
          role: 'Cancel'
        },{
          text: 'Yes',
          handler: () => {
            // this.logout();
            this.router.navigate(['/tabs']);
          }
        }]
      );
    }

  setStorage(keyName, data) {
    Preferences.set({
      key: keyName,
      value: JSON.stringify(data)
    });
   }

  getStorage(data) {
    return Preferences.get({key: data});
   }

   async delete(data) {
    await Preferences.remove({ key: data });
   }
  //  return await
   async jwtToken(){
    const data = await this.getStorage('token');
      const tokens = JSON.parse(data.value);
      return jwt_decode(tokens);
   }
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXIiOnsiX2lkIjoiNjM3YjQ3ODBjOWY4ZmZhOTYwMDU4NjVkIiwibW9iaWxlX251bWJlciI6OTM0MTQ5NjE3NCwiYWRtaW5faWQiOiJYdGgifX0sImlhdCI6MTY3MDgzMDk4MCwiZXhwIjoxNjcwOTE3MzgwfQ.otUt1VeiyYoIJYPb5Gb8iEChZo8ibRYwQWAyPR17SUg"

  async tokenOutOfValid(data){
    console.log(data);
    if(data.error.msg== 'Token is not valid'){
      await Preferences.clear();
      this.global.errorToast(data.error.msg);
      this.router.navigateByUrl('/home');
    }
   }

  async loginToAnotherDevice(msg?){
      await Preferences.clear();
     (msg) ? this.global.errorToast(msg,5000) : this.global.errorToast('Already logged in on another device',5000);
      this.router.navigateByUrl('/home');
   }


}
