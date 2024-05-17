import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getdata(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.profileApi, data);
   }

   updateData(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.updateProfile, data);
   }

   updateFressUser(data: any, id:any): Observable<any>{
    return this.http.patch<any>(`${featureConfig.patchDetailFreeUser}/${id}`, data);
   }

   getfreeUserDetail(): Observable<any>{
    return this.http.get<any>(featureConfig.getDetailFreeUser);
   }

  
}
