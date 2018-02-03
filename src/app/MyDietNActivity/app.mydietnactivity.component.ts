import { Component } from '@angular/core';
import{NavController} from 'ionic-angular'

 import {ConsuptionComponent} from './app.comsuption.component'
  import {BalancesheetComponent} from './app.balancesheet.component'
import {ExpenditureComponent} from './app.expenditure.component'
declare var window;



@Component({
  selector: 'mydiet-n-activity',
  templateUrl: './mydietnactivity.html',
  styles: [`
 html, body {
    height: 100%;
}
 

  `]
})
export class MyDietNActivity {
  devHeight;
  pageTitle="My Diet & Activity";
    constructor(private navControlleer:NavController){

    }
 
navigate(navStr) {
    if(navStr==='Consuption'){
        this.navControlleer.push(ConsuptionComponent);
    }else if(navStr==='expenditure'){
       this.navControlleer.push(ExpenditureComponent);
    }else if(navStr==='balancesheet'){
       this.navControlleer.push(BalancesheetComponent);
    }
   
  }

  ngOnInit(){

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