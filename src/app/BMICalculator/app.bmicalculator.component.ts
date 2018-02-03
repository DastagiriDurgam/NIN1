import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BMIReultsComponent } from '../BMICalculator/app.bmiresults.component'
import { Storage } from '@ionic/storage'
declare var window;


@Component({
  selector: 'bmi-calculator',
  templateUrl: './bmicalculator.html',
  styles: [` 

  `]
})
export class BMICalcComponent {
  devHeight;
  user: string = "";
  pageTitle: any = 'BMI & BMR Calculator';
  gender: string = 'male';
  age: number = 0;
  weightinkg: number;
  heightincm: any = '';
  heightinft: number;
  bmiresult: number;
  bmrresult: number;
  heightInch: any = '';
  heightFeet: any = "";
  Users: any = [];
  // private storage = new Storage();
  physioLogicalStatus: any = { male: ['Sedentary Work', 'Moderate Work', 'Heavy Work'], female: ['Sedentary Work', 'Moderate Work', 'Heavy Work', 'Pregnant Woman', 'Lactation 0-6 months', 'Lactation 6-12 months'] };
  constructor(private navController: NavController, private storage:Storage) {

  }

  ngOnInit() {

    this.getUsersData();
    //alert(JSON.stringify(this.devHeight))
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

  getUsersData() {
    let prevRegDetails = [];
    this.storage.get('regDetails').then((data) => {
      if (data.length > 0) {
        prevRegDetails = data;
        this.Users = prevRegDetails;
      }
    });

    console.log(JSON.stringify(this.Users));
  }

  submitCalc() {

    var err = this.validateForms([{ modelName: this.age, defaultvalue: 0, modelTitle: 'Age', errorTitle: 'Age' },
    { modelName: this.heightincm, defaultvalue: "", modelTitle: 'heightincm', errorTitle: 'Height' }
    ]);
    if (err.isValid) {
      this.bmrresult = this.getBmr();
      this.bmiresult = this.getBmi();
      this.navController.push(BMIReultsComponent, { results: { bmr: this.bmrresult, bmi: this.bmiresult } });

    }
  }

  validateForms(validateFormsArray: any[]) {
    // alert(JSON.stringify(validateFormsArray));
    //validateFormsArray = [ {modelName:this.relation, defaultvalue:'0',modelTitle:'relation', errorTitle:'Relation'}];
    let errorMessages: any = {};
    for (let validatekey in validateFormsArray) {
      if (validateFormsArray.hasOwnProperty(validatekey)) {
        let element = validateFormsArray[validatekey];

        if (element.modelName == element.defaultvalue) {
          errorMessages[element.modelTitle] = 'Please Enter ' + element.errorTitle;
        }
      }
    }

    errorMessages.isValid = !(Object.keys(errorMessages).length > 0);
    if (!errorMessages.isValid) {
      let errors = "";
      for (let errorkey in errorMessages) {
        if (errorMessages.hasOwnProperty(errorkey)) {
          let element = errorMessages[errorkey];
          if (errorkey != 'isValid')
            errors += element + "\n";
        }
      }
      alert(errors)
    }
    return errorMessages;
  }

  getBmr() {

    if (this.gender == 'male') {
      if (this.age >= 18 && this.age <= 30) {
        return 645 + (14.5 * this.weightinkg)
      } else if (this.age >= 31 && this.age <= 60) {
        return 833 + (10.9 * this.weightinkg)
      } else if (this.age > 60) {
        return 463 + (12.6 * this.weightinkg)
      }
      // return 66 + (13.7 * this.weightinkg) + (5 * this.heightincm) - (6.8 * this.age)
    } else if (this.gender == 'female') {
      if (this.age >= 18 && this.age <= 30) {
        return 471 + (14 * this.weightinkg)
      } else if (this.age >= 31 && this.age <= 60) {
        return 788 + (8.3 * this.weightinkg)
      } else if (this.age > 60) {
        return 565 + (10 * this.weightinkg)
      }

      // return 655 + (9.6 * this.weightinkg) + (1.8 * this.heightincm) - (4.7 * this.age)
    }

  }



  getBmi() {

    return this.weightinkg / ((this.heightincm / 100) * (this.heightincm / 100))

  }

  convertUnits(str, value) {
    if (str == 'cmeter') {
      let tempInch = this.heightincm * 0.393701;
      this.heightFeet = Math.round(tempInch / 12);
      this.heightInch = Math.round(tempInch % 12);

    } else {
      this.heightincm = (this.heightFeet * 30.48) + (this.heightInch * 2.54)
    }


  }
  restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }


}
