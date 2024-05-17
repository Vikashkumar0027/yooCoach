import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page';
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  getData(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.otp, data);
   }

}
