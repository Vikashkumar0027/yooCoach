import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUidService } from '../provider/authUid/auth-uid.service';
import { CommonService } from '../services/common/common.service';
import { GlobalService } from '../services/global/global.service';
import { PersonaldetailService } from '../services/personaldetail/personaldetail.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.page.html',
  styleUrls: ['./personal-details.page.scss'],
})
export class PersonalDetailsPage implements OnInit {
date:any
  constructor(private router:Router,
    private personalDetailS:PersonaldetailService,
    private commonService: CommonService,
    private global:GlobalService,
    private authuid:AuthUidService) { }

  ngOnInit() {
  }
  // getUrl(){
  //   this.personalDetailS.getUrl().subscribe(res=> {
  //     console.log('testing api',res);
  //   })
  // }
  private file: File;
  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }
 

 async onSubmit(data){

    const jwtToken:any = await this.commonService.jwtToken();
    console.log('Token ID Get',jwtToken.payload.user._id);
this.global.showLoader();
    const datas ={ student_name:data.value.name,
       student_email:data.value.address, 
       father_name:data.value.parent,
        roll_no: data.value.roll, 
        date_of_admission:data.value.date, 
        _id:jwtToken.payload.user._id
        // contact_no:data.value.phone,
    };
    console.log('All data Get',datas);
  
    let formData = new FormData();
    formData.append('student_photo', this.file, this.file.name);
    formData.append('_id',datas._id);
    formData.append('name',datas.student_name);
    formData.append('email', datas.student_email);
    formData.append('father_name', datas.father_name);
    formData.append('roll_no', datas.roll_no);
    formData.append('date_of_admission', datas.date_of_admission);
    // formData.append('contact_no', datas.contact_no);
    console.log("all form data", formData);
   
    const token = await this.commonService.getStorage('token');
    const tokens = JSON.parse(token.value);
    this.authuid.getUid(tokens);
    this.personalDetailS.persionalDetails(formData).subscribe(res => {
      console.log('result of api',res);
      if(res.success == true){
        this.global.hideLoader();
        this.router.navigateByUrl('/tabs');
      }else{
        this.global.errorToast('Somthing Went Wrong');
        this.global.hideLoader();
      }
    },
    (e)=>{
      console.log('error in Api',e);
      this.global.errorToast('error in Api');
      this.global.hideLoader();
    })
      }

}
