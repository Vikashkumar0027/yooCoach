import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {

  attendaceData:any;
  totalAttendance:any;
  constructor(
    private attendanceService:AttendanceService,
    private global:GlobalService
    ) { }

  ngOnInit() {
    this. getAttendanceList();
  }

  getAttendanceList(){
    this.global.showLoader();
    this.attendanceService.getAttendance().subscribe(res=>{
      this.global.hideLoader();
      if(res.success){
     this.attendaceData=res.count;
     this.totalAttendance=res.totalCount;
      }
    },err=>{
      this.global.hideLoader();
      this.global.errorToast('Http error');
      console.log(err);
    });
  }

}
