import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent implements OnInit {
  @Input() src:any;
  @Input() samplePaper:boolean;
  zoom_to:any = 1;
  // src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  showSecret = false;
  zoom=1;
  count : number = 0;
  constructor(private global:GlobalService) { }

  ngOnInit() {
    this.global.hideLoader();
  }

  zoom_in() {
    this.zoom_to = this.zoom_to + 0.25;
  }

  zoom_out() {
    if (this.zoom_to > 1) {
       this.zoom_to = this.zoom_to - 0.25;
    }
  }
   
  dobleTab(){
    this.count++;
setTimeout(() => {
  if (this.count == 1) {
    this.count = 0;
  }if(this.count > 1){
    this.count = 0;
    (this.zoom_to == 1) ? this.zoom_to = 1.50 : this.zoom_to = 1;
  }
}, 250);
  }

  cancel(data?){
    if(data){
      this.global.modalDismiss(data);
    }else {
      this.global.modalDismiss();
    }
  }

}
