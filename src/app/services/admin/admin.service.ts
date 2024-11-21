import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getStudent(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.studentList, data);
   }
   submitAttnds(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.submitAttnds, data);
   }
   
}
