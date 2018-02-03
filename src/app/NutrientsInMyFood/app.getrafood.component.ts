import { Component } from '@angular/core';

import{NavController} from 'ionic-angular';
import {RawFoodComponent} from './app.rafood.component'
declare var window;


@Component({
  selector: 'get-rawfood',
  templateUrl: './getrawfood.html',
  styles: [`

  `]
})
export class GetRawFoodComponent {
  devHeight;
    constructor(private navController:NavController){

    }
    getRawfoodValues(){
      this.navController.push(RawFoodComponent);
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

 restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }
}