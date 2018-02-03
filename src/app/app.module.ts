import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar'
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterComponent } from '../app/Register/app.register.component';
import { LoginComponent } from '../app/Login/app.login.component';
import { HomeComponent } from '../app/Home/app.home.component'
import { SplashComponent } from '../app/Home/app.splash.component'
import { NutrientRequirementsComponent } from '../app/Requirements/app.mynutrientrequirements.components'
import { BMICalcComponent } from '../app/BMICalculator/app.bmicalculator.component'
import { BMIReultsComponent } from '../app/BMICalculator/app.bmiresults.component'
import { RDAComponent } from '../app/BMICalculator/app.rda.component'
import { NutrientsInMyFoodComponent } from '../app/NutrientsInMyFood/app.nutrientsinmyfood.component'
import { GetRawFoodComponent } from '../app/NutrientsInMyFood/app.getrafood.component'
import { RawFoodComponent } from '../app/NutrientsInMyFood/app.rafood.component'
import { KnowRawFoodValuesComponent } from '../app/NutrientsInMyFood/app.knowrawfoodValues.component'
import { GetRecipeComponent } from '../app/NutrientsInMyFood/app.getrecipe.component'
import { RecipeComponent } from '../app/NutrientsInMyFood/app.recipe.component'
import { CreateRecipeComponent } from '../app/NutrientsInMyFood/app.createrecipe'
import { KnowRecipeValuesComponent } from '../app/NutrientsInMyFood/app.knowrecipeValues.component'
import { NavBarComponent } from '../app/NavBar/app.navbar.component'
import { RDAIndiansComponent } from '../app/BMICalculator/app.rdaforindians.component'
import { MyDietNActivity } from '../app/MyDietNActivity/app.mydietnactivity.component'
import { OtherInfoComponent } from '../app/OtherInfo/app.otherinfo.component'
import { Source } from '../app/OtherInfo/app.source.component'
import { About } from '../app/OtherInfo/app.about.component'
import { ContactUs } from '../app/OtherInfo/app.contactus.component'
import { UserGuide } from '../app/OtherInfo/app.userguide.component'
import { Version } from '../app/OtherInfo/app.version.component'
import { Terms } from '../app/OtherInfo/app.terms.component'
import { SearchFoodByNutrient } from '../app/SearchFoodByNutrients/app.searchfoodbynutrient.component'

import { SearchFoodByLanguage } from '../app/SearchFoodByLanguage/app.searchfoodbylanguage.component'
import { FoodsByLanguageDetails } from '../app/SearchFoodByLanguage/app.foodsByLanguageDetails.component'
import { ConsuptionComponent } from '../app/MyDietNActivity/app.comsuption.component'
import { LabelFood } from '../app/MyDietNActivity/app.labelfood.component'
import { ConsuptionDetailsComponent } from '../app/MyDietNActivity/app.comsuptiondetails.component'
import { ExpenditureComponent } from '../app/MyDietNActivity/app.expenditure.component'
import { BalancesheetComponent } from '../app/MyDietNActivity/app.balancesheet.component'
import { PrintNumbersPipe } from '../app/pipes'
import {  IonicStorageModule } from '@ionic/storage'
import { SQLite } from '@ionic-native/sqlite'
import { SplashScreen } from '@ionic-native/splash-screen'
import { HttpRequest } from './Services/httpservice'
import { NINService } from './Services/ninhttpservice'
import { NinDBService } from './Services/nindbservice'
import { JsonpModule, HttpModule } from '@angular/http'
import { DBService } from './Services/dbservice'
import { EventService } from './Services/eventservice'
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { RegisterOthersComponent } from '../app/Register/app.registerothers.component';
import { DatePicker } from '@ionic-native/date-picker';
import { SearchFoodByNutrientDetails } from '../app/SearchFoodByNutrients/app.foodsbynutrivaluedetails.component'



@NgModule({
  declarations: [
    MyDietNActivity,
    OtherInfoComponent,
    SearchFoodByNutrient,
    SearchFoodByLanguage,
    FoodsByLanguageDetails,
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RegisterComponent,
    HomeComponent,
    NutrientRequirementsComponent,
    BMICalcComponent,
    BMIReultsComponent,
    RDAComponent,
    NutrientsInMyFoodComponent,
    NavBarComponent,
    RDAIndiansComponent,
    GetRawFoodComponent,
    RawFoodComponent,
    KnowRawFoodValuesComponent,
    GetRecipeComponent,
    RecipeComponent,
    KnowRecipeValuesComponent
    , CreateRecipeComponent,
    ConsuptionComponent,
    ConsuptionDetailsComponent,
    ExpenditureComponent,
    PrintNumbersPipe,
    BalancesheetComponent,
    RegisterOthersComponent,
    SearchFoodByNutrientDetails,
    LabelFood,
    Source,
    About,
    SplashComponent,
    LoginComponent,
    UserGuide,
    ContactUs,
    Version,
    Terms

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    JsonpModule,
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginComponent,
    UserGuide,
    MyDietNActivity,
    OtherInfoComponent,
    SearchFoodByNutrient,
    SearchFoodByLanguage,
    FoodsByLanguageDetails,
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RegisterComponent,
    HomeComponent,
    NutrientRequirementsComponent,
    BMICalcComponent,
    BMIReultsComponent,
    RDAComponent,
    NutrientsInMyFoodComponent,
    NavBarComponent,
    RDAIndiansComponent,
    GetRawFoodComponent,
    RawFoodComponent,
    KnowRawFoodValuesComponent,
    GetRecipeComponent,
    RecipeComponent,
    KnowRecipeValuesComponent,
    CreateRecipeComponent,
    ConsuptionComponent,
    ConsuptionDetailsComponent,
    ExpenditureComponent,
    BalancesheetComponent,
    RegisterOthersComponent,
    SearchFoodByNutrientDetails,
    LabelFood,
    Source,
    About,
    ContactUs,
    SplashComponent,
    Version,
    Terms
  ],
  providers: [ SpinnerDialog,  SplashScreen, DatePicker, SQLite, HttpRequest, NINService, NinDBService, DBService, EventService, StatusBar, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
