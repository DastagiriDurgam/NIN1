import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { KnowRawFoodValuesComponent } from './app.knowrawfoodValues.component'
import { DBService } from '../Services/dbservice'
import { EventService } from '../Services/eventservice';
import { Storage } from '@ionic/storage';
declare var window;



@Component({
  selector: 'rawfood',
  templateUrl: './rawfood.html',
  styles: [`

  `]
})
export class RawFoodComponent {
  devHeight;
  localDB: any;
  // storage = new Storage();
  categoryList: any[] = [];
  category: any = "";
  languagesList: any = [];
  selected_language: any = "";
  isDisplayRawfoodList: boolean = false;
  totalRawfoods: any[];
  selectedRawfoods: any[] = [];
  filteredRawfood: any[] = [];
  searchStr: string = "";
  columnNames: any[] = [];
  pageTitle = 'Raw Food';
  currentitem: any = [];
  constructor(private navController: NavController, private storage:Storage, private dbservice: DBService, private eventservice: EventService) {

  }



  getRawfoodValues() {
    if (this.selectedRawfoods.length > 0) {
      this.navController.push(KnowRawFoodValuesComponent, { selectedRawfoods: this.selectedRawfoods });
    } else {
      alert('Add atleast one raw food item to see values');
    }
  }
  getLanguagesList() {
    let getRecipiesQuery = "select languages, abbreviation from language_codes";

   this.dbservice.getDataFromTable('language_codes', 'recipes.sql', getRecipiesQuery);

   this.eventservice.getMessage().subscribe((data) => {
     if (data.name == 'language_codes') {
       this.languagesList = Array.from(data.value.values);
     
     }


   });


 }

  // getLanguagesList() {
  //   let getLanguagesQuery = "select  Distinct languages from raw_foods_ifct_nvif";
  //   // alert(JSON.stringify(getLanguagesQuery));
  //   this.dbservice.getDataFromTable('rawfoodifctreviced2', 'recipes.sql', getLanguagesQuery);

  //   this.eventservice.getMessage().subscribe((data) => {

  //     if (data.name == 'rawfoodifctreviced2') {
  //         this.languagesList = data.value.values;
  //       // alert(JSON.stringify(data.value));
  //     }

  //   });

  // }

  // getData() { 
  //   let createQuery = "CREATE TABLE IF NOT EXISTS `raw_categories` (   `category` varchar(26) DEFAULT NULL,   `category id` int(2) NOT NULL,   `displayname` varchar(250) DEFAULT NULL )";
  //   this.dbservice.createTable('recipes.sql', createQuery);

  //   let insertQuery = "INSERT INTO 'raw_categories' (`category`, `category id`, `displayname`) VALUES ('Cereal_grains_and_products', 1, 'Cereals,Grains & Products'), ('Pulses_and_legumes', 2, 'Pulses & Legumes'), ('Leafy_vegetables', 3, 'Leafy Vegetables'), ('Other_vegetables', 4, 'Other Vegetables'), ('Fruits', 5, 'Fruits'), ('Roots_and_tubers', 6, 'Roots & Tubers'), ('Condiments_and_spices', 7, 'Condiments & Spices'), ('nuts_and_oil_seeds', 8, 'Nuts & Oil Seeds'), ('Sugars', 9, 'Sugars'), ('Mushrooms', 10, 'Mushrooms'), ('Beverages_alcoholic', 11, 'Beverages Alcoholic'), ('Beverages_non_alcoholic', 12, 'Beverages Non-Alcoholic'), ('Milk_and_milk_products', 13, 'Milk & Milk Products'), ('Meat_and_poultry', 14, 'Meat & Poultry'), ('Fishes_and_other_sea_foods', 15, 'Fishes & Other Sea Foods'), ('Fats_and_edible_oils', 16, 'Fats & Edible Oils')";
  //   this.dbservice.insertValuesToTable('recipes.sql', insertQuery, 'raw_categories');

