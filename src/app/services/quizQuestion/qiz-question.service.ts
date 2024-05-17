import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page';

@Injectable({
  providedIn: 'root'
})
export class QizQuestionService {

  constructor(private http: HttpClient) { }

  // getData(): Observable<any>{
  //   return this.http.get<any>(featureConfig.qizliatApi);
  //  }
  
   questionList(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.quizQuestionList, data);
   }

   examSubmit(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.examSubmit, data);
   }
   
  }