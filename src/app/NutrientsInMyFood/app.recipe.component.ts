import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { KnowRecipeValuesComponent } from './app.knowrecipeValues.component';
// import { DBService } from '../Services/dbservice'
// import { EventService } from '../Services/eventservice';
import { Storage } from '@ionic/storage';
declare var window;


@Component({
  selector: 'recipe',
  templateUrl: './recipe.html',
  styles: [`

  `]
})
export class RecipeComponent {
  devHeight;
  totalRecipies: any[];
  filteredRecipies: any[] = [];
  selectedRecipies: any[] = [];
  isDisplayRecipeList: boolean = false;
  searchStr: string = "";
  pageTitle = "Recipe";
  currentitem: any = [];
  // storage = new Storage();
  constructor(private navController: NavController, private storage:Storage) {

  }



  ngOnInit() {

    this.storage.get('totalRecipies').then((data1) => {
      // alert(data1);
      this.totalRecipies = data1;

    });

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



  getFilteredRecipies(ele) {
    var filterStr = ele;

    if (filterStr.length > 0) {
      this.filteredRecipies = this.totalRecipies.filter((item) => {
        return (item[0].toLowerCase().includes(filterStr.toLowerCase())) 
      });
      this.isDisplayRecipeList = true;
      // alert(JSON.stringify(this.filteredRecipies));
    } else {
      this.isDisplayRecipeList = false;
    }

  }

  clearRecipeValues() {
    this.selectedRecipies = [];
  }

  addRecipe(recipe, event) {

    if (event.value.length != 0) {
      let filterVlues = this.selectedRecipies.filter((item) => (item.item[0] == this.currentitem[0]));
      this.isDisplayRecipeList = false;
      if (filterVlues.length < 1) {
        this.selectedRecipies.push({ item: this.currentitem, value: 100 });

      }
      event.value = "";
    } else {
      alert("Select item to add");
    }
  }

  getRecipeValues() {
    this.navController.push(KnowRecipeValuesComponent, { selectedRecipies: this.selectedRecipies });
  }

  setInput(input, item) {
    this.isDisplayRecipeList = false;
    input.value = item[0];
    this.currentitem = Array.from(item);
  }

  restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }

}