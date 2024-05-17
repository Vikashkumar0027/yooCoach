import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page'

@Injectable({
  providedIn: 'root'
})
export class SubjectDetailService {

  constructor(private http: HttpClient) {

   }

   getData(): Observable<any>{
    return this.http.get<any>(featureConfig.subjectDetail);
   }

   selectedData(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.subjectCheckboxData, data);
   }

   getSubject(data):Observable<any>{
    return this.http.get<any>(`${featureConfig.subject}/${data}`);
   }

   accordinanData(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.couseAccordian, data);
   }

   

}
