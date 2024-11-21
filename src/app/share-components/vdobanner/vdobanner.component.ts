import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthUidService } from 'src/app/provider/authUid/auth-uid.service';
import { CommonService } from 'src/app/services/common/common.service';
import { VdobannerService } from 'src/app/services/vdobanner/vdobanner.service';

@Component({
  selector: 'app-vdobanner',
  templateUrl: './vdobanner.component.html',
  styleUrls: ['./vdobanner.component.scss'],
})
export class VdobannerComponent implements OnInit {
 
  isVdo:boolean = false;
  vdoPlaylistApiData:any[]=[];
  freeAccess:boolean = false;
//   vdoPlaylistApiData1:any = [
//     {
//       "userId": 1,
//       "id": 1,
//       "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//       "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
//       "link":"zC7B81ZtZV4"
//     },
//     {
//       "userId": 1,
//       "id": 2,
//       "title": "qui est esse",
//       "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
//       "link":"C5Eb8nNcA_s"
//     },
//     {
//       "userId": 1,
//       "id": 3,
//       "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//       "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
//       "link":"C5Eb8nNcA_s"
//     },
//     {
//       "userId": 1,
//       "id": 4,
//       "title": "eum et est occaecati",
//       "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
//       "link":"C5Eb8nNcA_s"
//     },
//     {
//       "userId": 1,
//       "id": 5,
//       "title": "nesciunt quas odio",
//       "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
//       "link":"C5Eb8nNcA_s"
//     }
// ]

// vdoPlaylistApiData:any[]=[];
// @Input() vdoPlaylistApiData:any[];
@Output() openYoutube: EventEmitter<any> = new EventEmitter();
  constructor(private vdoBannnerService: VdobannerService, private authToken:AuthUidService,
    private commonService:CommonService) { }

  ngOnInit() {
    this.vdoUrlApi();
  }


  playVdo(id){
    this.openYoutube.emit(id);
  }

  async vdoUrlApi(){
    const tokenDAta = await this.commonService.getStorage('token');
    const tokens = JSON.parse(tokenDAta.value);
    this.authToken.getUid(tokens);
    const jwt:any = await this.commonService.jwtToken();
    this.freeAccess = jwt.payload.user.freeAccess;
    const data ={"class_id": jwt.payload.user.class_id};
    this.freeAccess ? this.freeVdo() : this.courseVdo(data);
  }


  courseVdo(data){
    this.vdoBannnerService.vdoUrlApi(data).subscribe(res=> {
      console.log('result of api Vdo',res);
      if(res.success == true){
        this.vdoPlaylistApiData=res.data;
        (this.vdoPlaylistApiData.length >= 1) ? this.isVdo = false : this.isVdo = true;
        console.log(this.isVdo);
      }
    },
    (err)=>{
      console.log('error of data',err);
    })
  }

  freeVdo(){
    this.vdoBannnerService.freeVideo().subscribe(res=> {
      console.log('result of api Vdo',res);
      if(res.success == true){
        this.vdoPlaylistApiData=res.list;
        (this.vdoPlaylistApiData.length >= 1) ? this.isVdo = false : this.isVdo = true;
        console.log(this.isVdo);
      }
    },
    (err)=>{
      console.log('error of data',err);
    })
  }

}
