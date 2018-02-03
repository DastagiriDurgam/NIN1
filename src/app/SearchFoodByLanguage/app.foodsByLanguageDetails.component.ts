import { Component } from '@angular/core';

import { DBService } from '../Services/dbservice'
import { EventService } from '../Services/eventservice';
import { NavParams } from 'ionic-angular';
// import { Storage } from '@ionic/storage'
declare var window;


@Component({
  selector: 'foodsbylanguagedetails',
  templateUrl: './foodsbylanguagedetails.html',
  styles: [`

  `]
})
export class FoodsByLanguageDetails {
  // storage = new Storage();
  devHeight = window.innerHeight;
  foodsList: any = [];
  pageTitle = "Search Food By Language";
  selectedFood: any = {};
  foodListByLang: any = [];
  languagesList:any = [];

  constructor(private dbservice: DBService, private eventservice: EventService, private navParams: NavParams) {

  }







  ngOnInit() {
   
    //  this.storage.get('languagesList').then((data1) => {
      
    //   this.languagesList  = data1;
    //   // console.log(JSON.stringify(data1));
       
    // });
    
 this.getlanguagesData();   
    this.foodsList = this.navParams.get('foods');
    this.selectedFood = this.foodsList[0];
   
    this.getfoodbylang();


    //  this.getLanguagesFromDB();
    //  this.insertFoodsByLanguage();

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



 
getlanguagesData() {
     let getRecipiesQuery = "select languages, abbreviation from language_codes";

    this.dbservice.getDataFromTable('language_codes', 'recipes.sql', getRecipiesQuery);

    this.eventservice.getMessage().subscribe((data) => {
      if (data.name == 'language_codes') {
        this.languagesList = Array.from(data.value.values);
      
      }


    });


  }

  

  getfoodbylang() {

    
   let getRecipiesQuery = "select * from foods_by_language where food_codes='" + this.selectedFood.foodcode + "'";

    this.dbservice.getDataFromTable('foods_in_language', 'recipes.sql', getRecipiesQuery);

    this.eventservice.getMessage().subscribe((data) => {
      
      if (data.name == 'foods_in_language') {
        this.foodListByLang =Array.from(data.value.values);
    //  alert(JSON.stringify(data.value.values));
        this.foodsList =[];

for (var key in this.foodListByLang) {
  if (this.foodListByLang.hasOwnProperty(key)) {
//     let el0 = this.foodListByLang[key][0];
// if(el0.include('.')){
  
//   }else{
//     el0.append('.');
//   }
 
    let langarr = this.languagesList.filter((lan)=>{
    return  ((this.foodListByLang[key][0]==lan[1])||((this.foodListByLang[key][0]+'.')==lan[1]));
  })
   this.foodsList.push({food:this.foodListByLang[key][1], language:langarr[0][0]}) ;
   
    
  }
}

      // this.generateFoodList(this.foodListByLang);
// this.foodListByLang.forEach(element => { 
  

  //  let langarr = this.languagesList.filter((lan)=>{
  //   return element[0]==lan[1];
  // });

//   console.log(JSON.stringify(langarr));
// this.foodsList.push({food:element[1], language:langarr[0][0]}) ;
// });
      
       
      } 


    });



  }

generateFoodList(array){
// let tempArray = [];
array.forEach(element => {
  if(!element[0].include('.')){
    element[0]+='.';
  }
  let langarr = this.languagesList.filter((lan)=>{
    return element[0]==lan[1];
  });

  console.log(JSON.stringify(langarr));
//  tempArray.push({food:element[1], language:})
});


}

restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }


}