import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page'

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  getAttendance(): Observable<any>{
    return this.http.get<any>(featureConfig.attendanceGet);
   }

}
