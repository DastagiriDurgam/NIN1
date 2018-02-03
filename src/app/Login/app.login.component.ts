import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NINService } from '../Services/ninhttpservice';
import { HomeComponent } from '../Home/app.home.component';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'nin-login',
  templateUrl: './login.html'
})
export class LoginComponent {
  pageTitle: String = "Login";
  mobileNumber = "";
  pinnumber = "";
  // storage = new Storage();
  constructor(private ninService: NINService, private storage:Storage, private navController: NavController) {

  }

  restricttonumbers(event, element) {
    // alert(event.which)    
    if ((event.which >= 48) && (event.which <= 57) || (event.which == 8)) {
    } else {
      event.preventDefault();
    }
  }

  validateDetails() {

  }


  login() {
    let loginUrl = "/Food/ValidateUser?Pno=" + this.mobileNumber + "&pin=" + this.pinnumber;
    this.ninService.login(loginUrl).subscribe((response) => {

      if (response != null && response.length > 0 && response != "user not present") {


        response.forEach(element => {
          let regDetails = {
            Name: element.name, Email: element.email, Phone: element.mobile,
            Primary: (element.primary_user_id == null), Gender: element.gender, Location: element.location, Relation: element.relation, State: element.state, Pin: element.pin, uid: element.user_id
          };
          let prevRegDetails = [];
          // let pdata = [];

          this.storage.get('uid').then((data) => {
            if (data != regDetails.uid) {
              if (regDetails.Primary) {
                this.storage.set('uid', regDetails.uid);
                this.storage.set('uname', regDetails.Name);
              }
              regDetails.uid = element.user_id;
            }
            prevRegDetails.push(regDetails);
            this.storage.set('regDetails', prevRegDetails);
          });
          this.navController.push(HomeComponent);
        });


      }

    });
  }

}

