import { Component } from '@angular/core';

import{NavController} from 'ionic-angular';
import {KnowRecipeValuesComponent} from './app.knowrecipeValues.component'
declare var window;


@Component({
  selector: 'createrecipe',
  templateUrl: './createrecipe.html',
  styles: [`

  `]
})
export class CreateRecipeComponent {
  devHeight;
  pageTitle="Create Recipe";
    constructor(private navController:NavController){

    }
    getRecipeValues(){
    this.navController.push(KnowRecipeValuesComponent);
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