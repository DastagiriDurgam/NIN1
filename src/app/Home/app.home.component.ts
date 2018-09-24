import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NutrientRequirementsComponent } from '../Requirements/app.mynutrientrequirements.components';
import { NutrientsInMyFoodComponent } from '../NutrientsInMyFood/app.nutrientsinmyfood.component';
import { MyDietNActivity } from '../MyDietNActivity/app.mydietnactivity.component';
import { OtherInfoComponent } from '../OtherInfo/app.otherinfo.component';
import { SearchFoodByNutrient } from '../SearchFoodByNutrients/app.searchfoodbynutrient.component';
import { SearchFoodByLanguage } from '../SearchFoodByLanguage/app.searchfoodbyLanguage.component';
import { Content } from 'ionic-angular';
import { DBService } from '../Services/dbservice';
declare var window;
@Component({
  selector: 'nin-home',
  templateUrl: './home.html'
})
export class HomeComponent {
  pageTitle: any = 'Home';
  devHeight;
  @ViewChild(Content) content: Content;
  constructor(private navController: NavController, private dbservice: DBService) {

  }
  ngOnInit() {
    this.content.scrollTo(50, 0);
    // this.onOrientationChange();
    this.dbservice.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        // alert('rdy' + rdy);
      }
    });
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
    }
  }
  ionViewDidEnter() {
    let dimensions = this.content.getContentDimensions();
    console.log('dimensions', dimensions);
    // dimensions.contentBottom =100;
  }
}
