import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { map, takeUntil, takeWhile } from 'rxjs/operators';
import { addSeconds, format } from 'date-fns';
import { GlobalService } from 'src/app/services/global/global.service';
import { QizQuestionService } from 'src/app/services/quizQuestion/qiz-question.service';
import { CommonService } from 'src/app/services/common/common.service';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { NavController } from '@ionic/angular';
import { AnswerCheckerComponent } from 'src/app/share-components/answer-checker/answer-checker.component';


@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.page.html',
  styleUrls: ['./quiz-questions.page.scss'],
})
export class QuizQuestionsPage implements OnInit {
  // public name: string="";
  values: any;
  url: any[];
  urlCheck: any;
  questionLists: any[] = [];
  subjectId:any;
  grade:any;
  public currentQuestion: number = 0;
  public points: number = 0;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  counter = 0;
  countdownDisplay?: string;
  starter$ = new Subject<void>();
  selectedValue: any;
  containertab: boolean=false;
  totalAnsweredQuestion: number = 0;
  totalSkipQuestion: number = 0;
  completation:any;

  
  // public isdata = '<p>44<math xmlns="http://www.w3.org/1998/Math/MathML"><msqrt><mn>43</mn></msqrt><mo>&#160;</mo><mo>+</mo><mstyle displaystyle="false"><munderover><mo>&#8721;</mo><mn>5</mn><mn>5</mn></munderover></mstyle></math></p>';
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private global: GlobalService,
    private quizService: QizQuestionService,
    private commonService:CommonService,
    private authToken:AuthUidService,
    private navCtrl: NavController
    ) {}

  async ngOnInit() {
    const tokenDAta = await this.commonService.getStorage('token');
    const tokens = JSON.parse(tokenDAta.value);
    this.authToken.getUid(tokens);
    // this.questionList1();
    this.global.showLoader();
    this.snapShotdata();
    this.checkUrl();
    this.startCounter();
    
  }

  ionViewDidEnter(){
    
  }


  confirmExitExam(){
 this.commonService.confirmExitExam();
  }

  async checkValue(e) {
    // console.log(e);
    this.values = e.option;
    await this.questionLists[this.currentQuestion].options.forEach((ele) => {
      ele.selected = 'hide';
    });
    e.selected = 'show';
    console.log(e);
    console.log('all list question',this.questionLists)
  }

  previousQuestion() {
    this.currentQuestion--;
    this.radioValue();
  }

  radioValue() {
    // console.log('all list question',this.questionLists);
    const data = this.questionLists[this.currentQuestion].options.find(
      (f) => f.selected == 'show'
    );
    console.log('find data', data);
    if (data) {
      this.values = data.option;
      console.log('all data',this.values);
    }
  }
  nextQuestion() {
    this.currentQuestion++;
    this.radioValue();
  }


  nextContainer(){
    this.starter$.next(); //Its clear time that means its do time Up
  }

  submitExam(){
    this.totalaresult();
    this.examSubmitsApi();
    this.containertab = true;
  }

  async examSubmitsApi(){
    const jwtToken:any = await this.commonService.jwtToken();
    // console.log('counter',jwtToken.payload.user._id);
    // const sdf = {"correct_answer":this.correctAnswer,"wrong_answer":this.inCorrectAnswer,"duration":this.counter,"question":this.questionLists};
      const skip = this.questionLists.length-(this.correctAnswer+this.inCorrectAnswer);
      const percntage = (this.correctAnswer/this.questionLists.length)*100;
    // console.log("percentage",percntage);
    // console.log("percentage",this.subjectId);
    if(percntage < 35){
      this.grade = 'Fails'
    } else if(percntage >= 35 && percntage < 50){
      this.grade = 'Good'
    }else if(percntage >= 50 && percntage < 70){
      this.grade = 'Better'
    }else if(percntage >= 70 && percntage < 90){
      this.grade = 'Best'
    }else if(percntage >= 90 && percntage <= 100){
      this.grade = 'Excellent'
    }
    
   setTimeout(() => {
    // const data ={"student_id":jwtToken.payload.user._id,"qset":this.questionLists[0].set,"class_id":jwtToken.payload.user.class_id,"subject_id":this.subjectId,"total_question":this.questionLists.length,"wrong":this.inCorrectAnswer,"correct":this.correctAnswer,"skip":skip,"percentage":percntage,"grade":this.grade,"duration":this.counter, "status":"active"};

    const data ={"student_id":jwtToken.payload.user._id,"qset":this.questionLists[0].set_id,"class_id":jwtToken.payload.user.class_id,"subject_id":this.subjectId,"total_question":this.questionLists.length,"wrong":this.inCorrectAnswer,"correct":this.correctAnswer,"skip":skip,"percentage":percntage,"grade":this.grade,"duration":this.counter, "status":"active"};
    console.log('result of submit api',data)

    this.quizService.examSubmit(data).subscribe(res=>{
      console.log('result of submit api',res)
    })
   });
  }
  

  totalaresult(){
    this.correctAnswer=0;
    this.inCorrectAnswer=0;
    // console.log('all selected data', this.questionLists)
    this.questionLists.forEach(element => {
        const data = element.options.find(x => x.selected == 'show');
        if(!data){
         return;
        }else{
           if(data?.correct == true){
          this.correctAnswer++;
        } 
        else{
          this.inCorrectAnswer++;
        }
        }
      });
      setTimeout(() => {
        console.log('correct anser', this.correctAnswer );
        console.log('incorrect anser', this.inCorrectAnswer );
        this.completation = ((this.correctAnswer + this.inCorrectAnswer)/this.questionLists.length)*100;
        console.log(' this.questionLists',  this.questionLists);
      });
  }

 

  

  startCounter() {
    this.starter$.next(); // clear pending timers
    let nsecs = this.counter*60;
    
    // let nsecs = this.counter;
    interval(1000)
      .pipe(
        takeUntil(this.starter$),
        takeWhile((countup) => countup <= nsecs),
        map((countup) => {
          let countdown = nsecs - countup;
          let d = new Date();
          d.setHours(0, 0, 0, 0);
          d = addSeconds(d, countdown);
          let fmt = format(d, 'HH:mm:ss');
          // alert('working')
          return fmt;
        })
      )
      .subscribe(
        (cd) => (this.countdownDisplay = cd),
        (err) => console.log(err),
        () =>
          //  alert("ding")
          // console.log('ding')
         this.submitExam()
      );
  }



  checkUrl() {
    let url: any = this.router.url.split('/');
    const spliced = url.splice(url.length - 1, 1);
    this.url = url;
  }
  
  // getPreviousUrl() {
  //   return this.url.join('/');
  // }

  snapShotdata() {
    const data = this.route.snapshot.queryParams;
    if (data?.data) {
      const address = JSON.parse(data.data);
      console.log('snapshot() address parse datat', address);
      this.counter =address.time;
      const getDe = {"_id":address._ID};
      // console.log('Exact data', getDe);
      this.quizService.questionList(getDe).subscribe(res=>{
        console.log(res);
        if(res.success==true && res.result.result.length >= 1){
          this.subjectId = res.result.subject_id;
          this.questionLists=res.result.result;

          this.global.hideLoader();
          console.log('all question array',this.questionLists);
        }else{
          this.global.hideLoader();
          this.global.errorToast('There is no Any Question avilable')
          this.navCtrl.back();
        }
      },
      (err)=>{
        this.global.hideLoader();
        this.global.errorToast(err.error.message);
      })

    }
  }

  async checkAnswer(){
    console.log(' this.questionLists',  this.questionLists);
    // this.global.showLoader();
    const options = {
          component: AnswerCheckerComponent,
          cssClass: 'my-ansercheck-class',
          handle: false,
          componentProps: {
            //  from: 'home'
            questions:this.questionLists
           }
        };
      const modal = await this.global.createModal(options);
  }

  // ngOnDestroy(){
    // this.global.customStatusbar();
    // if(this.cartSub) this.cartSub.unsubscribe();
  // }

  //   questionList(){
