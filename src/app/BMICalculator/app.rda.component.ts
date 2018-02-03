import { Component } from '@angular/core';
import { RDAIndiansComponent } from '../BMICalculator/app.rdaforindians.component'
import { NavController } from 'ionic-angular';
declare var window;

@Component({
  selector: 'rda',
  templateUrl: './rda.html',
  styles: [`

  `]
})
export class RDAComponent {
  devHeight;
  gender: string = "";
  perticulars: any = "";
  perticularsArray: any = { Man: ['Sedentary work', 'Moderate work', 'Heavy work'], Woman: ['Sedentary work', 'Moderate work', 'Heavy work', 'Pregnant woman', 'Lactation 0-6 months', 'Lactation 6-12 months'], Infants: ['0-6 months', '6-12 months'], Children: ['1-3 years', '4-6 years', '7-9 years'], Boys: ['10-12 years', '13-15 years', '16-18 years'], Girls: ['10-12 years', '13-15 years', '16-18 years'] };
  pageTitle: any = 'Recommended Dietary Allowance(RDA)';
  constructor(private navController: NavController) {

  }

  ngOnInit() {
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


  submitRda() {
    
    if (this.gender.length > 0 && this.perticulars.length > 0) {
      // alert(JSON.stringify({ rdadetails: { gender: this.gender, perticulars: this.perticulars } }));
       this.navController.push(RDAIndiansComponent, { rdadetails: { gender: this.gender, perticulars: this.perticulars } });
    } else {
      alert('Please Select Gender and Particulars');
    }

  }
  restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }

}
