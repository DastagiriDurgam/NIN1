import { Component } from '@angular/core';

import { DBService } from '../Services/dbservice'
import { EventService } from '../Services/eventservice'
import { NavParams } from 'ionic-angular';
declare var window;



@Component({
  selector: 'foodsbynutrivaluedetails',
  templateUrl: './foodsbynutrivaluedetails.html',
  styles: [`

  `]
})
export class SearchFoodByNutrientDetails {
  devHeight;
  totalRawfoods: any = [];
  columnNames: any = [];
  details: any = {};
  asc = "";
  queryVariable = "";
  queryVariable1 = "";
  isNoDataAvailable = false;
  pageTitle = "Search Food By Nutrients";
  languageColumns: any = {};
  constructor(private dbservice: DBService, private eventservice: EventService, private navParams: NavParams) {

  }

  ngOnInit() {
    this.details = this.navParams.get('fbyndetails');
    //{nutrient:this.selected_nutrient, category:this.perticulars, isascending:this.ascrdesc}



    // alert(JSON.stringify(this.details));
    this.dbservice.tableDump('foods_by_language').then(res => {
      this.getFoodCodesByLanguage();
    });


    // if (this.details.isascending == "true" || this.details.isascending == true) {
    //          this.getRawfoodItemsReviced("ASC");
    //         } else {
    //          this.getRawfoodItemsReviced("DESC");
    //         }


    //     ;
    this.onOrientationChange();
  }

  onOrientationChange() {
    this.devHeight = (window.innerHeight - 135).toString() + "px";
    var self = this;
    //window.removeEventListener("orientationchange", self.changeDivHeight, false);
    window.addEventListener("orientationchange", self.changeDivHeight, true);

  }

  changeDivHeight() {
    this.devHeight = (window.innerHeight - 75).toString() + "px";
  }



  getRawfoodItemsReviced(ascrdesc) {

    let col2 = this.details.nutrient[2].replace('\t', '');
    let getRecipiesQuery;
    if (this.details.language != "EN") {
      getRecipiesQuery = "SELECT [names], [" + col2 + "],  [food_code] from [rawfoodifctreviced] where languages='" + this.details.language + "' AND category='" + this.details.category + "' ORDER BY languages " + ascrdesc + "  LIMIT 10";
    } else {
      getRecipiesQuery = "SELECT [foodnames], [" + col2 + "],  [food_code] from [rawfoodifctreviced] where category='" + this.details.category + "' ORDER BY " + col2 + " " + ascrdesc + "  LIMIT 10";

    }
    //  alert(JSON.stringify(getRecipiesQuery));
    this.dbservice.getDataFromTable('rawfoodifctreviced2', 'recipes.sql', getRecipiesQuery, function (a, b) {
      console.log(b);
    });
    this.eventservice.getMessage().subscribe((data) => {

      if (data.value.columns.length > 0) {
        this.isNoDataAvailable = false;
      } else {
        this.isNoDataAvailable = true;
      }
      if (data.name == 'rawfoodifctreviced2') {

        this.totalRawfoods = data.value.values;
        this.columnNames = data.value.columns;
        // alert(JSON.stringify(data.value));

        // alert(JSON.stringify(this.queryVariable1 + this.queryVariable));
        // this.getFoodsByLanguage();
      }

    });

  }


  getRawfoodItems(ascrdesc) {

    let col2 = this.details.nutrient[2].replace('\t', '');
    let getRecipiesQuery;

    getRecipiesQuery = "SELECT [Food Name], [" + col2 + "],  [food_code] from [raw_foods_ifct_nvif] where category='" + this.details.category + "' ORDER BY " + col2 + " LIMIT 10";


    // console.log(JSON.stringify(getRecipiesQuery));
    this.dbservice.getDataFromTable('raw_foods_ifct_nvif', 'recipes.sql', getRecipiesQuery, function (a, b) {
      console.log(JSON.stringify(b));
    });
    this.eventservice.getMessage().subscribe((data) => {

      if (data.value.columns.length > 0) {
        this.isNoDataAvailable = false;
      } else {
        this.isNoDataAvailable = true;
      }
      if (data.name == 'raw_foods_ifct_nvif') {

        this.totalRawfoods = data.value.values;
        this.columnNames = data.value.columns;
        //  alert(JSON.stringify(this.totalRawfoods));

        // alert(JSON.stringify(this.queryVariable1 + this.queryVariable));
        // this.getFoodsByLanguage();
      }

    });

  }


  adjustFractions(value): any {
    return eval(value.toFixed(2)) ? value.toFixed(2) : 0;
  }

  getFoodCodesByLanguage() {
    let getFoodCodesByLanguageQuery;
    let col2 = this.details.nutrient[2].replace('\t', '');
    getFoodCodesByLanguageQuery = "SELECT [food_code], [Food_Name], [" + col2 + "] from [raw_foods_ifct_nvif] where category='" + this.details.category + "' ORDER BY " + col2 + (this.details.isascending ? " ASC" : " DESC") + " LIMIT 10";

    this.dbservice.getDataFromTable('foods_by_lang1', 'recipes.sql', (getFoodCodesByLanguageQuery), function (a, b) {
      console.log(JSON.stringify(b));
    });
    this.eventservice.getMessage().subscribe((data) => {
      if (data.name == 'foods_by_lang1') {
        this.totalRawfoods = [];
        this.columnNames = []

        // alert(JSON.stringify(data.value));
        if (this.details.language == "EN") {
          this.totalRawfoods = data.value.values;
          this.columnNames = data.value.columns;
        } else {
          this.totalRawfoods = data.value.values;
          this.columnNames = data.value.columns;
          data.value.values.forEach(element => {
            getFoodCodesByLanguageQuery = "SELECT  short_name, food_codes FROM `foods_by_language` where lang_nm like '" + this.details.language.replace('.', '') + "%' AND food_codes=" + element[0] + " LIMIT 1";
            this.dbservice.getDataFromTable('foods_by_lang2', 'recipes.sql', (getFoodCodesByLanguageQuery), function (a, b) {
              console.log(JSON.stringify(b));
            });
          });
        }
      }
    })


    this.eventservice.getMessage().subscribe((data2) => {
      if (data2.name == 'foods_by_lang2') {

        this.totalRawfoods.forEach((element1, index) => {
          if (element1[0] == data2.value.values[0][1]) {
            // alert(JSON.stringify(this.totalRawfoods[index][1]));
            // alert(JSON.stringify(data2.value.values[0][0]));
            this.totalRawfoods[index][1] = data2.value.values[0][0];
          }
        });
      }
    })
  }


  restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {
    } else {
      event.preventDefault();
    }
  }
  //select top 10 * from [tablename] order by newid()

}