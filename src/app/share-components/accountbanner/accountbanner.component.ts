import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SwiperCore, { Autoplay, EffectCoverflow, Pagination, SwiperOptions } from 'swiper';
SwiperCore.use([Autoplay, Pagination,EffectCoverflow]);

@Component({
  selector: 'app-accountbanner',
  templateUrl: './accountbanner.component.html',
  styleUrls: ['./accountbanner.component.scss'],
})
export class AccountbannerComponent implements OnInit,AfterContentChecked {
  bannerConfig: SwiperOptions;
  @Input() selectedValue:any;
  @Output() accountType: EventEmitter<any> = new EventEmitter();
  @Input() bannerData:any[];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.dataAvailable();
    // setTimeout(() => {
    //   this.checkValue();
    // });
  }

     dataAvailable(){
      if(this.bannerData.length > 0){
        this.selectedSubjected();
      }else{
        this.delayData();
      }

     }

     delayData(){
      setTimeout(() => {
        this.dataAvailable();
      });
     }



 async selectedSubjected(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('snapSHot Active Route', id);
    
    if(id){
      const index = this.bannerData.findIndex(x=>x.name.toLowerCase()==id.toLowerCase());
    console.log('find index',index);
      this.selectedValue = this.bannerData[index]._id;
      this.checkValue();
    }else{
        this.selectedValue = this.bannerData[0]._id;
        this.checkValue();
     
     
    }
  }

  checkValue(event?) {
    // console.log('Selected value: ', this.selectedValue);
    this.accountType.emit(this.selectedValue);
}

  ngAfterContentChecked() {
    this.bannerConfig = {
      slidesPerView: 4,
      spaceBetween: 15,
      initialSlide:  0,
      // autoplay: {
      //    delay: 2000
      // },
      // pagination: {clickable: true},
    };
  }

}
