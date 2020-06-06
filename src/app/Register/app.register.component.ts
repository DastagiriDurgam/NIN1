import { Component } from '@angular/core';

import { HomeComponent } from '../Home/app.home.component';
import { LoginComponent } from '../Login/app.login.component';
import { NavController } from 'ionic-angular';
import { NINService } from '../Services/ninhttpservice';
import { Storage } from '@ionic/storage';
import { DBService } from '../Services/dbservice';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
declare var Object;
declare var window;
@Component({
  selector: 'nin-register',
  templateUrl: './register.html',
  styles: [

  ]
})
export class RegisterComponent {
  pin = "";
  rootPage: any = HomeComponent;
  pageTitle = "Register"
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
  relation: any = "relation";
  isRestricted = false;
  devHeight: any;
  constructor(private navController: NavController,
    private ninService: NINService,
    private spinnerDialog: SpinnerDialog,
    private dbservice: DBService, private storage: Storage) {
    this.spinnerDialog.show('Loading....', null, true);
    this.dbservice.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.spinnerDialog.hide();
        let getRecipiesQuery = "select Name from 'states'";
        this.dbservice.getDataFromTable2(getRecipiesQuery).then(data => {
          this.statesList = data.values;
        });
      }
    })
  }
  intializeScripts() {

  }
  ngOnInit() {
    this.changeDivHeight();
    this.storage.get('regDetails').then((data) => {
      if (data != null && data != undefined) {
        if (data.length > 0) {
          this.isPrimary = false;
          this.pageTitle = 'Add Sub User'
          if (data.length >= 3) {
            this.isRestricted = true;
            alert('You can Add Maximun of 3 Sub Users');
          }
        }
      }
    });
    // this.onOrientationChange();
    // this.getStatesData();
    // this.getRda();
    // 
    // this.getRawFoodCategories()
    // this.getRecipies();
    // this.getPhysicalActivities();
    // this.getNutrientFromDB();
    // this.getLanguagesFromDB();
    // this.insertRawFoodsifct();
    // this.insertFoodsByLanguage();
    // this.insertRecipeValues();
    // this.insertRawfoodsIFCTReviced();

  }
  onOrientationChange() {
    this.devHeight = (window.innerHeight - 75).toString() + "px";
    var self = this;
    //window.removeEventListener("orientationchange", self.changeDivHeight, false);
    window.addEventListener("orientationchange", self.changeDivHeight, true);
  }

  changeDivHeight() {
    this.devHeight = (window.innerHeight - 100).toString() + "px";
  }

  validateForms(validateFormsArray: any[]) {
    //validateFormsArray = [// {modelName:this.relation, defaultvalue:'0',modelTitle:'relation', errorTitle:'Relation'}];
    let errorMessages: any = {};
    for (var key in validateFormsArray) {
      if (validateFormsArray.hasOwnProperty(key)) {
        var element = validateFormsArray[key];
        if (element.modelName == element.defaultvalue) {
          errorMessages[element.modelTitle] = 'Please Enter ' + element.errorTitle;
        }
      }
    }
    errorMessages.isValid = !(Object.keys(errorMessages).length > 0);
    if (!this.validatePhoneNumber() && this.isPrimary) {

      errorMessages['mobile_number'] = 'Please Enter Valid Mobile Number';
      errorMessages.isValid = false;
    }
    // if(!this.validatePin() && this.isPrimary){
    //   errorMessages['mobile_number'] = 'Please Enter Valid 4 Digit Pin Number';
    //   errorMessages.isValid = false;
    // }
    return errorMessages;
  }

  register() {
    //  this.currentstate = 'Assam';
    // {modelName:this.relation, defaultvalue:'0',modelTitle:'relation', errorTitle:'Relation'}
    if (this.isPrimary) {
      this.errorMessage = this.validateForms([{ modelName: this.mobile_number, defaultvalue: '', modelTitle: 'mobile_number', errorTitle: 'Mobile Number' }, { modelName: this.pin, defaultvalue: '', modelTitle: 'Pin', errorTitle: 'Password' }]);

    } else {
      this.errorMessage = this.validateForms([{ modelName: this.usename, defaultvalue: '', modelTitle: 'usename', errorTitle: 'User Name' }, { modelName: this.relation, defaultvalue: 'relation', modelTitle: 'relation', errorTitle: 'Relation' }]);

    }
    if (this.errorMessage.isValid) {

      this.location = this.currentcountry;
      this.isDataLoaded = false;
      let regDetails = { Name: this.usename, Email: this.email_address, Phone: this.mobile_number, Primary: this.isPrimary, Gender: this.gender, Location: this.location, Relation: this.isPrimary ? "" : this.relation, State: this.currentstate, Pin: this.pin };
      let prevRegDetails = [];
      let pdata = [];
      this.storage.get('regDetails').then((data) => {
        if (data != null && data != undefined) {
          pdata = data;
          if (data.length > 0) {
            regDetails.Primary = false;
            prevRegDetails = data;
            regDetails.Email = data[0].Email;
            regDetails.Phone = data[0].Phone;
            regDetails.Location = data[0].Location;
            regDetails.State = data[0].State;

          }
        }
        this.sendRegisterRequest(regDetails, prevRegDetails);
      });
      console.log(JSON.stringify(pdata));

    } else {
      let errors = "";
      for (var key in this.errorMessage) {
        if (this.errorMessage.hasOwnProperty(key)) {
          var element = this.errorMessage[key];
          if (key != 'isValid')
            errors += element + "\n";
        }
      }
      alert(errors)
    }

  }
  validatePin() {
    var regex = /^([SW])\w+([0-9]{4})$/;

    if (this.pin.toString().match(regex)) {
      return true;
    } else {
    }
    return false;
  }
  validatePhoneNumber() {
    var regex = /^[0]?[789]\d{9}$/;
    if (this.mobile_number.toString().match(regex)) {
      return true;
    } else {

    }
    return false;
  }
  gotoLogin() {
    this.navController.push(LoginComponent);
  }
  sendRegisterRequest(regDetails, prevRegDetails) {
    // alert(JSON.stringify(regDetails));
    this.ninService.register(regDetails).subscribe((response) => {
      // alert(JSON.stringify(regDetails));
      //  alert(JSON.stringify(response));
      this.isDataLoaded = true;
      if (response.Status == "Success") {
        // alert(JSON.stringify(regDetails));
        alert('Registered Successfully');
        this.navController.push(HomeComponent);
        this.storage.get('uid').then((data) => {
          if (data != response.Userid) {
            if (regDetails.Primary) {
              this.storage.set('uid', response.Userid);
              this.storage.set('uname', this.usename);
            }
            regDetails.uid = response.Userid;
          }
          prevRegDetails.push(regDetails);
          this.storage.set('regDetails', prevRegDetails);
        });

      } else if (response.Status == "Fail") {
        // alert(response.Error);
      }
    });
  }

  restricttonumbers(event, element) {
    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {
    } else {
      event.preventDefault();
    }
  }
}