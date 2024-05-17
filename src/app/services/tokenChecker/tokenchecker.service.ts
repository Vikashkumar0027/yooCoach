import { Injectable } from '@angular/core';
import * as featureConfig from '../../share-components/config/api-config.page'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokencheckerService {

  constructor(private http: HttpClient) { }
  
  checkToken(id): Observable<any>{
    return this.http.get<any>(`${featureConfig.checkToken}/${id}`);
   }

}
