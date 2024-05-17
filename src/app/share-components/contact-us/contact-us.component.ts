import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ContactusService } from 'src/app/services/conatctus/contactus.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  data:any;
  constructor(private contactService:ContactusService,
    private authToken:AuthUidService,private router:Router,
    private commonService:CommonService) { }
    
  ngOnInit() {
    this.getData();
  }

  goChatBox(){
    this.router.navigate(['/', 'tabs', 'chat']);
  }

  async getData(){
    const token = await this.commonService.getStorage('gurukultkns');
    const tokens = JSON.parse(token.value);
    this.authToken.getUid(tokens);
    this.contactService.getData().subscribe(res =>{
      console.log('contact us',res)
      if(res.success == true){
        this.data = res.result;
      }
    },
   (err)=>{
     console.log(err);
     this.commonService.tokenOutOfValid(err);
   })
  }

}
