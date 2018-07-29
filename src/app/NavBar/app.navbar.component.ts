import { Component, Input } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

// import { RegisterComponent } from '../../app/Register/app.register.component';
import { HomeComponent } from '../../app/Home/app.home.component';
import { NutrientRequirementsComponent } from '../Requirements/app.mynutrientrequirements.components';
import { NutrientsInMyFoodComponent } from '../NutrientsInMyFood/app.nutrientsinmyfood.component';
import { MyDietNActivity } from '../MyDietNActivity/app.mydietnactivity.component';
import { OtherInfoComponent } from '../OtherInfo/app.otherinfo.component';
import { SearchFoodByNutrient } from '../SearchFoodByNutrients/app.searchfoodbynutrient.component';
import { SearchFoodByLanguage } from '../SearchFoodByLanguage/app.searchfoodbyLanguage.component';
declare var window;

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavBarComponent {
  devHeight = window.innerHeight - 75;
  @Input() pageTitle: any = '';
  @Input() color: any = 'black';
  @Input() isDisplayFooter = true;
  @Input() showMenu = true;
  @Input() showHome = true;
  constructor(private navController: NavController, private platform: Platform) {

  }

  openNav() {
    console.log(this.pageTitle);
   // document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    console.log(this.pageTitle);
   // document.getElementById("mySidenav").style.width = "0";
  }

  gotoHome() {
    this.navController.setRoot(HomeComponent);
  }

  popView() {
    if (this.pageTitle != 'Home')
      this.navController.pop();
  }
  onNavigate(navStr) {
    if (navStr === 'req') {
      this.navController.push(NutrientRequirementsComponent);
    } else if (navStr === 'nutrientinfood') {
      this.navController.push(NutrientsInMyFoodComponent);
    } else if (navStr === 'otherinfo') {
      this.navController.push(OtherInfoComponent);
    } else if (navStr === 'mydietnactivity') {
      this.navController.push(MyDietNActivity);
    } else if (navStr === 'searchfoodbynutrient') {
      this.navController.push(SearchFoodByNutrient);
    } else if (navStr === 'searchfoodbylanguage') {
      this.navController.push(SearchFoodByLanguage);
    } else if (navStr === 'exit') {
      this.platform.exitApp();
    }
  }

} 
