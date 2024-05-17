import { Injectable } from '@angular/core';
import * as featureConfig from '../../share-components/config/api-config.page'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SessionService {


  constructor(private http: HttpClient) { }
  checkSession(): Observable<any>{
    return this.http.get<any>(`${featureConfig.sessionCheck}`);
   }

}
