import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular'
import { DBService } from '../Services/dbservice'
import { EventService } from '../Services/eventservice'
import { NINService } from '../Services/ninhttpservice';
declare var window;


@Component({
  selector: 'Consuptiondetails',
  templateUrl: './Comsuptiondetails.html',
  styles: [`

  `]
})
export class ConsuptionDetailsComponent {
  totalValues:any = {};
  isTotaled = false;
  isTotalTab = false;
  devHeight;
  selectedRecipies: any[] = [];
  localDB: any;
  selectedValues: any = {};

  currentRecipe: any;
  displayValues: any = { columns: [], values: [] }
  pageTitle = "Recipe Values";
  totalvaluestodisplay: any = {};
  commons: any = {};
  itemNames: any = { "protein": "Protein(g)", "total_fat": "Fat(g)", "total_dietary_fibre": "Fibre(g)", "carbohydrate": "Carbohydrate(g)", "energy_joules": "Energy (Kcal)", "riboflavin_b2": "Vitamin B2(mg)", "total_b6": "Vitamin B6(mg)", "total_folate_b9": "Vitamin B9(µg)", "total_ascorbic_acid": "Vitamin C(mg)", "retinol": "Vitamin A(µg)", "total_carotenoids": "Carotenoids(µg)", "ergocalciferol_d2": "Vitamin D2(µg)", "cholecalciferol_d3": "Vitamin D3(µg)", "vitamin_25_hydroxy_D3": "Active Vitamin D3(µg)", "Iron_fe": "Iron(mg)", "Zinc_zn": "Zinc(mg)", "Potassium_k": "Potassium k(mg)", "sodium_na": "Sodium (mg)", "calcium_ca": "Calcium (mg)", "total_saturated_fatty_acids_TFSA": "Saturated Fat(g)"};


  constructor(private ninservice: NINService, private navController: NavController, private navParams: NavParams, private dbservice: DBService, private eventservice: EventService) {

  }

  getSelectedRecipies(item, timetype) {


    let getRecipiesQuery = "SELECT  protein,  total_fat,  total_dietary_fibre,  carbohydrate ,  energy_joules ,  riboflavin_b2 ,  total_b6,  total_folate_b9 ,  total_ascorbic_acid  ,  retinol ,  total_carotenoids ,  ergocalciferol_d2  ,  cholecalciferol_d3  ,  vitamin_25_hydroxy_D3  ,  Iron_fe  ,  Zinc_zn  ,  Potassium_k ,  sodium_na  ,  calcium_ca ,  total_saturated_fatty_acids_TFSA ,  b12   FROM recipes_nut_value_for_100_grams where uid_recipes=" + item;

    this.dbservice.getDataFromTable('recipes_nut_value_for_100_grams_'+item, 'recipes.sql', getRecipiesQuery);

    var gotValues;
    this.eventservice.getMessage().subscribe((data) => {
      if (data.name == 'recipes_nut_value_for_100_grams_'+item) {
        this.displayValues.values = data.value.values;
        this.displayValues.columns = data.value.columns;
        gotValues = data.value;
        this.selectedValues[item+timetype] = data.value;

      }

    });

    gotValues;
  }

  adjustFractions(value): any {
    
    return eval(value.toFixed(2));
  }






  ngOnInit() {
    this.selectedRecipies = this.navParams.get('selectedRecipies');
    this.commons = this.navParams.get('commons');
    this.selectedRecipies.forEach(element => {
      this.currentRecipe = element;
      // alert(JSON.stringify(this.currentRecipe.item));
      this.getSelectedRecipies(this.currentRecipe.item[2], element.timetype);
    });
    this.currentRecipe = this.selectedRecipies[0];
    // alert(JSON.stringify(this.currentRecipe.item));
     this.getSelectedRecipies(this.currentRecipe.item[2], this.currentRecipe.timetype);
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
    this.isTotalTab = true;
    this.getTotalFrmSer();
//     this.currentRecipe.value = 1;
//     let totalValues = [];

// //  alert(JSON.stringify(this.selectedValues));
//     for (let i = 0; i < 20; i++) {
//       let tempValue = 0;
//       for (let a = 0; a < Object.keys(this.selectedValues).length; a++) {
       
//         if (this.selectedValues[Object.keys(this.selectedValues)[a]].values[0][i] != null && this.selectedValues[Object.keys(this.selectedValues)[a]].values[0][i] != NaN) {
//         if(eval(this.selectedValues[Object.keys(this.selectedValues)[a]].values[0][i])){
//           tempValue += eval(this.selectedValues[Object.keys(this.selectedValues)[a]].values[0][i]);
//           // alert(JSON.stringify(eval(this.selectedValues[Object.keys(this.selectedValues)[a]].values[0][i])));
//         }else{
//           tempValue += 0;
//         }
        
                 
         
//         } else {
//           tempValue += 0;
//         }

//       }
    
//       totalValues[i] = tempValue;
     

//     }
     
//     this.displayValues.values[0] = totalValues;
  }


  getNutrientValues(recipe) {
    this.isTotalTab = false;
    this.currentRecipe = recipe;
    this.getSelectedRecipies(this.currentRecipe.item[2], recipe.timetype);
  }

  submit() {

    let details = [];

    for (var item in this.selectedRecipies) {
      if (this.selectedRecipies.hasOwnProperty(item)) {
        var element = this.selectedRecipies[item];
        let el = {};
        el['Uid'] = element.item[0];
        el['ItemName'] = element.item[1];
        el['Quantity'] = element.value;
        el['timetype'] = element.timetype;
        details.push(el);
      }

    }
    //  alert(JSON.stringify({ Userid: this.commons.Userid, Date: this.commons.Date, Userconsumptionlist: [details] }) );
    if (this.selectedRecipies.length > 0) {
      console.log(JSON.stringify({ Userid: this.commons.Userid, Date: this.commons.Date, Userconsumptionlist: details }))
      this.ninservice.submitConsumptionItem({ Userid: this.commons.Userid, Date: this.commons.Date, Userconsumptionlist: details }).subscribe(
        (response) => {
          // alert(JSON.stringify(response))
          if (response.Status == 'Success') {
             alert("Successfully Saved")
            this.navController.pop();

          } else {
            //  alert(JSON.stringify("Unable to save consumption details") );

            // this.navController.push(ConsuptionDetailsComponent, { recipe: this.selected_recipe });
          }
         
        }
      );
    }
  }

  getTotalFrmSer() {
  
        let details = [];
    
        for (var item in this.selectedRecipies) {
          if (this.selectedRecipies.hasOwnProperty(item)) {
            var element = this.selectedRecipies[item];
            let el = {};
            el['Uid'] = element.item[0];
            el['ItemName'] = element.item[1];
            el['Quantity'] = element.value;
            el['timetype'] = element.timetype;
            details.push(el);
          }
    
        }
          // alert(JSON.stringify({ Userid: this.commons.Userid, Date: this.commons.Date, Userconsumptionlist: [details] }) );
        if (this.selectedRecipies.length > 0) {
          this.ninservice.getConsumptionTotal({ Userid: this.commons.Userid, Date: this.commons.Date, Userconsumptionlist: details }).subscribe(
            (response) => {
             this.totalValues = response;
              // alert(JSON.stringify(response))
              // alert(JSON.stringify(response));
             
            }
          );
        }
      }


  getRecipeValues() {

  }
  restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }

}