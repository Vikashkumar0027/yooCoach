import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page'

@Injectable({
  providedIn: 'root'
})
export class VdobannerService {

  constructor(private http:HttpClient) { }

  vdoUrlApi(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.vdoUrl, data);
   }

   freeVideo(): Observable<any>{
    return this.http.get<any>(`${featureConfig.freeVideo}`);
   }
   
}
