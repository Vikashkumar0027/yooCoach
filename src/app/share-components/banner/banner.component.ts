import { AfterContentChecked, 
  AfterViewInit, Component, 
  Input, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination, SwiperOptions, Keyboard } from 'swiper';
SwiperCore.use([Autoplay, Pagination,EffectCoverflow,Keyboard]);
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit,AfterContentChecked,AfterViewInit {
  @ViewChild('swiperComponent') swiperComponent: SwiperComponent;
  @Input() bannerApiDAta: any[];

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
  constructor() { }
// npm install ionic-swiper
  ngOnInit() {
    // setTimeout(() => {
    //  if(this.bannerApiDAta){
    //   this.bannerApiDAta[0].banner_image='assets/img/Rectangle15.png';
    //  }
    // }, 2000);
  }

  
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

  bannerData(p){
    console.log('selected data',p);
  }

}
