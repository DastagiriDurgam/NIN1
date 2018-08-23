import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { KnowRecipeValuesComponent } from './app.knowrecipeValues.component';
// import { DBService } from '../Services/dbservice'
// import { EventService } from '../Services/eventservice';
import { Storage } from '@ionic/storage';
import { DBService } from '../Services/dbservice';
import { EventService } from '../Services/eventservice';
declare var window;


@Component({
  selector: 'recipe',
  templateUrl: './recipe.html',
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
  constructor(private navController: NavController, 
    private eventservice: EventService,
    private storage:Storage,private dbservice:DBService) {

  }



  ngOnInit() {
    let getRecipiesQuery = "SELECT uid_recipes, Itemname, one_serving_wt_g FROM recipes";

    this.dbservice.getDataFromTable('getrecipies', 'recipes.sql', getRecipiesQuery, function (a, b) {
      // var c = Object.values(b);
      // const data = b;
      console.log('b',b);
     
    });
    this.eventservice.getMessage().subscribe((data) => {

      if (data.name == 'getrecipies') {

        this.storage.set('totalRecipies', Array.from(data.value.values));
        // alert(JSON.stringify(data.value.values))
         this.totalRecipies = Array.from(data.value.values);

      }

    });
    this.storage.get('totalRecipies').then((data1) => {
      // alert(data1);
     // this.totalRecipies = data1;

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
    console.log('this.totalRecipies', this.totalRecipies);

    if (filterStr.length > 0) {
      this.filteredRecipies = this.totalRecipies.filter((item) => {
        return (item[1].toLowerCase().includes(filterStr.toLowerCase())) 
      });

      this.isDisplayRecipeList = true;
      // alert(JSON.stringify(this.totalRecipies));
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
    input.value = item[1];
    this.currentitem = Array.from(item);
  }

  restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }

}