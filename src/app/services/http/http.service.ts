import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }
  private url : string = "https://jsonplaceholder.typicode.com/posts";

  getData(){
    return this.http.get(this.url);
  }

  deletePost(id :any){
    return this.http.delete(this.url+'/'+id);
  }

  getPostDetails(id : any){
    return this.http.get(this.url + '/' + id);
  }

  getPostComments(id:any){
    return this.http.get(this.url + '/' + id + '/comments');
  }

  editPostData(id:any, body:any){
    return this.http.put(this.url + '/' + id, body);
  }
}
