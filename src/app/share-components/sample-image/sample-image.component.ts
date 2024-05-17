import { Component, Input, OnInit, ViewChild,VERSION } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-sample-image',
  templateUrl: './sample-image.component.html',
  styleUrls: ['./sample-image.component.scss'],
})
export class SampleImageComponent implements OnInit {
  
  @Input() src:any;
  @Input() samplePaper:boolean;

 
  name = 'Angular ' + VERSION.major;

  constructor(private global: GlobalService) { }

  ngOnInit() {}

  cancel(data?){
    if(data){
      this.global.modalDismiss(data);
    }else {
      this.global.modalDismiss();
    }
  }
  openPreview(img){

  }

   // @ViewChild('pinch') pinchZoom: PinchZoomComponent;

  //  move() {
  //   console.log('test')
  //   // this.pinchZoom.setTransform({ x: -150, y: -10, scale: 2 });
  // }

 handlePinchZoomEvents(event:any){
	console.log(event);
}

}
