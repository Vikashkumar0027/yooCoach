import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { SamplepaperService } from 'src/app/services/samplepaper/samplepaper.service';
import { PdfComponent } from 'src/app/share-components/pdf/pdf.component';
import { Subscription } from 'rxjs';
import { SampleImageComponent } from 'src/app/share-components/sample-image/sample-image.component';

import {formatDate } from '@angular/common';
@Component({
  selector: 'app-simple-paper',
  templateUrl: './simple-paper.page.html',
  styleUrls: ['./simple-paper.page.scss'],
})
export class SimplePaperPage implements OnInit, OnDestroy{
  today:any;
  todaysDataTime = '';
  samplepaperData: Subscription;
  dataIs:boolean = false;
  model: any ={
    title: 'No Data Available',
    icon: 'alert-circle-outline',
    color: 'danger'
  };


  sampleListing:any[]=[];
  id:any;

  constructor(private global :GlobalService, private samplePaperService:SamplepaperService) { }

  ngOnInit() {
    // this.sampleListsApi();
    this. getsamplePaperLists();
    
  }

  ionViewDidEnter(){
    this.sampleListing= [];
    this.sampleListsApi();
    this.repetition();
  }

  refress(){
    this.global.showLoader();
     this.sampleListing =[];
     this.sampleListsApi();
  
  }


  minutes(time:any){
    let timeArray = time.toString().split(':').map(data => parseInt(data));
    let minutes = (timeArray[0] * 60) + timeArray[1];
    return minutes;
    // console.log(minutes+ " minutes");
  }

  repetition(){
    this.id= setInterval(() => {
      // this.scrollToBottom();
      this.sampleListsApi();
      // this.ngOnInit();
      }, 9000);
  }

 


    timeFuction(timeString){
      // const data = timeString;
      // return data;
      const [hourString, minute] = timeString.split(":");
      const hour = +hourString % 24;
      return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
    }


  getsamplePaperLists(){
    this.global.showLoader();
    
    // this.samplepaperData =
     this.samplepaperData = this.samplePaperService.samplePepers.subscribe(res => {
      // console.log('result of the res userData in app.ts',res)
      this.today= new Date();
    this.todaysDataTime = formatDate(this.today, ' H:mm', 'en-US', '+0530');
    console.log( this.todaysDataTime);
    const totalMinutes = this.minutes(this.todaysDataTime);
    console.log(totalMinutes+ " minutes");

      const timefilter = res.filter(x =>  this.minutes(x.starting_time) <= totalMinutes);
      console.log(timefilter);
      // this.sampleListing = res;
      this.sampleListing = timefilter;
      this.global.hideLoader();
  
     },
     (err)=> {
      this.global.hideLoader();
     })
  }



  sampleListsApi(){
    this.samplePaperService.getSamplePaper().subscribe(res=>{
      console.log('data',res);
      this.global.hideLoader();
      this.today= new Date();
      this.todaysDataTime = formatDate(this.today, ' H:mm', 'en-US', '+0530');
      console.log( this.todaysDataTime);
      const totalMinutes = this.minutes(this.todaysDataTime);
      console.log(totalMinutes+ " minutes");
      
        const timefilter = res.data.filter(x =>  this.minutes(x.starting_time) <= totalMinutes);
        console.log(timefilter);

      (timefilter.length <= 0 ) ?   this.dataIs = true :  this.dataIs = false;
      // (res.data.length <= 0 ) ?   this.dataIs = true :  this.dataIs = false;
      // && res.data.length !== this.sampleListing.length || null
      if(res.success == true && timefilter.length !== this.sampleListing.length ){
      // if(res.success == true && res.data.length !== this.sampleListing.length ){
        this.samplePaperService.getUserData(timefilter);
        // this.sampleListing = res.data;
      }
    },(err)=> {
      console.log(err);
    });
  }

  async openPdf(e){
    // alert('working..');
    console.log('pdf data',e)
    if(e.type == "pdf") {
      this.pdfOpen(e);
    }else {
this.imageOpen(e);
    }
  }

  async pdfOpen(e){
 const options = {
        component: PdfComponent,
        cssClass: 'my-custom-class',
        handle: false,
        componentProps: {
          //  from: 'home'
          samplePaper:true,
          src:e.upload_document
         }
      };
    const modal = await this.global.createModal(options);
  }

  async imageOpen(e){
    // alert('Image Working');
    const options = {
      component: SampleImageComponent,
      cssClass: 'my-custom-class',
      handle: false,
      componentProps: {
        //  from: 'home'
        samplePaper:true,
        src:e.upload_document
       }
    };
  const modal = await this.global.createModal(options);
  }


  // Close Interval time
  ionViewWillLeave(){
    if (this.id) {
          clearInterval(this.id);
        }
  }

  ngOnDestroy(){
    if(this.samplepaperData) this.samplepaperData.unsubscribe();
  }

}
