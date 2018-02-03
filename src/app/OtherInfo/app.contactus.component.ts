import { Component } from '@angular/core';

import{} from 'ionic-angular';
declare var window;

@Component({
  selector: 'contactus',
  templateUrl: './contactus.html',
  styles: [`

  `]
})
export class ContactUs {
  devHeight;
  pageTitle="Contact Us"
    constructor(){

    }

    
 register(){

 }
ngOnInit(){
    this.onOrientationChange();
  }

  onOrientationChange() {
    this.devHeight = (window.innerHeight - 75).toString() + "px";
    var self = this;
    //window.removeEventListener("orientationchange", self.changeDivHeight, false);
    window.addEventListener("orientationchange", self.changeDivHeight, true);

  }

  changeDivHeight() {
    this.devHeight = (window.innerHeight - 75).toString() + "px";
  }

}