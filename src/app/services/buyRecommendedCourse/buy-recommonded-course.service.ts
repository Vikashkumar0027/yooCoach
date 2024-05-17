import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyRecommondedCourseService {

  private _premiumCourseList = new BehaviorSubject<any>(null);

  get premiumCourseLists(){
    return this._premiumCourseList.asObservable();
  }
  

  async premiumCourses(val) {
  //  console.log('user detail data',val)
     this._premiumCourseList.next(val);
  }

  constructor(private http:HttpClient) { }

  buyCourseAdd(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.addPrimumCourse, data);
   }

  getPrimiumTopic(data: any): Observable<any>{
    return this.http.post<any>(featureConfig.primumCourseChapter, data);
   }

   recommondedCourselisting(): Observable<any>{
    return this.http.get<any>(featureConfig.primumCourseList);
   }


}