// this.quizService.getData().subscribe(res => {
//   console.log('qizApi',res);
// },
// (err)=>{
//   console.log('quiz list Api Error',err);
// })
//   }

  // questionList1() {
  //   this.questionLists = [
  //     {
  //       questionText:
  //         'Which of the following does TypeScript use to Specify types?',
  //       options: [
  //         {
  //           text: ':',
  //           correct: true,
  //           selected: 'hide',
  //         },
  //         {
  //           text: ';',
  //           selected: 'hide',
  //         },
  //         {
  //           text: '!',
  //           selected: 'hide',
  //         },
  //         {
  //           text: '&',
  //           selected: 'hide',
  //         },
  //       ],
  //       explanation:
  //         'TS users a colon (:) to seperate the property name from the property type',
  //     },
  //     {
  //       questionText:
  //         'Which of the following is the correct syntax to redirect a url using JavaScript?',
  //       options: [
  //         {
  //           text: "document.location='http://www.newlocation.com'",
  //           selected: 'hide',
  //         },
  //         {
  //           text: "browser.location='http://www.newlocation.com';",
  //           selected: 'hide',
  //         },
  //         {
  //           text: " navigator.location='http://www.newlocation.com';",
  //           selected: 'hide',
  //         },
  //         {
  //           text: "window.location='http://www.newlocation.com';",
  //           correct: true,
  //           selected: 'hide',
  //         },
  //       ],
  //       explanation:
  //         "window.location='http://www.newlocation.com'; is the correct option.",
  //     },
  //     {
  //       questionText:
  //         ' Which of the following function of String object returns the calling string value converted to lower case?',
  //       options: [
  //         {
  //           text: 'toLocaleLowerCase()',
  //         },
  //         {
  //           text: 'toLowerCase()',
  //           correct: true,
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'toString()',
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'substring()',
  //           selected: 'hide',
  //         },
  //       ],
  //       explanation:
  //         'toLowerCase() − Returns the calling string value converted to lower case.',
  //     },
  //     {
  //       questionText:
  //         ' Which of the following function of Array object returns a string representing the array and its elements?',
  //       options: [
  //         {
  //           text: ' toSource()',
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'sort()',
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'splice()',
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'toString()',
  //           correct: true,
  //           selected: 'hide',
  //         },
  //       ],
  //       explanation:
  //         'toString() − Returns a string representing the array and its elements.',
  //     },
  //     {
  //       questionText:
  //         ' Which of the following function of Array object applies a function simultaneously against two values of the array (from left-to-right) as to reduce it to a single value?',
  //       options: [
  //         {
  //           text: 'pop()',
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'push()',
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'reduce()',
  //           correct: true,
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'reduceRight()',
  //           selected: 'hide',
  //         },
  //       ],
  //       explanation:
  //         'reduce() − Applies a function simultaneously against two values of the array (from left-to-right) as to reduce it to a single value.',
  //     },
  //     {
  //       questionText:
  //         'Which of the following function of Array object adds one or more elements to the front of an array and returns the new length of the array?',
  //       options: [
  //         {
  //           text: 'unshift()',
  //           correct: true,
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'sort()',
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'splice()',
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'toString()',
  //           selected: 'hide',
  //         },
  //       ],
  //       explanation:
  //         'unshift() − Adds one or more elements to the front of an array and returns the new length of the array.',
  //     },
  //     {
  //       questionText:
  //         'Which of the following function of Boolean object returns a string containing the source of the Boolean object?',
  //       options: [
  //         {
  //           text: 'toSource()',
  //           correct: true,
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'valueOf()',
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'toString()',
  //           selected: 'hide',
  //         },
  //         {
  //           text: 'None of the above',
  //           selected: 'hide',
  //         },
  //       ],
  //       explanation:
  //         'toSource() − Returns a string containing the source of the Boolean object; you can use this string to create an equivalent object.',
  //     },
  //   ];
  // }

}
