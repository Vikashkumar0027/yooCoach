import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AlertController, isPlatform, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Network,ConnectionStatus } from '@capacitor/network';

// @capacitor/network@4.0.1
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  isLoading: boolean =false;
  status:boolean;
  constructor(  
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,) { }


  async createModal(options){
    const modal = await this.modalCtrl.create(options);
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if(data) return data;
  }

//  create modal dismiss
  modalDismiss(val?) {
     let data: any = val ? val: null;
     this.modalCtrl.dismiss(data);
  }

  //  Alert massage
 showAlert(message: string, header?, buttonArray?, inputs?){
  this.alertCtrl.create({
    header: header ? header: 'Authentication failed',
    message: message,
    inputs: inputs ? inputs: [],
    buttons: buttonArray ? buttonArray: ['okay']
  })
  .then(alertEl => alertEl.present());
}

  checkPlateFormWeb(){
    if(Capacitor.getPlatform() == 'web') return true;
    return false;
  }

  async customeStatusBar(primaryColor?:boolean){
    // this.checkStatusBarStyle();
      if(!this.checkPlateFormWeb()){
        await StatusBar.setStyle({style: primaryColor ? Style.Dark: Style.Default});
        if(isPlatform('android') && primaryColor) await StatusBar.setBackgroundColor({color: primaryColor ? '#2f5597' : '#ffffff'});
      }
  }

  // de0f17

  async checkStatusBarStyle(){
       const info = await StatusBar.getInfo();
      //  return info.style == 'DARK' ? ''
      console.log(info.color);
  }
  setLoder() {
    this.isLoading = !this.isLoading;
  }
  // show loader wait
  showLoader(msg?, spinner?){
    // this.isLoading = true;
    if(!this.isLoading) this.setLoder();
  return this.loadingCtrl.create({
      message: msg,
      spinner: spinner ? spinner: 'bubbles',
      cssClass: 'my-loader-class',
      // showBackdrop: true,
      // translucent: false,
      // mode: 'md',
    }).then(res => {
      res.present().then(() => {
        if(!this.isLoading) {
          res.dismiss().then(() => {
            console.log('abort presenting');
          });
        }
      });
    })
    .catch(e => {
      console.log('show Loading error:',e);
    });
  }


  // hide loder
  hideLoader(){
    // this.isLoading=false;
    if(this.isLoading) this.setLoder();
    return this.loadingCtrl.dismiss()
    .then(() => console.log('dismissed'))
    .catch(e => console.log('error hide loader: ',e));
  }

  successToast(msg) {
    this.showToast(msg, 'success', 'top');
  }

  //  show toast
  async showToast(msg, color, position, duration = 3000) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration,
      color: color,
      position: position
    });
    toast.present();
  }
  //  error massage
  errorToast(msg?, duration=2000){
    this.showToast(
      msg ? msg : 'No Internet Connection','danger','top',duration);
      this.hideLoader(); //ye home page me loder ko hide kar deta hai agar wo show loder ho raha hoga to
  }

  async getnetworkStatus(){
    await Network.getStatus().then(
       (status:ConnectionStatus)=>{
         // const statuse = (status.connected)? "connected": "disconnected";
         // console.log('staus ', statuse);
         this.status = status.connected;
         if(status.connected == false){
           this.errorToast('Internet Disconnected');
         
         }
         // const connectionType = status.connectionType;
         // console.log('this..connectiontype',connectionType);
       }
     );
     return this.status;
   }

}
