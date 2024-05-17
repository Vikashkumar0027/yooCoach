import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-answer-checker',
  templateUrl: './answer-checker.component.html',
  styleUrls: ['./answer-checker.component.scss'],
})
export class AnswerCheckerComponent implements OnInit {
@Input() questions:any;
  constructor(private global:GlobalService) { }
  values="show";
  ngOnInit() {}

  color(param){
    if(param?.correct && param?.selected == "show"){
      return 'optiontrue';
    }else if(!param?.correct && param?.selected == "show"){
      return 'optionfalse';
    }else if(param?.correct && param?.selected !== "show"){
      return 'optiontrue';
    }else{
      return 'option';
    }
  }

  cancel(data?){
    if(data){
      this.global.modalDismiss(data);
    }else {
      this.global.modalDismiss();
    }
  }

  question = 'What is the capital of France?';
  options = ['Paris', 'Berlin', 'Madrid', 'Rome'];
  correctOption = 'Paris';
  selectedOption: string = null;

  isCorrect(): boolean {
    return this.selectedOption === this.correctOption;
  }

}
