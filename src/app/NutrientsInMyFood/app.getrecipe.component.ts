import { Component } from '@angular/core';

import{NavController} from 'ionic-angular';
import {RecipeComponent} from './app.recipe.component'
declare var window;


@Component({
  selector: 'get-recipe',
  templateUrl: './getrecipe.html',
  styles: [`

  `]
})
export class GetRecipeComponent {
  devHeight;
    gender: string="";
  perticulars:any="";
  perticularsArray:any = {Man:['Sedentary work', 'Moderate work', 'Heavy work'], Woman:['Sedentary work', 'Moderate work', 'Heavy work', 'Pregnant woman', 'Lactation 0-6 months', 'Lactation 6-12 months']};
  pageTitle:any = 'RDA For Indians';
 constructor(private navController:NavController){

 }
    getRecipeValues(){
      this.navController.push(RecipeComponent);
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