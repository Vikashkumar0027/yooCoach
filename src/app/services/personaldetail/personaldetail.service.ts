import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page';
@Injectable({
  providedIn: 'root'
})
export class PersonaldetailService {
// url= 'http://3.16.181.157:3000/admin/test_api';
  constructor(private http: HttpClient) { }
  updateProfileWithotimg
  persionalDetails(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.personalDetail, data);
   }

   persionalDetailsWithoutPhoto(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.updateProfileWithotimg, data);
   }
    // getUrl(){
    //   return this.http.get<any>(this.url);
    // }
}
