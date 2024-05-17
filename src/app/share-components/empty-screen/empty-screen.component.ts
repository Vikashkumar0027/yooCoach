import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-empty-screen',
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss'],
})
export class EmptyScreenComponent implements OnInit {
@Input() model: any;
@Output() checknet: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  tryNet(){
    this.checknet.emit();
  }

}
