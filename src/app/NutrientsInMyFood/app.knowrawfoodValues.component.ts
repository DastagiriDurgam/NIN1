import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { RawFoodComponent } from './app.rafood.component';
// import { GetRawFoodComponent } from './app.getrafood.component';
import { DBService } from '../Services/dbservice';
import { EventService } from '../Services/eventservice';
declare var window;


@Component({
  selector: 'know-rawfood',
  templateUrl: './knowrawfood.html',
  styles: [`
 
  `]
})
export class KnowRawFoodValuesComponent {
  devHeight;
  selectedRawfoods: any = [];
  currentRawfood: any = [];
  itemNames: any = { "protein": "Protein(g)", "total_fat": "Fat(g)", "total_dietary_fibre": "Fibre(g)", "carbohydrate": "Carbohydrate(g)", "energy_joules": "Energy (Kcal)", "riboflavin_b2": "Vitamin B2(mg)", "total_b6": "Vitamin B6(mg)", "total_folate_b9": "Vitamin B9(µg)", "total_ascorbic_acid": "Vitamin C(mg)", "retinol": "Vitamin A(µg)", "total_carotenoids": "Carotenoids(µg)", "ergocalciferol_d2": "Vitamin D2(µg)", "cholecalciferol_d3": "Vitamin D3(µg)", "vitamin_25_hydroxy_D3": "Active Vitamin D3(µg)", "Iron_fe": "Iron(mg)", "Zinc_zn": "Zinc(mg)", "Potassium_k": "Potassium(mg)", "sodium_na": "Sodium (mg)", "calcium_ca": "Calcium (mg)", "total_saturated_fatty_acids_TFSA": "Saturated Fat(g)", "b12": "Vitamin B12" };
  columnstodisplay: any = [];
  valuestodisplay: any = [];
  totalvaluestodisplay: any = {};
  pageTitle = "Raw Food Values"
  constructor(private navController: NavController, private navParams: NavParams, private dbservice: DBService, private eventservice: EventService) {

  }
  ngOnInit() {
    this.selectedRawfoods = this.navParams.get('selectedRawfoods')
    if (this.selectedRawfoods.length > 0) {
      this.getNutrientValues(this.selectedRawfoods[0]);
    }

    // alert(JSON.stringify(this.selectedRawfoods));
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

  getRawfoodValues() {

    this.navController.push(RawFoodComponent);
  }
  getTotal() {
    let totalValues = [];

    if (this.selectedRawfoods.length) {
      this.totalvaluestodisplay.columns = Array.from(this.selectedRawfoods[0].columns);
      //  this.totalvaluestodisplay.columns.splice(0, 5);
    }
    let tempLoopArray: any = Array.from(this.selectedRawfoods);
    // alert(JSON.stringify(this.selectedRawfoods));
    let length = tempLoopArray.length;

    for (var i = 0; i < length; i++) {
      //  tempLoopArray[i].item.splice(0,5);
      tempLoopArray[i].item.forEach((element, index) => {

        console.log(JSON.stringify(index));
        if (totalValues.length > index) {
          if (index > 4) {
            totalValues[index] += element;
          }

        } else {
          totalValues[index] = element;
        }


      });



    }
    // alert(JSON.stringify(totalValues));
    this.totalvaluestodisplay.item = totalValues;
    this.totalvaluestodisplay.value = 100;
    this.getNutrientValues(this.totalvaluestodisplay);
  }

  getNutrientValues(rafood) {
    this.currentRawfood = rafood;
    let displayValues;
    let displaycolumns;
    var self = this;
    let getNutrientsQuery = "select * from raw_foods_ifct_nvif where food_code='" + rafood.item[2] + "'";
    // alert(JSON.stringify(getNutrientsQuery));
    this.dbservice.getDataFromTable('rawfoodifct1', 'recipes.sql', getNutrientsQuery, function (a, b) {
      // alert(JSON.stringify(b));
      self.valuestodisplay = b;
    });

    this.eventservice.getMessage().subscribe((data) => {

      if (data.name == 'rawfoodifct1') {

        displayValues = data.value.values[0];
        displaycolumns = data.value.columns;
        // alert(JSON.stringify(displayValues));
        this.columnstodisplay = displaycolumns.filter(
          (item, index) => {
            return (index > 4) && (this.itemNames[item] != null) && ((displaycolumns.length - 1) != index);
          }
        );
        // this.valuestodisplay = displayValues.filter(
        //   (item, index) => {
        //     return index > 4;
        //   }
        // );

      }

    });




  }

  adjustFractions(value): any {
    return eval(value.toFixed(2));
  }
  restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }

}