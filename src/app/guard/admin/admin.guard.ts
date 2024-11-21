import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  constructor(private commonService:CommonService,
    private router: Router
  ){}
  async canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {
    // return true;
    const token= await this.commonService.getStorage('admiTkns');
    const id = JSON.parse(token.value);
  try {
    if(id){
      // this.authService.getUid(id);
      return true;
    }
    else{
      // this.authService.getUid(null);
      this.router.navigateByUrl('/home');
      return false;
    }
  } catch (e) {
    console.log(e);
  }
  }
}
