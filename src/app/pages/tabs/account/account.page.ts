import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { PersonaldetailService } from 'src/app/services/personaldetail/personaldetail.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {
  // ediData:any;
  imageSrc:any;
accoutCategory:any;
apidata:any;
date:any
isFreeUser:boolean = false;
header:any[] =[{_id:1,name:'Profile'},{_id:2,name:'Payment'},{_id:3,name:'Attendance'},{_id:5,name:'Quiz'}];
// {_id:3,name:'Attendance'},{_id:4,name:'Purchase'},
@ViewChild('f1') fillForm: NgForm;
  constructor(private router: Router, private personalDetailS:PersonaldetailService,
    private global: GlobalService,
    private commonService: CommonService,
    private authToken: AuthUidService,
    private profile: ProfileService,
    private sessionService:SessionService,
    ) { }

  async ngOnInit() {
    
    const token = await this.commonService.getStorage('token');
    const tokens = JSON.parse(token.value);
    this.authToken.getUid(tokens);
    // this.global.showLoader();
   this.getData();
  
   this.global.hideLoader();
  }

  // ionViewWillEnter(){
  //   this.getData();
  // }
  isErrorImg:boolean=false;
  onImageError(){
    // this.global.successToast('Please uploade')
    this.isErrorImg = true;
  }

  ionViewDidEnter(){
    this.global.customeStatusBar(true); 
      this.sessionCheck()
          }

    sessionCheck(){
            this.sessionService.checkSession().subscribe(res=>{
              console.log(res);
              if(res.msg == 'Session Is Inactive'){
                 this.commonService.loginToAnotherDevice(res.msg);
              }
            });
          }
         
isFreeAccess:boolean = false;
  async getData(){
    this.global.showLoader();
    const jwt:any = await this.commonService.jwtToken();


    const data1 = {_id: jwt.payload.user._id };
   const freeAccess = jwt.payload.user.freeAccess;
   if(freeAccess) {
    this.isFreeAccess= true;
    this.getfreeUserDetail();
   }else{
    this.isFreeAccess= false;
    this.oldUser(data1);
   }  
   
  }

  oldUser(data1){
    this.profile.getdata(data1).subscribe(res=> {
      // const datws =  res.stu.added_at.slice(0, 10);
      // console.log(datws);
        console.log('get all data',res);
        if(res.success == true){
          this.apidata=res.stu;
          this.fillForm.form.patchValue({
            name:res.stu.name,
            address:res.stu?.email,
            parentCtrl:res.stu?.father_name,
            phone:res.stu?.mobile_number,
            rollCtrl:res.stu?.reg_no,
            classCtrl:res.stu?.admin_id,
            batchCtrl:res.stu?.batch_time,
            dateCtrl:res.stu.added_at.slice(0, 10),
            imageCtrl:res.stu?.student_photo,
          });
         setTimeout(() => {
          this.global.hideLoader();
          // this.fillForm.form.patchValue({dateCtrl: new Date().toLocaleString()});
         });
        }else{
          this.global.hideLoader();
        }
        
      },
      (err)=>{
        console.log('getApi Error',err);
        this.global.hideLoader();
      })
  }
