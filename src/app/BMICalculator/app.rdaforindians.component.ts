import { Component } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite'
// import { Platform } from 'ionic-angular'
// import { Subscription } from 'rxjs';
// import { DomSanitizer } from '@angular/platform-browser'
import { NavParams } from 'ionic-angular';
import { DBService } from '../Services/dbservice'
import { EventService } from '../Services/eventservice'
declare var window;

// declare var SQL: any
//  var sql: any = SQL ; 


@Component({
  selector: 'rda-indians',
  templateUrl: './rdaforindians.html',
  styles: [`

  `]
})
export class RDAIndiansComponent {
  devHeight;
  perticularKeys :any;
  perticularsObj:any = {isLoaded:true};
  pageTitle: any = 'Recommended Dietary Allowance(RDA)';
  database: SQLite;
  gender: string = '';
  selectedParticular = "";
  isFechedData: boolean = true;
  perticularsToDisplay: any = [];
  perticularColumns: any = [];
  measureUnits: any = [];
  totalResults: any = [];
  constructor( public navParams: NavParams, private dbservice: DBService, private eventservice: EventService) {
    // this.sqlite.create({
    //   name: 'rda2010.db',
    //   location: 'default',  
    //   androidDatabaseImplementation: 2,
    //   androidLockWorkaround: 1
    // })
    //   .then((db: SQLiteObject) => {

    //     alert('create')
    //     db.executeSql('create table danceMoves(name VARCHAR(32))', {})
    //       .then(() => alert('Executed SQL'))
    //       .catch(e => console.log(e));


    //   })
    //   .catch(e => console.log(e));



  }

  ngOnInit() {

   
    let params = this.navParams.get('rdadetails');
   
    var gender = params['gender'];
    this.gender = gender;
    var perticulars = params['perticulars'];
    this.selectedParticular = perticulars;
   
    this.perticularKeys = ['netenergy', 'protein', 'visiblefat', 'calcium', 'iron', 'retinol', 'betacarotene', 'thiamin', 'riboflavin', 'pyridoxin', 'ascorbicacid', 'vitaminb12', 'zinc', 'niacinequialent', 'ditearyfolate'];
     this.perticularColumns = ["Energy(kcals)", "Protein(g)", "Visible Fat(g)", "Calcium(mg)", "Iron(mg)", "Retinol(Vit A*)(µg)", "Beta carotene(Vit A**)(µg)", "Thiamin(mg)", "Riboflavin(Vit B2)(mg)", "Pyridoxin(µg)", "Ascorbic acid(mg)", "Vitamin B12(µg)", "Zinc(mg)", "Niacin Equialent(mg)", "Dietary Folate(µg)"];
    this.measureUnits = [" kcals", " g", " g", " mg", " mg", " µg", " µg", " mg", " mg", " mg", " mg", " µg", " mg", " mg", " µg"];


        this.getRda();
    // this.onOrientationChange();
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


onGetRda(dObj, response){
  this.perticularsObj =response ;
  this.perticularsObj.isLoaded = false;
   alert(this.perticularKeys);
  this.perticularsToDisplay = [];
  this.perticularKeys.forEach((element, index) => {
    // alert(element);
      this.perticularsToDisplay.push(response[element]);
    
  });
// alert(JSON.stringify(response)); 
}
  getRda() {    
    var that = this;
    let getRecipiesQuery = "SELECT * FROM rda_2010 where gender='" + this.gender + "' AND particulars='" + this.selectedParticular + "'";  

    this.dbservice.getDataFromTable('rda', 'recipes.sql', getRecipiesQuery, function(dObj, response){
      // that.perticularsObj =response ;
      // this.perticularsObj.isLoaded = false;
      //  alert(JSON.stringify(that.perticularsObj));
      that.perticularsToDisplay = [];
      that.perticularKeys.forEach((element, index) => {
        // alert(element);
          that.perticularsToDisplay.push(response[element]);
        
      });
    // alert(JSON.stringify(response)); 
    }
  );

    this.eventservice.getMessage().subscribe((data) => {
      if (data.name == 'rda') {

        // let columns = data.value.columns.length ? data.value.columns : [];
        let values = data.value.values.length ? data.value.values : [];
      //  alert(JSON.stringify(values));
        // this.perticularsToDisplay = values[0].filter((item, index) => {
        //   if (index > 3) {
        //     return true;
        //   }
        // });

      } 


    });
  }

  submitRda() {

  }
  restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }

}
