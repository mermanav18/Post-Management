import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http/http.service';
import { PopupService } from '../services/popup/popup.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  test = 'hello';
  postDetails : any = [];
  comments : any = [];
  postTitle : string = "";
  postBody : string = "";
  onEdit : boolean  = false;
  totalComments : any;

  constructor(private activatedRoutes:ActivatedRoute, private httpService : HttpService, 
      private popupService : PopupService) { }

  ngOnInit(): void {
    let postId = this.activatedRoutes.snapshot.queryParamMap.get("postId");  
    // const botIdParam =  this.activatedRoute.snapshot.queryParamMap.get('botId');
    this.getPostData(postId);
  }

  getPostData(postId : any){
    
    this.postDetails =localStorage.getItem("postData");
    if(this.postDetails){
      this.postDetails = JSON.parse(this.postDetails);
    }else{
      this.httpService.getPostDetails(postId).subscribe((res:any) =>{
        this.postDetails = res;
        console.log('details',res);
      });
    }
    this.postTitle = JSON.stringify(this.postDetails.title);
    this.postBody = JSON.stringify(this.postDetails.body);
    this.httpService.getPostComments(postId).subscribe((res:any) =>{
      this.comments = res;
      console.log('comments',res);
    })
  }

  editPost(){
    this.httpService.editPostData(this.postDetails.id,{...this.postDetails,title:this.postTitle,body:this.postBody}).subscribe(res=>{
      console.log('res',res);
      if(res){
        this.onEdit = false;
        this.popupService.showToast('success','Post Updated Successfully!');
      }
    })
  }

  resetForm(){
    this.postTitle = JSON.stringify(this.postDetails.title);
    this.postBody = JSON.stringify(this.postDetails.body);
  }
}
