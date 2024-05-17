import { Component, ElementRef,OnChanges, Input, ViewChild,OnInit,SimpleChanges } from '@angular/core';
import { MathJsxService } from 'src/app/services/math-jax/math-jsx.service';

@Component({
  selector: 'app-mathjx',
  templateUrl: './mathjx.component.html',
  styleUrls: ['./mathjx.component.scss'],
})
export class MathjxComponent implements OnInit,OnChanges {

 
  @ViewChild('mathParagraph') paragraphElement: any;
  @Input() mathString!: string;

  constructor(private mathJaxService: MathJsxService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.mathString && !changes.mathString.firstChange) {
      this.renderMath();
    }
  }
  ngOnInit() {
    // console.log('Component initialized');
    this.renderMath();
  }

  private renderMath() {
    // console.log('Rendering math');
    this.mathJaxService.getMathJaxLoadedPromise().then(() => {
      console.log('MathJax loaded, rendering math');
      
      // Insert the input string
      this.paragraphElement.nativeElement.innerHTML = this.mathString;
      
      // Render the Latex
      this.mathJaxService.render();
    });
  }

}
