import { HostListener } from "@angular/core";
import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private el:ElementRef) { }

  @HostListener('click')

  nextFun(){
   let elm = this.el.nativeElement.parentElement.parentElement.children[0];
   var item = elm.getElementsByClassName('item');
   elm.append(item[0]);
   //console.log(item)
  }

}
