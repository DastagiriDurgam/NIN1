import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { RecipeComponent } from './app.recipe.component'
// import { GetRecipeComponent } from './app.getrecipe.component'
import { DBService } from '../Services/dbservice'
import { EventService } from '../Services/eventservice'
declare var window;


@Component({
  selector: 'know-recipe',
  templateUrl: './knowrecipe.html',
  styles: [` 
  `]
})
export class KnowRecipeValuesComponent {
  devHeight;
  selectedRecipies: any[] = [];
  localDB: any;
  currentRecipe: any;
  displayValues: any = { columns: [], values: {} }
  pageTitle = "Recipe Values";
  totalvaluestodisplay: any = {};
  itemNames: any = { "protein": "Protein(g)", "total_fat": "Fat(g)", "total_dietary_fibre": "Fibre(g)", "carbohydrate": "Carbohydrate(g)", "energy_joules": "Energy (Kcal)", "riboflavin_b2": "Vitamin B2(mg)", "total_b6": "Vitamin B6(mg)", "total_folate_b9": "Vitamin B9(µg)", "total_ascorbic_acid": "Vitamin C(mg)", "retinol": "Vitamin A(µg)", "total_carotenoids": "Carotenoids(µg)", "ergocalciferol_d2": "Vitamin D2(µg)", "cholecalciferol_d3": "Vitamin D3(µg)", "vitamin_25_hydroxy_D3": "Active Vitamin D3(µg)", "Iron_fe": "Iron(mg)", "Zinc_zn": "Zinc(mg)", "Potassium_k": "Potassium(mg)", "sodium_na": "Sodium (mg)", "calcium_ca": "Calcium (mg)", "total_saturated_fatty_acids_TFSA": "Saturated Fat(g)", "b12": "Vitamin B12" };

  constructor(private navController: NavController, private navParams: NavParams, private dbservice: DBService, private eventservice: EventService) {

  }

  getSelectedRecipies() {
    // alert(JSON.stringify(this.currentRecipe.item));

    let getRecipiesQuery = "SELECT protein,  total_fat,  total_dietary_fibre,  carbohydrate ,  energy_joules ,  riboflavin_b2 ,  total_b6,  total_folate_b9 ,  total_ascorbic_acid  ,  retinol ,  total_carotenoids ,  ergocalciferol_d2  ,  cholecalciferol_d3  ,  vitamin_25_hydroxy_D3  ,  Iron_fe  ,  Zinc_zn  ,  Potassium_k ,  sodium_na  ,  calcium_ca ,  total_saturated_fatty_acids_TFSA ,  b12   FROM recipes_nut_value_for_100_grams where uid_recipes=" + this.currentRecipe.item[2];
    var self = this;
    this.dbservice.getDataFromTable('recipes_nut_value_for_100_grams', 'recipes.sql', getRecipiesQuery, function (a, b) {
      self.displayValues.values = b;
    });

    this.eventservice.getMessage().subscribe((data) => {

      if (data.name == 'recipes_nut_value_for_100_grams') {
        // this.displayValues.values = data.value.values;
        this.displayValues.columns = data.value.columns;
      }

    });


  }

  adjustFractions(value): any {
    return eval(value.toFixed(2));
  }

  ngOnInit() {

    this.selectedRecipies = this.navParams.get('selectedRecipies')
    this.currentRecipe = this.selectedRecipies[0];

    this.getSelectedRecipies();
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


  getTotal() {
    //     let totalValues = [];
    // alert(JSON.stringify(this.selectedRecipies)); 
    //     if (this.selectedRecipies.length) {
    //       this.totalvaluestodisplay.columns = Array.from(this.selectedRecipies[0].columns);
    //       //  this.totalvaluestodisplay.columns.splice(0, 5);
    //     }
    //     let tempLoopArray: any = Array.from(this.selectedRecipies);
    //     // alert(JSON.stringify(this.selectedRawfoods));
    //     let length = tempLoopArray.length;

    //     for (var i = 0; i < length; i++) { 
    //       //  tempLoopArray[i].item.splice(0,5);
    //       tempLoopArray[i].item.forEach((element, index) => {


    //         console.log(JSON.stringify(index));
    //         if (totalValues.length > index) {
    //           if (index > 4) {
    //             totalValues[index] += element;
    //           } 

    //         } else {
    //           totalValues[index] = element;
    //         }


    //       });




    //     }
    //     alert(JSON.stringify(totalValues));
    //     this.totalvaluestodisplay.item = totalValues;
    //     this.totalvaluestodisplay.value = 100;
    this.getNutrientValues(this.selectedRecipies[0]);

  }


  getNutrientValues(recipe) {
    this.currentRecipe = recipe;

    this.getSelectedRecipies();


  }

  getRecipeValues() {
    this.navController.push(RecipeComponent);
  }
  restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }

}