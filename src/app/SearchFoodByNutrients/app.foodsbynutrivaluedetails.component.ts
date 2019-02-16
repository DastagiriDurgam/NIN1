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

    alert(JSON.stringify( this.details ));

    this.dbservice.tableDump('foods_by_language').then(res => {
      this.getFoodCodesByLanguage();
    });

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




  adjustFractions(value): any {
    return eval(value.toFixed(2)) ? value.toFixed(2) : 0;
  }

  getFoodCodesByLanguage() {
    let getFoodCodesByLanguageQuery;
    let col2 = this.details.nutrient[2].replace('\t', '');
    getFoodCodesByLanguageQuery = "SELECT food_code, Food_Name, " + col2 + " from raw_foods_ifct_nvif where category='" + this.details.category + "' ORDER BY " + col2 + (this.details.isascending ? " ASC" : " DESC") + " LIMIT 10";
    this.dbservice.getDataFromTable('foods_by_lang1', 'recipes.sql', getFoodCodesByLanguageQuery, function (a, b) {
      console.log(JSON.stringify(b));
    });
    this.dbservice.getDataFromTable2(getFoodCodesByLanguageQuery, false, true).then(res => {
      console.log('res', res);
    })

    this.eventservice.getMessage().subscribe((data) => {
      console.log('foods_by_lang1', data);
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