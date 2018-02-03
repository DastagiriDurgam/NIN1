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
  selected_nutrient: any = "0";
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
    this.getNutrientFromDB();
  }

  ngOnInit() {
    // this.storage.get('languagesList').then((data1) => {
    //   this.languagesList = data1;
    //   // console.log(JSON.stringify(data1));
    // });


    this.getLanguagesList();
    this.onOrientationChange();
  }

onChangeOfLanguge(){
  
}


  getLanguagesList() {
    let getLanguagesQuery = "select abbreviation, languages from language_codes where abbreviation!='C.' AND abbreviation!='Sci.'";
    // alert(JSON.stringify(getLanguagesQuery));
    this.dbservice.getDataFromTable('rawfoodifctreviced2', 'recipes.sql', getLanguagesQuery);

    this.eventservice.getMessage().subscribe((data) => {

      if (data.name == 'rawfoodifctreviced2') {
        this.languagesList = data.value.values;
        // alert(JSON.stringify(data.value));
      }

    });

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




  getRawCategoriesFromDB() {
    let createQuery = "CREATE TABLE IF NOT EXISTS `raw_categories` (   `category` varchar(26) DEFAULT NULL,   `category id` int(2) NOT NULL,   `displayname` varchar(250) DEFAULT NULL )";

    let insertQuery = "INSERT INTO `raw_categories` (`category`, `category id`, `displayname`) VALUES ('Cereal_grains_and_products', 1, 'Cereals,Grains & Products'), ('Pulses_and_legumes', 2, 'Pulses & Legumes'), ('Leafy_vegetables', 3, 'Leafy Vegetables'), ('Other_vegetables', 4, 'Other Vegetables'), ('Fruits', 5, 'Fruits'), ('Roots_and_tubers', 6, 'Roots & Tubers'), ('Condiments_and_spices', 7, 'Condiments & Spices'), ('nuts_and_oil_seeds', 8, 'Nuts & Oil Seeds'), ('Sugars', 9, 'Sugars'), ('Mushrooms', 10, 'Mushrooms'), ('Beverages_alcoholic', 11, 'Beverages Alcoholic'), ('Beverages_non_alcoholic', 12, 'Beverages Non-Alcoholic'), ('Milk_and_milk_products', 13, 'Milk & Milk Products'), ('Meat_and_poultry', 14, 'Meat & Poultry'), ('Fishes_and_other_sea_foods', 15, 'Fishes & Other Sea Foods'), ('Fats_and_edible_oils', 16, 'Fats & Edible Oils')";

    let getRecipiesQuery = "select * from raw_categories";

    this.dbservice.createTable('recipes.sql', createQuery);

    this.dbservice.insertValuesToTable('recipes.sql', insertQuery, `raw_categories`);

    this.dbservice.getDataFromTable('raw_categories', 'recipes.sql', getRecipiesQuery);

    this.eventservice.getMessage().subscribe((data) => {
      // alert(JSON.stringify(data.value));
      if (data.name == 'raw_categories') {
        // alert(JSON.stringify(data.value.values))
        this.plantanimalDetails = data.value.values;
      }

    });

  }





  getNutrientFromDB() {
    let createQuery = "CREATE TABLE IF NOT EXISTS `nutrients` (   `id` int(11) NOT NULL,   `name` varchar(30) NOT NULL,   `other name` varchar(250) DEFAULT NULL )";

    let insertQuery = "INSERT INTO `nutrients` (`id`, `name`, `other name`) VALUES (1, 'Calcium(mg)', 'calcium_ca'), (2, 'Carbohydrate(g)', '	carbohydrate'), (3, 'Protein(g)', '	protein'), (4, 'Fat(g)', 'total_fat'), (5, 'Vitamin B6(mg)', 'total_b6'), (6, 'Vitamin B9(µg)', 'total_folate_b9'), (7, 'Vitamin C(mg)', 'total_ascorbic_acid'), (8, 'Vitamin A(µg)', 'retinol'), (9, 'Carotenoids(µg)', 'total_carotenoids'), (10, 'Vitamin D2(µg)', 'ergocalciferol_d2'), (11, 'Vitamin D3(µg)', 'cholecalciferol_d3'), (12, 'Active Vitamin D3(µg)', 'vitamin_25_hydroxy_D3'), (13, 'Iron(mg)', 'Iron_fe'), (14, 'Zinc(mg)', 'Zinc_zn'), (15, 'Potassium(mg)', 'Potassium_k'), (16, 'Sodium(mg)', 'sodium_na'), (17, 'Saturated Fat(mg)', 'total_saturated_fatty_acids_TFSA'), (18, 'Fibre(g)', 'total_dietary_fibre'), (19, 'Energy(cal)', 'energy_joules'), (20, 'Vitamin B2(mg)', 'riboflavin_b2 ')";

    let getRecipiesQuery = "select * from nutrients";

    this.dbservice.createTable('recipes.sql', createQuery);


    this.dbservice.insertValuesToTable('recipes.sql', insertQuery, `nutrients`);



    this.dbservice.getDataFromTable('nutrients', 'recipes.sql', getRecipiesQuery);

    this.eventservice.getMessage().subscribe((data) => {
      // alert(JSON.stringify(data.value));
      if (data.name == 'nutrients') {
        this.nutrientList = data.value.values;

      }

    });

  }


  getRawfoodifctReviced(language) {
    let getRecipiesQuery = "select * from raw_foods_ifct_nvif";

    this.dbservice.getDataFromTable('rawfoodifctreviced1', 'recipes.sql', getRecipiesQuery);

    this.eventservice.getMessage().subscribe((data) => {
      // alert(JSON.stringify(data.value));
      if (data.name == 'rawfoodifctreviced1') {
        this.nutrientList = data.value.values;

      }

    });


  }




  submitAction() {
    this.errorMessage = this.validateForms([{ modelName: this.selected_nutrient, defaultvalue: '0', modelTitle: 'Nutrient', errorTitle: 'Nutrient' }, { modelName: this.perticulars, defaultvalue: '', modelTitle: 'Particulars', errorTitle: 'Particulars' }]);

    if (this.errorMessage.isValid) {
      this.navController.push(SearchFoodByNutrientDetails, { fbyndetails: { nutrient: this.selected_nutrient.split(','), category: this.perticulars, isascending: this.ascrdesc, language: this.selected_language } });
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