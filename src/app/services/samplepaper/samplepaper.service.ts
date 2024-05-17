import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
// import { BehaviorSubject } from 'rxjs';
import * as featureConfig from '../../share-components/config/api-config.page';

@Injectable({
  providedIn: 'root'
})
export class SamplepaperService {
  private _samplePaper = new BehaviorSubject<any>([]);

  get samplePepers(){
    return this._samplePaper.asObservable();
  }

  constructor(private http: HttpClient) { }

  getSamplePaper(): Observable<any>{
    return this.http.get<any>(featureConfig.samplePaper);
   }

   async getUserData(val) {
    //  console.log('user detail data',val)
       this._samplePaper.next(val);
    }
   
}
