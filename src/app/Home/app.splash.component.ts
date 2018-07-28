import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeComponent } from './app.home.component';
import { Storage } from '@ionic/storage'
import { RegisterComponent } from '../Register/app.register.component';

@Component({
    selector: 'splashscreen',
    templateUrl: './splash.html'
})
export class SplashComponent {
    // storage = new Storage();
    constructor(private navController: NavController, private storage:Storage) {

    }

    ngOnInit() {
       
        this.storage.get('uid').then((data) => {
            
            if (data) {
                this.navController.push(HomeComponent);
                // setTimeout(() => {
                //     this.navController.push(HomeComponent);
                // }, 8000);

            } else {
                this.navController.push(RegisterComponent);
                // setTimeout(() => {
                //     this.navController.push(RegisterComponent);
                // }, 0);

            }
        });


    }

}