freeUserDetail:any;
  getfreeUserDetail(){
    this.profile.getfreeUserDetail().subscribe(res=>{
      console.log(res);
      if(res.success){
        this.freeUserDetail = res.data;
        this.fillForm.form.patchValue({
          name:res.data.name,
          address:res.data?.email,
          phone:res.data?.mobile_number,
        });
      }
    },err=>{
      console.log(err);
    })
  }

  bannerData(e){
    console.log('accot page get data',e);
    this.accoutCategory = e;
    if(e==1){
      this.getData();
      this.global.hideLoader();
    }
  }

  // private file: File;
  // onFileChange(fileChangeEvent) {
  //   this.file = fileChangeEvent.target.files[0];
  // }

  private file: File;
  onFileChange(e) {
    const reader = new FileReader();
    if(e.target.files && e.target.files.length) {

      const imgfile = e.target.files[0];
      reader.readAsDataURL(imgfile);
      reader.onload = async () => {
        await this.resizeImage(reader.result as string).then((resolve: any) => {
          this.imageSrc = resolve;
          // this.file = resolve;

          this.dataURLtoFile(resolve,imgfile);

        });
      };
    }
  }

  dataURLtoFile(dataurl,imageFile){
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    this.file = new File([u8arr], imageFile.name, {type: 'image/jpeg'});
    console.log(this.file);
  }

  resizeImage(imageURL: any): Promise<any> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 250;
        const ctx = canvas.getContext('2d');
        if (ctx != null) {
          ctx.drawImage(image, 0, 0, 200, 250);
        }
        var data = canvas.toDataURL('image/jpeg', 1);
        resolve(data);
      };
      image.src = imageURL;
    });
  }

  async onSubmit(data){
    console.log(data.value);
//     if(!data.valid){
// this.global.errorToast('Please fill empty field');
// return;
//     }

   this.isFreeAccess ? this.updateFreeUser(data) :  this.updateOldUser(data);
  
      }

      async updateOldUser(data){
        this.global.showLoader();
        const jwtToken:any = await this.commonService.jwtToken();
        console.log('Token ID Get',jwtToken.payload.user._id);
    
        console.log("all form data", data.value);
        const datas ={ student_name:data.value.name,
          student_email:data.value.address, 
          father_name:data.value.parentCtrl,
           roll_no: data.value.rollCtrl, 
           date_of_admission:data.value.dateCtrl, 
           _id:jwtToken.payload.user._id
           // contact_no:data.value.phone,
       };
       console.log('All data Get',datas);
    //  , this.file.name
    
      if(this.file == undefined){
        this.withoutphot(datas);
      }else{
        this.withphoto(datas);
      }
      }


      updateFreeUser(data){
        if(!data.valid){
          this.global.errorToast('Please fill empty field');
          return;
              }
        const formData = {"name":data.value.name,"email":data.value.address};
        this.profile.updateFressUser(formData,this.freeUserDetail._id).subscribe(res=>{
          if(res.success){
            this.getData();
            this.global.successToast(res.msg);
          }
       
          setTimeout(() => {
            this.global.hideLoader();
           });
        },err=>{
          console.log(err);
          this.global.errorToast('Something went Wrong')
        })
      }

      withphoto(datas){
        let formData = new FormData();
         formData.append('student_photo', this.file);
         formData.append('_id',datas._id);
         formData.append('name',datas.student_name);
         formData.append('email', datas.student_email);
         formData.append('father_name', datas.father_name);
         formData.append('roll_no', datas.roll_no);
         formData.append('date_of_admission', datas.date_of_admission);
      
        
          this.personalDetailS.persionalDetails(formData).subscribe(res => {
            this.isErrorImg = false;
            console.log('result of api',res);
            if(res.success == true){
              this.global.successToast('Profile Updated');
              this.getData();
              setTimeout(() => {
                this.global.hideLoader();
               });
            }else{
              this.global.errorToast('Somthing Went Wrong');
              this.global.hideLoader();
            }
          },
          (e)=>{
            this.global.errorToast('error in Api');
            setTimeout(() => {
              this.global.hideLoader();
             });
          })
      }

      withoutphot(datas){
      const formData= {"_id":datas._id,"name":datas.student_name,"email":datas.student_email,"father_name":datas.father_name,"roll_no":datas.roll_no,"date_of_admission":datas.date_of_admission}
        
          this.personalDetailS.persionalDetailsWithoutPhoto(formData).subscribe(res => {
            console.log('result of api',res);
            if(res.success == true){
              this.global.successToast('Profile Updated');
              this.getData();
              setTimeout(() => {
                this.global.hideLoader();
               });
            }else{
              this.global.errorToast('Somthing Went Wrong');
              this.global.hideLoader();
            }
          },
          (e)=>{
            this.global.errorToast('error in Api');
            setTimeout(() => {
              this.global.hideLoader();
             });
          })
      }

    

      ngOnDestroy() {
        
      }

}
