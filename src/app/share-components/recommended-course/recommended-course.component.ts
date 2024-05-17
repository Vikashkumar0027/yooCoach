import { Component, OnInit,AfterContentChecked, 
  AfterViewInit,Input, ViewChild, Output, EventEmitter } from '@angular/core'; 
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination, SwiperOptions, Keyboard } from 'swiper';
import { BuyRecommondedCourseService } from 'src/app/services/buyRecommendedCourse/buy-recommonded-course.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { NavigationExtras, Router } from '@angular/router';
SwiperCore.use([Autoplay, Pagination,EffectCoverflow,Keyboard]);

@Component({
  selector: 'app-recommended-course',
  templateUrl: './recommended-course.component.html',
  styleUrls: ['./recommended-course.component.scss'],
})
export class RecommendedCourseComponent implements OnInit,AfterContentChecked,AfterViewInit {
  @ViewChild('swiperComponent') swiperComponent: SwiperComponent;
  // @Input() bannerApiDAta: any[];
  
  // bannerApiDAta: any[] =  [
  //   {
  //       "_id": "64212279c6fdb5ac7a101938",
  //       "banner_title": "Banner Four",
  //       "banner_status": "active",
  //       "banner_image": "assets/img/courseDetail.png",
  //       "__v": 0
  //   },
  //   {
  //       "_id": "641efb4a265d2812c0fa3168",
  //       "banner_title": "Banner Two",
  //       "banner_status": "active",
  //       "banner_image": "http://18.216.166.94:3000/Images/bannerImage/exam_1593113548.jpg",
  //       "__v": 0
  //   },
  // ];

  bannerConfigs: SwiperOptions= {
    slidesPerView:1,
    spaceBetween: 10,
    // centeredSlides:true,
    initialSlide:1,
    autoplay: {
      delay: 2000,
    },
    // pagination:{clickable:true},
    keyboard:{enabled: true}
  };

 @Input() preCourseList:any[]=[];
  // dataIs = false;
  // @Output() ispremiumCourse: EventEmitter<any> = new EventEmitter();
  constructor(
    private buyRecommendedService:BuyRecommondedCourseService,
    private global:GlobalService,
    private router:Router
  ) { }
// npm install ionic-swiper
  ngOnInit() {
    // setTimeout(() => {
    //  if(this.bannerApiDAta){
    //   this.bannerApiDAta[0].banner_image='assets/img/Rectangle15.png';
    //  }
    // }, 2000);
    // setTimeout(() => {
    //   this. premiumCourseList();
    // });
  }


  // premiumCourseList(){
  //     this.buyRecommendedService.recommondedCourselisting().subscribe(res=>{
   
  //       if(res.success){
  //         this.preCourseList = res.list;
  //         (this.preCourseList.length >= 1) ? this.dataIs = false : this.dataIs = true;
  //         this.premiumCourseAvilable()
  //       }
  //     },err=>{
  //       console.log(err);
  //     });
  // }

//   premiumCourseAvilable() {
//     this.ispremiumCourse.emit(this.dataIs);
// }

  
  ngAfterViewInit() {
    this.swiperComponent.swiperRef.autoplay.running = true;
    // alert('working')
 }

  ngAfterContentChecked() {
    // this.bannerConfigs = {
    //   slidesPerView: 1,
    //   spaceBetween: 15,
    //   initialSlide:  0,
    //   autoplay: {
    //      delay: 3000
    //   },
    //   // pagination: {clickable: true},
    // };
  }

  bannerData(data){
    console.log('selected data',data);
    console.log(data);
    const courseName = {courseName: data?.courseName};
    const navData: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(courseName)
      }
    };
    this.router.navigate(['/','tabs','recmndCoursetopic',data.course_id],navData);
  }

}

