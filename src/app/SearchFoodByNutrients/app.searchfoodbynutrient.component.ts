import { Component } from '@angular/core';

import { DBService } from '../Services/dbservice'
import { EventService } from '../Services/eventservice';
import { NavController } from 'ionic-angular';
import { SearchFoodByNutrientDetails } from './app.foodsbynutrivaluedetails.component'
// import { Storage } from '@ionic/storage'
declare var window;


@Component({
  selector: 'search-food-bynutrient',
  templateUrl: './searchfoodbynutrient.html',
  styles: [`

  `]
})
export class SearchFoodByNutrient {
  devHeight;
  nutrientList: any = [];
  languagesList: any = [];
  foodList: any = [];
  selected_nutrient: any;
  ascrdesc = false;
  perticulars = "";
  isDisplayfoodList: boolean = false;
  filteredFood: any = [];
  plantRanimal = 'plant';
  pageTitle = "Search Food By Nutrients";
  categories: any = [];
  errorMessage: any = [];
  selected_language = "EN";
  // storage = new Storage();
  plantanimalDetails = { plant: [{ name: "Beverages_alcoholic", title: "Beverages Alcoholic" }, { name: "Beverages_non_alcoholic", title: "Beverages Non Alcoholic" }, { name: "Cereal_grains_and_products", title: "Cereals,Grains & Products" }, { name: "Condiments_and_spices", title: "Condiments & Spices" }, { name: "Fats_and_edible_oils", title: "Fats & Edible Oils" }, { name: "Fruits", title: "Fruits" }, { name: "Leafy_vegetables", title: "Leafy Vegetables" }, { name: "Mushrooms", title: "Mushrooms" }, { name: "nuts_and_oil_seeds", title: "Nuts & Oil Seeds" }, { name: "Other_vegetables", title: "Other Vegetables" }, { name: "Pulses_and_legumes", title: "Pulses & Legumes" }, { name: "Roots_and_tubers", title: "Roots & Tubers" }, { name: "Sugars", title: "Sugars" }], animal: [{ name: "Fishes_and_other_sea_foods", title: "Fishes & Other Sea Foods" }, { name: "Meat_and_poultry", title: "Meat & Poultry" }, { name: "Milk_and_milk_products", title: "Milk & Milk Products" }] };

  perticularsArray: any = {};

  constructor(private dbservice: DBService, private eventservice: EventService, private navController: NavController) {

  }

  ngOnInit() {
    this.getNutrientFromDB();
    // this.storage.get('languagesList').then((data1) => {
    //   this.languagesList = data1;
    //   // console.log(JSON.stringify(data1));
    // });


    this.getLanguagesList();
    this.onOrientationChange();
  }

  onChangeOfLanguge() {

  }

  getLanguagesList() {
    let getLanguagesQuery = "select abbreviation, languages from language_codes where abbreviation!='C.' AND abbreviation!='Sci.'";
    // alert(JSON.stringify(getLanguagesQuery));
    this.dbservice.getDataFromTable2(getLanguagesQuery, false, true).then(res => {
      this.languagesList = res.values;
      alert(JSON.stringify(getLanguagesQuery));
    });

    // this.eventservice.getMessage().subscribe((data) => {

    //   if (data.name == 'rawfoodifctreviced2') {
    //     this.languagesList = data.value.values;

    //   }

    // });

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


getNutrientFromDB() {


    let getRecipiesQuery = "select * from nutrients";

    this.dbservice.getDataFromTable2(getRecipiesQuery, false, true).then(res => {
      this.nutrientList = res.values;
    })

  }


  submitAction() {

    this.errorMessage = this.validateForms([{ modelName: this.selected_nutrient, defaultvalue: '0', modelTitle: 'Nutrient', errorTitle: 'Nutrient' }, { modelName: this.perticulars, defaultvalue: '', modelTitle: 'Particulars', errorTitle: 'Particulars' }]);
    // alert(JSON.stringify(this.selected_nutrient ));
    if (this.errorMessage.isValid) {
      this.navController.push(SearchFoodByNutrientDetails, { fbyndetails: { nutrient: this.selected_nutrient, category: this.perticulars, isascending: this.ascrdesc, language: this.selected_language } });
    } else {
      let errors = "";
      for (var key in this.errorMessage) {
        if (this.errorMessage.hasOwnProperty(key)) {
          var element = this.errorMessage[key];
          if (key != 'isValid')
            errors += element + "\n";
        }
      }
      alert(errors)
    }

  }

  validateForms(validateFormsArray: any[]) {
    //validateFormsArray = [// {modelName:this.relation, defaultvalue:'0',modelTitle:'relation', errorTitle:'Relation'}];
    let errorMessages: any = {};
    for (var key in validateFormsArray) {
      if (validateFormsArray.hasOwnProperty(key)) {
        var element = validateFormsArray[key];
        if (element.modelName == element.defaultvalue) {
          errorMessages[element.modelTitle] = 'Please Enter ' + element.errorTitle;
        }
      }
    }
    errorMessages.isValid = !(Object.keys(errorMessages).length > 0);

    return errorMessages;
  }
  restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }
}