  //   let getRecipiesQuery = "select * from raw_categories";

  //   this.dbservice.getDataFromTable('raw_categories', 'recipes.sql', getRecipiesQuery);

  //   this.eventservice.getMessage().subscribe((data) => {
  //     if (data.name == 'raw_categories') {
  //       this.categoryList = Array.from(data.value.values);
  //       console.log(JSON.stringify(this.categoryList));
  //     }




  //   });

  //   //  setTimeout(() => {
  //   //    this.eventservice.clearMessage();
  //   //    this.eventservice.clearMessage();
  //   //                     this.getlanguagesData();
  //   //                 }, 5000);  


  // }







  insertRawFoodsifct() {


  }

  ngOnInit() {

    this.storage.get('categoryList').then((data1) => {
      this.categoryList = data1;
      console.log(JSON.stringify(data1));
    });
    // this.getLanguagesFromDB();
    // this.storage.get('languagesList').then((data1) => {
    //   this.languagesList = data1;

    // });
    this.insertRawFoodsifct();
    this.getRawfoodifctReviced();
    this.onOrientationChange();
    this.getLanguagesList();
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




  getRawfoodifctReviced() {
    let getRecipiesQuery;
    if (this.category.length != 0) {
      getRecipiesQuery = "select `foodcode`,`foodnames`,`names`, `languages` from rawfoodifctreviced where category='" + this.category + "'";
    } else {
      getRecipiesQuery = "select  `foodcode`,`foodnames`,`names`, `languages` from rawfoodifctreviced";
    }

    this.dbservice.getDataFromTable('rawfoodifctreviced1', 'recipes.sql', getRecipiesQuery);

    this.eventservice.getMessage().subscribe((data) => {

      if (data.name == 'rawfoodifctreviced1') {
        this.totalRawfoods = data.value.values;
        this.columnNames = data.value.columns;
        // alert(JSON.stringify(this.totalRawfoods));
      }

    });


  }



  getRawfoodItems(rawfood) {
    let getRecipiesQuery;
    if (this.category.length != 0) {
      getRecipiesQuery = "select * from raw_foods_ifct_nvif where category='" + this.category + "'";
    } else {
      getRecipiesQuery = "select * from raw_foods_ifct_nvif";
    }

    this.dbservice.getDataFromTable('raw_foods_ifct_nvif', 'recipes.sql', getRecipiesQuery);

    this.eventservice.getMessage().subscribe((data) => {

      if (data.name == 'raw_foods_ifct_nvif') {
        this.totalRawfoods = data.value.values;
        this.columnNames = data.value.columns;

      }

    });

  }

  getFilteredRawfoods(ele) {
    
    // if (this.category.length != 0) {
     
    var filterStr = ele;
    if (filterStr.length > 0) {
      this.filteredRawfood = this.totalRawfoods.filter((item) => {if(item[2]==null){ return false;} return ((item[2].toLowerCase().includes(filterStr.toLowerCase()))&&(this.selected_language==item[3]|| this.selected_language==""))});
      this.isDisplayRawfoodList = true;
    } else {
      this.isDisplayRawfoodList = false;
    }


  }

  setInput(input, item) {
    // alert(JSON.stringify(item));
    this.isDisplayRawfoodList = false;
    input.value = item[2];
    this.currentitem = Array.from(item);
  }

  addRawfood(rawfood, event) {

    let filterVlues = this.selectedRawfoods.filter((item) => {

      return (item.item[0] == this.currentitem[0]);
    });

    if (event.value.length != 0) {
      if (filterVlues.length < 1) {
        this.selectedRawfoods.push({ item: this.currentitem, value: 100, columns: this.columnNames });

      } else {
        alert("Item already added in different language");
      }
      //  alert(JSON.stringify( this.selectedRawfoods));
      event.value = ""
    } else {
      alert("Select item to add");
    }


  }

  restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }

  clearValues() {
    this.selectedRawfoods = [];
  }

}