import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any>{
    return this.http.get<any>(featureConfig.notification);
   }

   seenNotification(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.notificationSeen, data);
   }

}
