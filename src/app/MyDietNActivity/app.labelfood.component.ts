import { Component, ViewChild } from '@angular/core';

// import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { NINService } from '../Services/ninhttpservice';
import { DBService } from '../Services/dbservice'
import { EventService } from '../Services/eventservice';
// import { DatePicker } from '@ionic-native/date-picker';
import { Content } from 'ionic-angular';
declare var window;




@Component({
  selector: 'labelfood',
  templateUrl: './labelfood.html',
  styles: [` 

  `]
})
export class LabelFood {
  @ViewChild(Content) content: Content;
  devHeight;
  timetype: any = 'Breakfast'
  nutrients: any = [];
  pageTitle = "Add Packaged Food";
  // storage = new Storage();
  Userid: any = '';
  labelfooddetails: any = { Itemname: '', quantity: '', 'energy_joules': '0.0', 'carbohydrate': '0.0', 'protein': '0.0', 'sodium_na': '0.0', 'total_fat': '0.0', 'saturated_fat': '0.0' };
  Users: any[];
  date: any = '';
  sel_minDate = "2017-01-01";
  constructor( private storage:Storage, private ninservice: NINService, private dbservice: DBService, private eventservice: EventService) {

  }

  resetLabelFoodDetails() {
    this.labelfooddetails = { Itemname: '', quantity: '', 'energy_joules': '0.0', 'carbohydrate': '0.0', 'protein': '0.0', 'sodium_na': '0.0', 'total_fat': '0.0', 'saturated_fat': '0.0' };

  }

  setMinDate() {
    var beforeDate = new Date();
    // this.date = beforeDate.getFullYear() + "-" + beforeDate.getMonth() + "-" + beforeDate.getDate();   
    beforeDate.setDate(beforeDate.getDate() - 1);
    var dateStr = (beforeDate.getDate() / 10) < 1 ? "0" + beforeDate.getDate().toString() : beforeDate.getDate().toString();
    var monthStr = ((beforeDate.getMonth() + 1) / 10) < 1 ? "0" + (beforeDate.getMonth() + 1).toString() : (beforeDate.getMonth() + 1).toString();
    this.sel_minDate = beforeDate.getFullYear().toString() + "-" + monthStr + "-" + dateStr;

  }

  ngOnInit() {
    this.setMinDate();
  
    this.getUsersData();
    // this.getNutrientFromDB();
    this.storage.get('nutrients').then((data1) => {
      this.nutrients = data1;
      // console.log(JSON.stringify(data1));
    });
    this.onOrientationChange();
  }

scrollTo() {
    // let yOffset = document.getElementById(elementId).offsetTop;
     this.content.scrollToTop();
   
}



  onOrientationChange() {
    this.devHeight = (window.innerHeight - 75).toString() + "px";
    var self = this;
    //window.removeEventListener("orientationchange", self.changeDivHeight, false);
    window.addEventListener("orientationchange", self.changeDivHeight, true);

  }

  clearValues(){
    this.labelfooddetails={
      sodium_na:"0.00",
      protein:"0.00",
      saturated_fat:"0.00",
      total_fat:"0.00",
      carbohydrate:"0.00",
      energy_joules:"0.00"

    }
  }

  changeDivHeight() {
    this.devHeight = (window.innerHeight - 75).toString() + "px";
  }

  getUsersData() {
    let prevRegDetails = [];
    this.storage.get('regDetails').then((data) => {
      if (data.length > 0) {
        prevRegDetails = data;
        this.Users = prevRegDetails;
        this.Userid = this.Users[0]['uid'];
        console.log(JSON.stringify(this.Users));
      }
    });


  }
  validateForms(validateFormsArray: any[]) {
    // alert(JSON.stringify(validateFormsArray));
    //validateFormsArray = [ {modelName:this.relation, defaultvalue:'0',modelTitle:'relation', errorTitle:'Relation'}];
    let errorMessages: any = {};
    for (let key in validateFormsArray) {
      if (validateFormsArray.hasOwnProperty(key)) {
        let element = validateFormsArray[key];

        if (element.modelName == element.defaultvalue) {
          errorMessages[element.modelTitle] = 'Please Enter ' + element.errorTitle;
        }
      }
    }

    errorMessages.isValid = !(Object.keys(errorMessages).length > 0);
    if (!errorMessages.isValid) {
      let errors = "";
      for (let key in errorMessages) {
        if (errorMessages.hasOwnProperty(key)) {
          let element = errorMessages[key];
          if (key != 'isValid')
            errors += element + "\n";
        }
      }
      alert(errors)
    }
    return errorMessages;
  }

  submitLabelFoodDetails() {
    let err = this.validateForms([{ modelName: this.date, defaultvalue: '', modelTitle: 'date', errorTitle: 'Date' }, { modelName: this.labelfooddetails.Itemname, defaultvalue: '', modelTitle: 'Itemname', errorTitle: 'Label Food Name' }]);
    this.labelfooddetails['Date'] = new Date(this.date);
    this.labelfooddetails['Userid'] = this.Userid;
    this.labelfooddetails['timetype'] = this.timetype;
    this.storage.get('uid').then((data) => {
      this.labelfooddetails.Userid = data;
    });
    if (err.isValid) {
      this.ninservice.submitLabelFoodItem(this.labelfooddetails).subscribe(
        (response) => {
          if (response.Status == 'Success') {
            alert("Food Successfully Added")
            this.resetLabelFoodDetails();
          } else {
            // alert('Please fill all Details if missed');
          }
          console.log(JSON.stringify(response));
        }
      );
    }

    console.log(JSON.stringify(this.labelfooddetails));
  }


  getNutrientFromDB() {

    let createQuery = "CREATE TABLE IF NOT EXISTS `nutrients` (   `id` int(11) NOT NULL,   `name` varchar(30) NOT NULL,   `other name` varchar(250) DEFAULT NULL )";

    let insertQuery = "INSERT INTO `nutrients` (`id`, `name`, `other name`) VALUES (1, 'Calcium', 'calcium_ca'), (2, 'Carbohydrate', 'carbohydrate'), (3, 'Protein', 'protein'), (4, 'Fat', 'total_fat'), (5, 'Vitamin B6', 'total_b6'), (6, 'Vitamin B9', 'total_folate_b9'), (7, 'Ascorbic Acid', 'total_ascorbic_acid'), (8, 'Vitamin A', 'retinol'), (9, 'Carotenoids', 'total_carotenoids'), (10, 'Vitamin D2', 'ergocalciferol_d2'), (11, 'Vitamin D3', 'cholecalciferol_d3'), (12, 'Vitamin D3(25)', 'vitamin_25_hydroxy_D3'), (13, 'Iron', 'Iron_fe'), (14, 'Zinc', 'Zinc_zn'), (15, 'Potassium', 'Potassium_k'), (16, 'Sodium', 'sodium_na'), (17, 'Saturated Fatty Acids', 'total_saturated_fatty_acids_TFSA'), (18, 'Fibre ', 'total_dietary_fibre'), (19, 'Energy ', 'energy_joules'), (20, 'Vitamin B2 ', 'riboflavin_b2 ')";

    let getRecipiesQuery = "select * from nutrients";

    this.dbservice.createTable('recipes.sql', createQuery, insertQuery, `nutrients`);

    this.dbservice.insertValuesToTable('recipes.sql', insertQuery, `nutrients`);

    this.dbservice.getDataFromTable('nutrients', 'recipes.sql', getRecipiesQuery);

    this.eventservice.getMessage().subscribe((data) => {
      console.log(JSON.stringify(data.value));
      if (data.name == 'nutrients') {
        this.nutrients = data.value.values;
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