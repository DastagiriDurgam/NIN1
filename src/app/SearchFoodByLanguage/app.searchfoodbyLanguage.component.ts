import { Component } from '@angular/core';

import { DBService } from '../Services/dbservice'
import { EventService } from '../Services/eventservice'
import { FoodsByLanguageDetails } from './app.foodsByLanguageDetails.component'
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
declare var window;


@Component({
  selector: 'search-food-bynutrient',
  templateUrl: './searchfoodbylanguage.html',
  styles: [`
  `]
})
export class SearchFoodByLanguage {
  // storage = new Storage();
  devHeight;
  languagesList: any = [];
  foodList: any = [];
  selected_language: any = "EN";
  selected_food = "0";
  selected_lname = "";
  isDisplayRawfoodList: boolean = false;
  filteredFood: any = [];
  selectedFoodsArray: any = [];
  pageTitle = "Search Food By Language";
  totalRawfoods: any = [];
  columnNames: any = [];
  filteredRawfood: any[] = [];
  currentitem: any = [];
  searchStr = '';

  constructor(private dbservice: DBService, private storage:Storage, private eventservice: EventService, private navController: NavController) {

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
  ngOnInit() {

    // // this.getLanguagesFromDB();
    // this.storage.get('languagesList').then((data1) => {
    //   this.languagesList = data1;

    // });


    this.storage.get('totalRawfoods').then((data1) => {
      //  this.totalRawfoods = data1;
      // console.log(JSON.stringify(data1));
    });
    this.storage.get('columnNames').then((data1) => {
      this.columnNames = data1;
      // console.log(JSON.stringify(data1));
    });
    // this.insertRawFoodsifct();
    // this.getRawfoodItems();
    this.getLanguagesList();
    this.onOrientationChange();
    this.getFoodsByLanguage(this.selected_language);
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





  setInput(input, item) {
    this.isDisplayRawfoodList = false;
    if (this.selected_language == 'EN') { 
      input.value = item[1];
    } else {
      input.value = item[1];
    }

    this.currentitem = Array.from(item);
  }

  getFilteredRawfoods(ele) {
    this.filteredRawfood = [];
    //  alert(JSON.stringify(this.totalRawfoods[0]))
    var filterStr = ele;
    if (filterStr.length > 0) {
      if (this.selected_language == 'EN') {
        this.filteredRawfood = this.totalRawfoods.filter((item) => (item[1].toLowerCase().includes(filterStr.toLowerCase()))
        );
      } else {
        this.filteredRawfood = this.totalRawfoods.filter((item) =>(item[1].toLowerCase().includes(filterStr.toLowerCase())));
      }
      this.isDisplayRawfoodList = true;
    } else {
      this.isDisplayRawfoodList = false;
    }
    //  alert(JSON.stringify(this.totalRawfoods))

  }


  insertFoodsByLanguage() {

  }

  onChangeOfLanguge(food) {

    this.getFoodsByLanguage(food);
    this.searchStr = '';
  }

  getFoodsByLanguage(language) {

    if (language == 'EN') {

      let getRecipiesQuery = "select * from raw_foods_ifct_nvif";

      this.dbservice.getDataFromTable('raw_foods_ifct_nvif', 'recipes.sql', getRecipiesQuery);

      this.eventservice.getMessage().subscribe((data) => {

        if (data.name == 'raw_foods_ifct_nvif') {
          //  alert(JSON.stringify(data.value));
          this.totalRawfoods = [];
          this.totalRawfoods = data.value.values;
          //  alert(JSON.stringify(this.totalRawfoods))
        }
      });
    } else {
      var lang_nm =language;
    lang_nm =  lang_nm.replace('.', '');
      let getRecipiesQuery = "select * from foods_by_language where lang_nm LIKE'" + lang_nm + "%'";
        // alert(JSON.stringify(getRecipiesQuery))

      this.dbservice.getDataFromTable('foods_by_language', 'recipes.sql', getRecipiesQuery);

      this.eventservice.getMessage().subscribe((data) => {

        if (data.name == 'foods_by_language') {
          //  alert(JSON.stringify(data.value));
          this.totalRawfoods = [];
          this.totalRawfoods = data.value.values;
            // alert(JSON.stringify(this.totalRawfoods))
        }
      });

    }

  }


  getfilteredFoods(ele) {
    var filterStr = ele;
    this.filteredFood = [];
    if (filterStr.length > 0) {
      this.filteredFood = this.foodList.filter((item) => (item[1].toLowerCase().includes(filterStr.toLowerCase())));
      this.isDisplayRawfoodList = true;
    } else {
      this.isDisplayRawfoodList = false;
    }

  }

  submitDetails() {
    this.selectedFoodsArray = [];
    if (this.selected_language == 'EN') {
      this.selectedFoodsArray.push({ foodcode: this.currentitem[17], foodname: this.currentitem[1] });
    } else {
      this.selectedFoodsArray.push({ foodcode: this.currentitem[17], foodname: this.currentitem[1] });
    }

    this.navController.push(FoodsByLanguageDetails, { foods: this.selectedFoodsArray });
  }

  getRawfoodItems() {
    let getRecipiesQuery = "select * from raw_foods_ifct_nvif";
    this.dbservice.getDataFromTable('raw_foods_ifct_nvif', 'recipes.sql', getRecipiesQuery);
    this.eventservice.getMessage().subscribe((data) => {
      // alert(JSON.stringify(data.value));
      if (data.name == 'raw_foods_ifct_nvif') {
        // this.totalRawfoods = data.value.values;
        this.columnNames = data.value.columns;
      }

    });
  }



  restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }


}