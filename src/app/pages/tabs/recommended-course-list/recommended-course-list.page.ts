import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BuyRecommondedCourseService } from 'src/app/services/buyRecommendedCourse/buy-recommonded-course.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-recommended-course-list',
  templateUrl: './recommended-course-list.page.html',
  styleUrls: ['./recommended-course-list.page.scss'],
})
export class RecommendedCourseListPage implements OnInit {

  dataIs = false;
  model: any ={
    title: 'No data Available',
    icon: 'alert-circle-outline',
    color: 'danger'
  };
  preCourseList:any[]=[];
  constructor(
    private buyRecommendedService:BuyRecommondedCourseService,
    private router:Router,
    private global:GlobalService
    ) { }

  ngOnInit() {
       this.premiumCourseList();
  }
// recmndCoursetopic/:course_id
selectedArray:any;
  selectMember(data){
console.log(data);

setTimeout(() => {

  if (data.isChecked == true) {
    this.selectedArray = data;

   this.preCourseList.forEach( (el) => {
       if(el._id == data._id){
        return;
       }else{
        el.isChecked = false;
       }
   });
   setTimeout(() => {
    this.gotoTopic(this.selectedArray);
    this.selectedArray.isChecked = false;  
   }, 200);

   } else {
    this.selectedArray = {};
  }
});
  }

  gotoTopic(data){
    console.log(data);
    const courseName = {courseName: data?.courseName};
    const navData: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(courseName)
      }
    };
    this.router.navigate(['/','tabs','recmndCoursetopic',data.course_id],navData);
  }
 
  premiumCourseList(){
    this.global.showLoader();
      this.buyRecommendedService.recommondedCourselisting().subscribe(res=>{
        this.global.hideLoader();
        if(res.success){
          this.preCourseList = res.list;
          (this.preCourseList.length >= 1) ? this.dataIs = false :this.dataIs = true;
        }
      },err=>{
        this.global.hideLoader();
        console.log(err);
      });
  }

}
