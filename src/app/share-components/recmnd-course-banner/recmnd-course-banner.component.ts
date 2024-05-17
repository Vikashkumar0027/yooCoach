import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination, SwiperOptions, Keyboard } from 'swiper';
SwiperCore.use([Autoplay, Pagination,EffectCoverflow,Keyboard]);
@Component({
  selector: 'app-recmnd-course-banner',
  templateUrl: './recmnd-course-banner.component.html',
  styleUrls: ['./recmnd-course-banner.component.scss'],
})
export class RecmndCourseBannerComponent implements OnInit,AfterViewInit {
  jwt:any;
  @ViewChild('swiperComponent') swiperComponent: SwiperComponent;
  @Input() recommendedCourse:any[];
  @Output() buypreCourse: EventEmitter<any> = new EventEmitter();
  @Output() fullDiscount: EventEmitter<any> = new EventEmitter();

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
  constructor(
    private router:Router,
    private commonService:CommonService
    ) { }

 async ngOnInit() {
    this.jwt = await this.commonService.jwtToken();
  }

  ngAfterViewInit() {
    this.swiperComponent.swiperRef.autoplay.running = true;
    // alert('working')
 }

  checkPrice(courseDetail){
    const data =  courseDetail.class_id.filter(x => x === this.jwt.payload.user.class_id);
    console.log(data);
    if(data.length >= 1) {
      return false;
    } else{
      return true;
    }
  }

  premiumCourse(list){
    this.router.navigate(['/','tabs','premium_course',list._id])
  }

  buyVdo(param){
    this.buypreCourse.emit(param);
  }

  fullDiscountVdo(param){
    this.fullDiscount.emit(param);
  }

}
