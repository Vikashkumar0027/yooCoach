import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(private commonService:CommonService,
    private router: Router){}
    async canLoad(
      route: Route,
      segments: UrlSegment[]): Promise<boolean> {
    const token= await this.commonService.getStorage('gurukultkns');
    const id = JSON.parse(token.value);
    try {
      if(id){
        this.router.navigateByUrl('/tabs', {replaceUrl: true});
        return false;
      }
      else{
        return true;
      }
    } catch (e){
      console.log(e);
      return true;
    }
  }
}