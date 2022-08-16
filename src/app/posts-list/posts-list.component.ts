import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http/http.service';
import Swal from 'sweetalert2';
import { PopupService } from '../services/popup/popup.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  postListData: any = [];

  constructor(private httpService: HttpService, private popupService : PopupService) { }

  ngOnInit(): void {
    this.httpService.getData().subscribe(res => {
      this.postListData = res;
    });
  }

  deletePost(id : any) {
    console.log('id',id);
    this.popupService.showDelPopup().then((confirmDelete) => {
      if(confirmDelete.isConfirmed && !confirmDelete.isDismissed){
        this.httpService.deletePost(id).subscribe(res =>{
          if(res){
            this.postListData = this.postListData.filter((item:any) => item.id !== id);
            this.popupService.showToast('success', 'Post Deleted Successfully!');
          }
        })
      }
    })
  }
  addtoLocalStorage(postData:any){
    localStorage.setItem("postData",JSON.stringify(postData));
    console.log(JSON.stringify(postData));
    
  }

}
