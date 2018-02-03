import { Component } from '@angular/core';

import{NavController} from 'ionic-angular';
declare var window;

@Component({
  selector: 'source',
  templateUrl: './source.html',
  styles: [`

  `]
})
export class Source {
  devHeight;
  pageTitle="SOURCE OF DATABASES"
    constructor(private navController:NavController){

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