import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading:boolean;
  sessionList:any[]=[];
  classes:any[] = [];
  subject:any[] = [];
  selectedClass:any;
  selectedArray :any = [];
  batchList:any[] = [];
  mainBatchList:any[] = [];
  isChecked:boolean = false;
  isvalidNuber:boolean = false;

@ViewChild('f1') fillForm: NgForm;
  constructor(
    private router: Router,
    private loginService:LoginService,
    private global: GlobalService,
    private commonService: CommonService,
    // private authuid: AuthUidService,
    ) { }

  ngOnInit() {
    // this.global.showLoader()
    // this.getToken();
      // this.getAllSubjectApi();
      this.getClass();
      this.sessionLst();
      this.gateBatchLst();
  }


  onClassClick(id) {
   this.batchList = this.mainBatchList.filter(x => x.class_id == id);
   console.log(this.batchList);
   if(this.batchList.length == 0){
    this.global.errorToast('Sorry No Batch For this Class');
   }

  }


  checkMobileNuber(otp: any){
    if (otp.target.value.length === 10) {
     const mobdata = { "mobile_number":otp.target.value }
      // this.isvalidNuber = true;
      this.loginService.checkMobileNumber(mobdata).subscribe(res=>{
        // console.log(res);
        if(res.success){
          (res.mobile_number) ? this.isvalidNuber = true : this.isvalidNuber = false;
        }
      },
      (err)=> {
        this.global.errorToast('Please your Check internet');
        this.fillForm.form.patchValue({phone: null})
      }
      )
     
    }else{
      this.isvalidNuber = false;
    }
  }

  getClass(){
    
      this.isLoading = false;
      this.global.showLoader()
      this.loginService.getClass().subscribe(res => {
        if(res.success == true){
          this.classes = res.data;
          this.isLoading = true;
          this.global.hideLoader();
        }
      },
      (error) => {
        this.global.hideLoader();
        this.isLoading = true;
        this.global.errorToast('Please Check internet');
        this.router.navigate(['/home']);
      }
      );
   
    }


  sessionLst(){
    this.loginService.getSession().subscribe(res=> {
      // console.log(res);
      if(res.success == true){
        this.sessionList = res.data;
      }
    });
  }

  gateBatchLst(){
    this.loginService.getBatch().subscribe(res=> {
      // console.log(res);
      if(res.success == true){
        this.mainBatchList = res.data;
        // this.batchList = res.data;
      }
    });
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
          // this.imageSrc = resolve;
          // this.file = resolve;

          this.dataURLtoFile(resolve);

        });
      };
    }
  }

  dataURLtoFile(dataurl){
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    this.file = new File([u8arr], 'filename', {type: 'image/jpeg'});
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



  onSubmit(param:any){
   
    if(this.isvalidNuber) {
      this.global.errorToast('Please change your mobile number');
      return;
    }
    if(!param.valid){
      this.global.hideLoader();
      this.global.errorToast('Please fill empty field');
      return;
          }
           this.global.showLoader();
          const data = this.classes.find(x => x._id == param.value.class);
    // console.log(data.class_name);
    if(param.value.condition == false  || param.value.condition == ''){
      this.global.hideLoader();
            this.global.errorToast('Please Select Term & condition');
            return;
          }
          // console.log(param.value);
          const d = new Date();
          const newdayte =d.toDateString();

          let formData = new FormData();
         formData.append('student_photo', this.file);
         formData.append('board',param.value.board);
         formData.append('select_batch_time',param.value.batchTime);
         formData.append('name',param.value.name);
         formData.append('father_name',param.value.fatherName);
         formData.append('mother_name',param.value.motherName);
         formData.append('email', param.value.email);
         formData.append('password', param.value.Password);
         formData.append('sex', param.value.gender);
         formData.append('mobile_number', param.value.phone);
         formData.append('contact_guardian_no', param.value.fatherNumber);
         formData.append('date_of_birth', param.value.dob);
         formData.append('address', param.value.address);
         formData.append('exam_seating', param.value.examSeating);
         formData.append('date_of_admission', newdayte);
         formData.append('class_id', param.value.class);
         formData.append( 'admin_id' , data.class_name);

          this.loginService.signUp(formData).subscribe(res => {
            // console.log(res);
            if(res.success){
              this.global.hideLoader();
              this.global.successToast('Your account has been created successfully.Please wait for approval.');
              this.fillForm.reset();
              this.router.navigate(['/home']);
            }
          },
          (err)=> {
            this.global.hideLoader();
            // console.log(err);
this.global.errorToast('Somthing went Wrong');
          })
  }
  

  // classData(d){
  //   console.log('selected class',d);
  //   this.selectedClass=d.class_name;
  //   console.log('selcted classs',this.selectedClass);
  // }
  selectMember(data){
    setTimeout(() => {
      // console.log('data of subject',data);
      if (data.isChecked == true) {
           this.selectedArray.push(data.subject_name);
         } else {
          let newArray = this.selectedArray.filter(function(el) {
            return el !== data.subject_name;
         });
          this.selectedArray = newArray;
        }
        // console.log('selected subjected',this.selectedArray);
    }, );

   }

}
