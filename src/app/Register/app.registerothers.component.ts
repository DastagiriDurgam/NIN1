import { Component } from '@angular/core';

import { HomeComponent } from '../Home/app.home.component';
import { NavController } from 'ionic-angular';
import { NINService } from '../Services/ninhttpservice';
import { Storage } from '@ionic/storage'
import { DBService } from '../Services/dbservice'
import { EventService } from '../Services/eventservice'
declare var window;


@Component({
    selector: 'nin-register',
    templateUrl: './registerother.html',
    styles: [`
 
  `]
})
export class RegisterOthersComponent {
    devHeight ;
    rootPage: any = HomeComponent;
    pageTitle = "User Details"
    // storage = new Storage();
    usename: string = "";
    email_address: string = "";
    mobile_number = "";
    gender: string = 'male';
    location: string = '';
    isPrimary: boolean = true;
    errorMessage: any = {};
    statesList: any = [];
    countriesList: any = [];
    currentcountry: any = "India";
    currentstate: any = "0";
    isDataLoaded: boolean = true;
    terms: boolean = false;
    userData: any = {};
    constructor(private navController: NavController, private storage:Storage, private ninService: NINService, private dbservice: DBService, private eventservice: EventService) {

    }

    ngOnInit() {
        let prevRegDetails = [];
        this.storage.get('regDetails').then((data) => {
            if (data.length > 0) {
                prevRegDetails = data;
                console.log(prevRegDetails);
                this.userData = prevRegDetails.filter((item) => {
                    return item.Primary;
                })[0];
            }
        });
        this.getStatesData();
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



    getStatesData() {

       
        let getRecipiesQuery = "select *from states";      

        this.dbservice.getDataFromTable('states', 'recipes.sql', getRecipiesQuery);

        this.eventservice.getMessage().subscribe((data) => {
            if (data.name == 'states') {
                this.statesList = Array.from(data.value.values);

            }


        });


    }

   

    getCountriesData() {

        let createQuery = "CREATE TABLE IF NOT EXISTS `language_codes` (   `sno` int(2) NOT NULL,   `languages` varchar(15) DEFAULT NULL,   `abbreviation` varchar(6) DEFAULT NULL )";

        let insertQuery = "INSERT INTO `language_codes` (`sno`, `languages`, `abbreviation`) VALUES (1, 'Assamese', 'A.'), (2, 'Bengali', 'B.'), (3, 'Gujarati', 'G.'), (4, 'Hindi', 'H.'), (5, 'Kannada', 'Kan.'), (6, 'Kashmiri', 'Kash.'), (7, 'Khasi', 'Kh.'), (8, 'Konkani', 'Kon.'), (9, 'Malayalam', 'Mal.'), (10, 'Manipuri', 'M.'), (11, 'Marathi', 'Mar.'), (12, 'Nepali', 'N.'), (13, 'Oriya', 'O.'), (14, 'Punjabi', 'P.'), (15, 'Sanskrit', 'S.'), (16, 'Tamil', 'Tam.'), (17, 'Telugu', 'Tel.'), (18, 'Urdu ', 'U.'), (19, 'Scientific name', 'Sci.'), (20, 'Common name', 'Common')";

        let getRecipiesQuery = "select * from language_codes";

        this.dbservice.createTable('recipes.sql', createQuery, insertQuery, `language_codes`);


        this.dbservice.insertValuesToTable('recipes.sql', insertQuery, `language_codes`);



        this.dbservice.getDataFromTable('language_codes', 'recipes.sql', getRecipiesQuery);

        this.eventservice.getMessage().subscribe((data) => {
            if (data.name == 'language_codes') {
                this.statesList = Array.from(data.value.values);
            }


        });


    }


    register() {
        this.location = this.currentcountry;
        this.isDataLoaded = false;
        this.ninService.register({ Name: this.usename, Email: this.email_address, Phone: this.mobile_number, Primary: this.isPrimary, Gender: this.gender, Location: this.location, Relation: "", State: this.currentstate }).subscribe((response) => {
            console.log(response)
            this.isDataLoaded = true;
            if (response.Status == "Success") {
                alert('Registered Successfully');
                this.navController.push(HomeComponent);
                this.storage.get('uid').then((data) => {
                    if (data != response.Userid) {
                        this.storage.set('uid', response.Userid);
                        this.storage.set('uname', this.usename);
                    }
                });

            } else if (response.Status == "Fail") {
                // alert(response.Error);
            }
        });


    }

restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }


}