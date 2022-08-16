import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTrim]'
})
export class TrimDirective {

  constructor(private elr:ElementRef){
    
  }
  ngAfterViewInit(){
    let lengthOfComment = this.elr.nativeElement.innerText.length;
    if(lengthOfComment>50){
      this.elr.nativeElement.innerText = this.elr.nativeElement.innerText.slice(0,50) +"...";
    }
    
  }
}
