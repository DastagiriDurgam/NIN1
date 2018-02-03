import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { RegisterOthersComponent } from '../../app/Register/app.registerothers.component';
import { RegisterComponent } from '../../app/Register/app.register.component';
import { Source } from './app.source.component';
import { About } from './app.about.component';
import { UserGuide } from './app.userguide.component';
import { ContactUs } from './app.contactus.component';
import { Version } from './app.version.component';
import { Terms } from './app.terms.component';
declare var window;

@Component({
  selector: 'other-info',
  templateUrl: './otherinfo.html',
  styles: [` 

  `]
})
export class OtherInfoComponent {
  devHeight;
  pageTitle = "Info"
  constructor(private navController: NavController) {

  }

  otherInfo(str) {
    if (str == 'details') {
      this.navController.push(RegisterOthersComponent);
    } else if (str == 'subuser') {
      this.navController.push(RegisterComponent);
    } else if (str == 'source') {
      this.navController.push(Source);
    }else if (str == 'about') {
      this.navController.push(About);
    }else if (str == 'userguide') {
      this.navController.push(UserGuide);
    }else if (str == 'contactus') {
      this.navController.push(ContactUs);
    }else if (str == 'version') {
      this.navController.push(Version);
    }else if (str == 'terms') {
      this.navController.push(Terms);
    }
  }
  register() {
  }
  ngOnInit() {
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