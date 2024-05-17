import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyRecommondedCourseService } from 'src/app/services/buyRecommendedCourse/buy-recommonded-course.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { PdfComponent } from 'src/app/share-components/pdf/pdf.component';
import { SampleImageComponent } from 'src/app/share-components/sample-image/sample-image.component';
import { VdoplayercomponetComponent } from 'src/app/share-components/vdoplayercomponet/vdoplayercomponet.component';

@Component({
  selector: 'app-recommended-course-topic',
  templateUrl: './recommended-course-topic.page.html',
  styleUrls: ['./recommended-course-topic.page.scss'],
})
export class RecommendedCourseTopicPage implements OnInit {

 course:any;
 course_id:any;
 alldataList:any[]=[];
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private buyRecommendedService:BuyRecommondedCourseService,
    private global:GlobalService
  ) { }

  ngOnInit() {
    const data = this.route.snapshot.queryParams;
    const course = JSON.parse(data.data);
    this.course = course.courseName;
     this.course_id = this.route.snapshot.paramMap.get('course_id');
     this.geTopic();
  }


  geTopic(){
    this.global.showLoader();
    const courseId = {"course_id":this.course_id};
    this.buyRecommendedService.getPrimiumTopic(courseId).subscribe(res=>{
      console.log(res);
      this.global.hideLoader();
      if(res.success){
        this.alldataList =res.data;
      }
    },err=>{
      this.global.hideLoader();
      console.log(err);
    })
  }

  openDoc(data){
    (data.type=="yotube") ? this.vdoOpen(data.upload_doc) : this.openPdf(data);
  }


  fileType:any;
  async openPdf(e){
    this.fileType = e.upload_doc.substring(e.upload_doc.lastIndexOf('.') + 1).toLowerCase();
    console.log(this.fileType);

    if(this.fileType == 'pdf'){
        this.global.showLoader();
    const options = {
          component: PdfComponent,
          cssClass: 'my-custom-class',
          handle: false,
          componentProps: {
            src:e.upload_doc
           }
        };
      const modal = await this.global.createModal(options);
    }else{
      // this.global.showLoader();
    const options = {
          component: SampleImageComponent,
          cssClass: 'my-custom-class',
          handle: false,
          componentProps: {
            src:e.upload_doc
           }
        };
      const modal = await this.global.createModal(options);
    }
    // this.global.showLoader();
   
  }

  async vdoOpen(id){
    try {
      // console.log(id);
    const options = {
      component: VdoplayercomponetComponent,
      cssClass: 'my-custom-class',
      handle: false,
      componentProps: {
        //  from: 'home'
        videoId:id
       }
    };
  const modal = await this.global.createModal(options);
    } catch (error) {
      
    }
  }

  alert(param){
    if(param?.topic.length >= 1){
      return;
    }else{
      this.global.errorToast('Topics are not avilable ');
    }
  }

}
