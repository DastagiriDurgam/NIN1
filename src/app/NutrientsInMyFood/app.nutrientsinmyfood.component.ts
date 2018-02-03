import { Component } from '@angular/core';

import {RawFoodComponent} from './app.rafood.component'
import {RecipeComponent} from './app.recipe.component'
// import { GetRawFoodComponent } from './app.getrafood.component'
// import { GetRecipeComponent } from './app.getrecipe.component'
import { CreateRecipeComponent } from './app.createrecipe'
import { NavController } from 'ionic-angular';
declare var window;


@Component({
  selector: 'nutrients-in-myfood',
  templateUrl: './nutrientsinmyfood.html',
  styles: [`

  `]
})
export class NutrientsInMyFoodComponent {
  devHeight;
  color:any = '#f9a938';
  pageTitle ="Nutrients In My Food";
  constructor(private navControlleer: NavController) {

  }
  navigate(navStr) {
    if(navStr==='rawfood'){
       this.navControlleer.push(RawFoodComponent);
    }else if(navStr==='recipe'){
       this.navControlleer.push(RecipeComponent);
    }else if(navStr==='createrecipe'){
       this.navControlleer.push(CreateRecipeComponent);
    }
   
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