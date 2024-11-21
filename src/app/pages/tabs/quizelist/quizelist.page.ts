import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { CommonService } from 'src/app/services/common/common.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { QuizlistService } from 'src/app/services/quizlist/quizlist.service';

@Component({
  selector: 'app-quizelist',
  templateUrl: './quizelist.page.html',
  styleUrls: ['./quizelist.page.scss'],
})
export class QuizelistPage implements OnInit {
  setList:any[]=[];
  chapter:any[]=['Chapter 1','Chapter 2','Chapter 3','Chapter 4','Chapter 5','Chapter 6','Chapter 7','Chapter 8'];
  folder: string;
  quizScoreData:any[]=[];

  constructor(private global:GlobalService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private commonService:CommonService,
    private quizListService:QuizlistService,
    private authToken:AuthUidService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.global.showLoader();
    this.snapData();
    this.getScroreCard()
  //  this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  //  console.log('kaam kar raha hai',this.folder);
  //  this.getQuestionList(this.folder);
  }

  snapData(){
    const data = this.route.snapshot.queryParams;
    if (data?.data) {
      const address = JSON.parse(data.data);
      console.log('snapdata',address);
      this.getSetList(address);
    }else {
      this.global.hideLoader();
      this.global.errorToast('something went Wrong');
    }
  }

  async getSetList(param){
      const tokenDAta = await this.commonService.getStorage('token');
    const tokens = JSON.parse(tokenDAta.value);
    this.authToken.getUid(tokens)
    // const data = { "admin_id":jwtToken.payload.user.admin_id, "subject":subject };
      // console.log('api hit daya',data)  ; 
      const data ={"class_id":param.class_id,"subject_id":param.subject_id};
      this.quizListService.questionList(data).subscribe(res=>{
        console.log('api hit by quzList Api',res);
        if(res.success == true){
          this.setList = res.data;
          console.log('api hit by this.setList',this.setList);
          this.global.hideLoader();
        }else{
          this.global.hideLoader();
          this.global.errorToast('something went Wrong');
        }
      }),
      (err)=> {
        console.log('Error Api data',err);
        this.global.hideLoader();
      };
  }

  // async getQuestionList(subject){
  //   const tokenDAta = await this.commonService.getStorage('token');
  //   const tokens = JSON.parse(tokenDAta.value);
  //   this.authToken.getUid(tokens);
  //   const jwtToken:any = await this.commonService.jwtToken();
  //   const data = { "admin_id":jwtToken.payload.user.admin_id, "subject":subject };
  //   // console.log('api hit daya',data)  ; 
  //   this.quizListService.questionList(data).subscribe(res=>{
  //     console.log('api hit by quzList Api',res);
  //     if(res.success == true){
  //       this.setList = res.Data;
  //       this.global.hideLoader();
  //       console.log('api hit by this.setList',this.setList);
  //     }
  //   }),
  //   (err)=> {
  //     console.log('Error Api data',err);
  //   };
  // }

  // closemodal(){
  //   this.global.modalDismiss();
  // }

  async getScroreCard(){
    const token = await this.commonService.getStorage('token');
    const tokens = JSON.parse(token.value);
    this.authToken.getUid(tokens);

    const jwt:any = await this.commonService.jwtToken();
   
    this.quizListService.scroreCard(jwt.payload.user._id).subscribe(res=>{
      console.log('scrore car54d api',res);
      if(res.success==true){
        this.quizScoreData=res.data;
        this.global.hideLoader();
      }
      
    },
    (err)=>{
      this.global.hideLoader();
      this.commonService.tokenOutOfValid(err);
    })
  }

  datas(param){
    console.log('kaam kar raha hai',param);
    console.log('url',this.router.url);
    const isResultAvilable = this.quizScoreData.filter(x=>x.qset == param._id);

    const data = {time:param.qps_time, _ID: param._id};
    const navData: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(data)
      }
    };
    // console.log('navData', data);
    // this.router.navigate(['/', 'tabs', 'quizelist', id]);
    if(isResultAvilable.length){
      this.global.errorToast('You have already given the test');
    }else{
      this.router.navigate(['/', 'tabs', 'quizelist','quiz-questions'], navData);
    }
    // this.router.navigate([this.router.url,'quiz-questions'], navData);
  }

}
