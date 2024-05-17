import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page'

@Injectable({
  providedIn: 'root'
})
export class QuizlistService {

  constructor(private http: HttpClient) { }
  getSubject(): Observable<any>{
    return this.http.get<any>(featureConfig.studentSubject);
   }
   
   questionList(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.questionSet, data);
   }

   scroreCard(data): Observable<any>{
    return this.http.get<any>(`${featureConfig.scroreCard}/${data}`);
   }
}
