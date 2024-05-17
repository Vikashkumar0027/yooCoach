import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page'


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }
  
 
   getPayment(data: any): Observable<any>{
    return this.http.get<any>(`${featureConfig.payment}/${data}`);
   }

   totalPayment(): Observable<any>{
    return this.http.get<any>(`${featureConfig.courceFee}`);
   }
}