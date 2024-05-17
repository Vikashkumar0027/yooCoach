import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {
  }

  chatList(data): Observable<any>{
    return this.http.get<any>(`${featureConfig.chatlist}/${data}`);
   }

  chatSend(data: any): Observable<any>{
   return this.http.post<any>(featureConfig.sentChat, data);
  }

  liveClass(): Observable<any>{
    return this.http.get<any>(featureConfig.liveClass);
   }

  agoraLiveClass(): Observable<any>{
    return this.http.get<any>(featureConfig.agoraMeetingList);
   }

   zoomCreateSignature(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.zoomCreateSignature, data);
   }
 

}
