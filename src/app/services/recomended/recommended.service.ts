import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page'

@Injectable({
  providedIn: 'root'
})
export class RecommendedService {

  constructor(private http: HttpClient) { }

  recommendedCourseSmall(): Observable<any>{
    return this.http.get<any>(featureConfig.recommendationCourceSmall);
   }

  recommendedCourseBig(id): Observable<any>{
    return this.http.get<any>(`${featureConfig.recommendationCourceBig}/${id}`);
   }

}

