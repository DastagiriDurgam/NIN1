import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
declare var window;

@Component({
  selector: 'bmi-results',
  templateUrl: './bmiresults.html'
})
export class BMIReultsComponent {
  devHeight;
  bmiresult: number;
  bmrresult: number;
  bmiresultstyle: any;
  pageTitle: any = 'BMI & BMR Calculator';
  constructor(public navParams: NavParams) {

  }

  ngOnInit() {
    let params = this.navParams.get('results');
    this.bmrresult = params.bmr;
    this.bmiresult = params.bmi;
    if (this.bmiresult <= 18.5) {
      this.bmiresultstyle = { title: 'Under Weight', class: 'red' };
    } else if (this.bmiresult > 18.5 && this.bmiresult <= 24.9) {
      this.bmiresultstyle = { title: 'Normal', class: 'green' };
    } else if (this.bmiresult > 24.9 && this.bmiresult <= 29.9) {
      this.bmiresultstyle = { title: 'Over Weight', class: 'orange' };
    } else if (this.bmiresult > 30) {
      this.bmiresultstyle = { title: 'Obesity', class: 'red' };
    }
    console.log('hello bmiresults');
    console.log(params);

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

restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }


}
