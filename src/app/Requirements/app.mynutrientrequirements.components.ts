import { Component } from '@angular/core';
import { BMICalcComponent } from '../BMICalculator/app.bmicalculator.component';
import{RDAComponent} from '../BMICalculator/app.rda.component'
import { NavController } from 'ionic-angular';
declare var window;


@Component({
  selector: 'nutrient-requirements',
  templateUrl: './NutrientRequirements.html',
  styles: [`
  html, body {
    height: 100%;
} 
  `]
})
export class NutrientRequirementsComponent {
  devHeight;
  pageTitle:any = 'My Nutrient Requirements';
  color:any = '#f9a938';
 constructor(private navController:NavController){
 }
 navigate(navStr){
   if(navStr==='bmi'){
     this.navController.push(BMICalcComponent);
   }else  if(navStr==='rda'){
     this.navController.push(RDAComponent);
   }

 }

 ngOnInit(){
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
