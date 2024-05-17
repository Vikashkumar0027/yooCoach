import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page'


@Injectable({
  providedIn: 'root'
})
export class BannerService {
  
  constructor(private http: HttpClient) { }
  getBanner(): Observable<any>{
    return this.http.get<any>(featureConfig.banner);
   }
   getImage(): Observable<any>{
    return this.http.get<any>(`${featureConfig.getprofile}`);
    // return this.http.get<any>(`${featureConfig.getprofile}/${data}`);
   }
   
}
