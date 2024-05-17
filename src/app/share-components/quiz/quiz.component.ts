import { Component, OnInit } from '@angular/core';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { QuizlistService } from 'src/app/services/quizlist/quizlist.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
quizScoreData:any[]=[];
isImpty:boolean = false;
model: any ={
  title: 'No Data Available',
  icon: 'alert-circle-outline',
  color: 'danger'
};
// <ion-icon name="alert-circle-outline"></ion-icon>
  constructor(private qizeListService:QuizlistService,
    private commonService:CommonService,
    private authToken:AuthUidService,
    private global:GlobalService) { }

  ngOnInit() {
    this.global.showLoader();
    this.getScroreCard();
  } 

  async getScroreCard(){
    const token = await this.commonService.getStorage('gurukultkns');
    const tokens = JSON.parse(token.value);
    this.authToken.getUid(tokens);

    const jwt:any = await this.commonService.jwtToken();
    
    // const data1 = {_id: jwt.payload.user._id };
    // const data={}
    this.qizeListService.scroreCard(jwt.payload.user._id).subscribe(res=>{
      console.log('scrore car54d api',res);
      if(res.success==true){
        res.data.length== 0 ? this.isImpty=true : this.isImpty=false;
        this.quizScoreData=res.data;
        this.global.hideLoader();
      }
      
    },
    (err)=>{
      this.global.hideLoader();
      this.commonService.tokenOutOfValid(err);
    })
  }

}
