import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import {  StatusBar} from '@ionic-native/status-bar';
import { MenuController, Nav } from 'ionic-angular';

import { RegisterComponent } from '../app/Register/app.register.component';
import { HomeComponent } from '../app/Home/app.home.component';
import { SplashComponent } from '../app/Home/app.splash.component';
import { NavBarComponent } from '../app/NavBar/app.navbar.component'
import { Storage } from '@ionic/storage'
import { NINService } from '../app/Services/ninhttpservice';
import { NutrientRequirementsComponent } from './Requirements/app.mynutrientrequirements.components';
import { NutrientsInMyFoodComponent } from './NutrientsInMyFood/app.nutrientsinmyfood.component';
import { MyDietNActivity } from './MyDietNActivity/app.mydietnactivity.component'
import { OtherInfoComponent } from './OtherInfo/app.otherinfo.component'
import { SearchFoodByNutrient } from './SearchFoodByNutrients/app.searchfoodbynutrient.component'
import { SearchFoodByLanguage } from './SearchFoodByLanguage/app.searchfoodbyLanguage.component';
declare var window;
declare var document;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage;
  navbar: NavBarComponent;
  
  pages;
  isScrollEnable:boolean = false;
  devheight:number = 0;
  constructor(
    private platform: Platform,
    public menu: MenuController,
    // public ninService:NINService,
    statusBar: StatusBar, splashScreen: SplashScreen,
   public storage:Storage

  ) {
    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomeComponent },
      { title: 'Register', component: RegisterComponent }
    ];


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    //    this.ninService.dummyCall().subscribe((response)=>{
    //   console.log(JSON.stringify(response));
    // });
     let urlString = '/Food/GetConsumptionByDate?userid=1&date=2017-06-12';
     console.log(urlString);
        // this.ninService.dummyCall()
        //     .subscribe((response) => {              
        //        console.log(JSON.stringify(response));               
        //     }); 

    });
  }
  ngOnInit() { 
   
    this.devheight = window.innerHeight;
     this.rootPage = SplashComponent;
    // this.storage.get('uid').then((data) => {
    //   if (data != null) {
    //     this.rootPage = HomeComponent;
    //   } else {
    //     this.rootPage = HomeComponent;
    //   } 
    // }); 
     
  }

  onNavigate(navStr) {
    if (navStr === 'req') {
      this.nav.push(NutrientRequirementsComponent);
    } else if (navStr === 'nutrientinfood') {
      this.nav.push(NutrientsInMyFoodComponent);
    } else if (navStr === 'otherinfo') {
      this.nav.push(OtherInfoComponent);
    } else if (navStr === 'mydietnactivity') {
      this.nav.push(MyDietNActivity);
    } else if (navStr === 'searchfoodbynutrient') {
      this.nav.push(SearchFoodByNutrient);
    } else if (navStr === 'searchfoodbylanguage') {
      this.nav.push(SearchFoodByLanguage);
    } else if (navStr === 'exit') {
      this.platform.exitApp();
    }
    this.closeNav();
  }

  openNav() {

    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  

}
