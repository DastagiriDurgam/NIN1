import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ConsuptionDetailsComponent } from './app.comsuptiondetails.component'
import { Storage } from '@ionic/storage'
// import { NINService } from '../Services/ninhttpservice';
// import { DatePicker } from '@ionic-native/date-picker';
import { DBService } from '../Services/dbservice'
import { EventService } from '../Services/eventservice'
import { LabelFood } from './app.labelfood.component';
declare var window;

@Component({
  selector: 'Consuption',
  templateUrl: './Comsuption.html',
  styles: [` 

  `]
})
export class ConsuptionComponent {
  devHeight;
  currentitem: any = [];
  totalRecipies: any[];
  filteredRecipies: any[] = [];
  selected_recipe = "0";
  quantity: number = 100;
  selectedRecipies: any[] = [];
  isDisplayRecipeList: boolean = false;
  searchStr: string = "";
  // storage = new Storage();
  pageTitle = "Food Consumption"
  uid;
  uname;
  timeType = "Breakfast";
  sel_date = "";
  sel_minDate = "2017-01-01";
  sel_maxDate = "";
  maxDate = new Date();
  Users: any = [];
  constructor( private navController: NavController, private storage:Storage, private dbservice: DBService, private eventservice: EventService) {
    // this.getData();
  }


  getData() { 
    let createQuery = "CREATE TABLE IF NOT EXISTS `recipes` (  `uid_recipes` int(3) NOT NULL,  `source` varchar(4) DEFAULT NULL,  `Itemcode` varchar(7) DEFAULT NULL,  `Itemname` varchar(24) DEFAULT NULL,  `type_of_preperation` varchar(2) DEFAULT NULL,  `total_cooked_wt_g` int(4) DEFAULT NULL,  `one_serving_wt_g` int(3) DEFAULT NULL,  `serving_measure` decimal(3,2) DEFAULT NULL,  `serving_unit` varchar(9) DEFAULT NULL)";
    
    let insertQuery = "INSERT INTO `recipes` (`uid_recipes`, `source`, `Itemcode`, `Itemname`, `type_of_preperation`, `total_cooked_wt_g`, `one_serving_wt_g`, `serving_measure`, `serving_unit`) VALUES(1, 'cwue', '1.1.1', 'Rice (Cooked)', 'cr', 620, 200, '2.00', 'katori'),(2, 'cwue', '1.1.2', 'Khicheri', 'cr', 520, 200, '2.00', 'katori'),(3, 'cwue', '1.1.3', 'Pulao', 'cr', 915, 300, '2.00', 'katori'),(4, 'cwue', '1.2.1', 'Paratha', 'cr', 293, 100, '2.00', 'number'),(5, 'cwue', '1.2.2', 'phulka', 'cr', 280, 70, '2.00', 'number'),(6, 'cwue', '1.2.3', 'Puri', 'cr', 298, 75, '3.00', 'number'),(7, 'cwue', '1.2.4', 'Pathura', 'cr', 360, 36, '1.00', 'number'),(8, 'cwue', '1.2.5', 'Potato paratha', 'cr', 520, 90, '1.00', 'number'),(9, 'cwue', '2.1.1', 'Bengal gram dal', 'dl', 2470, 123, '1.00', 'katori'),(10, 'cwue', '2.1.2', 'Black gram dal', 'dl', 2365, 145, '1.00', 'katori'),(11, 'cwue', '2.1.3', 'Green gram dal', 'dl', 705, 155, '1.00', 'katori'),(12, 'cwue', '2.1.4', 'Lentil dal', 'dl', 1170, 140, '1.00', 'katori'),(13, 'cwue', '2.1.5', 'Lentil dal (Bengali)', 'dl', 780, 130, '1.00', 'katori'),(14, 'cwue', '2.1.6', 'Red gram dal', 'dl', 2760, 135, '1.00', 'katori'),(15, 'cwue', '2.2', 'Cuddy', 'dl', 2250, 140, '1.00', 'katori'),(16, 'cwue', '2.3', 'Kootu', 'dl', 2970, 155, '1.00', 'katori'),(17, 'cwue', '2.4', 'Spinach-with-dal', 'dl', 2750, 140, '1.00', 'katori'),(18, 'cwue', '2.5', 'Sambar', 'dl', 2750, 140, '1.00', 'katori'),(19, 'cwue', '3.1', 'Chole', 'wg', 1665, 160, '1.00', 'katori'),(20, 'cwue', '3.2', 'Green gram whole', 'wg', 2800, 145, '1.00', 'katori'),(21, 'cwue', '3.3', 'Lentil whole', 'wg', 3220, 130, '1.00', 'katori'),(22, 'cwue', '3.4', 'Rajmah', 'wg', 2370, 135, '1.00', 'katori'),(23, 'cwue', '3.5', 'Rawan', 'wg', 2685, 140, '1.00', 'katori'),(24, 'cwue', '4.1.1', 'Avial', 'vg', 3470, 140, '1.00', 'katori'),(25, 'cwue', '4.1.2', 'Bagara Baigan', 'vg', 2650, 170, '1.00', 'katori'),(26, 'cwue', '4.1.3', 'Char-Chari', 'vg', 860, 110, '1.00', 'katori'),(27, 'cwue', '4.1.4', 'Mirchi-ka-salan', 'vg', 2200, 95, '1.00', 'katori'),(28, 'cwue', '4.1.5', 'Peas and Panir', 'vg', 1840, 130, '1.00', 'katori'),(29, 'cwue', '4.1.6', 'Peas and Potato Curry', 'vg', 2850, 135, '1.00', 'katori'),(30, 'cwue', '4.1.7', 'Potato curry', 'vg', 285, 110, '0.75', 'katori'),(31, 'cwue', '4.1.8', 'Potato stew', 'vg', 2425, 160, '1.00', 'katori'),(32, 'cwue', '4.1.9', 'Soup', 'vg', 2270, 130, '1.00', 'katori'),(33, 'cwue', '4.1.10', 'Vegetable kofta curry', 'vg', 2060, 145, '1.00', 'katori'),(34, 'cwue', '4.1.11', 'Vegetable Khorma', 'vg', 2635, 140, '1.00', 'katori'),(35, 'cwue', '4.2.1', 'Beans and Potato', 'vg', 910, 70, '1.00', 'katori'),(36, 'cwue', '4.2.2', 'Brinjal and Potato', 'vg', 2090, 130, '1.00', 'katori'),(37, 'cwue', '4.2.3', 'Capsicum and Potato', 'vg', 1995, 125, '1.00', 'katori'),(38, 'cwue', '4.2.4', 'Cauliflower and Carrot', 'vg', 1250, 95, '1.00', 'katori'),(39, 'cwue', '4.2.5', 'Dondakaya', 'vg', 1545, 110, '1.00', 'katori'),(40, 'cwue', '4.2.6', 'Ladies Finger', 'vg', 775, 140, '1.50', 'katori'),(41, 'cwue', '4.2.7', 'Pumpkin Curry', 'vg', 2050, 165, '1.00', 'katori'),(42, 'cwue', '4.2.8', 'Ridge gourd', 'vg', 1980, 155, '1.00', 'katori'),(43, 'cwue', '4.2.9', 'Bhurtha', 'vg', 1375, 100, '0.75', 'katori'),(44, 'cwue', '4.2.10', 'Cabbage', 'vg', 1220, 100, '1.00', 'katori'),(45, 'cwue', '4.2.11', 'Stuffed Tomato', 'vg', 1140, 85, '1.00', 'number'),(46, 'cwue', '4.2.12', 'Vegetable cutlet', 'vg', 900, 60, '2.00', 'number'),(47, 'cwue', '4.2.13', 'Yam and fenugreek leaves', 'vg', 1520, 100, '1.00', 'katori'),(48, 'cwue', '5.1', 'Awal', 'bf', 850, 150, '1.50', 'katori'),(49, 'cwue', '5.2', 'Bajji', 'bf', 550, 58, '8.00', 'number'),(50, 'cwue', '5.3', 'Basen ka pura', 'bf', 607, 100, '1.00', 'number'),(51, 'cwue', '5.4', 'Cashewnut cutlets', 'bf', 920, 60, '2.00', 'number'),(52, 'cwue', '5.5', 'Chat', 'bf', 2530, 192, '5.00', 'number'),(53, 'cwue', '5.6', 'Cheese balls', 'bf', 1100, 35, '2.00', 'number'),(54, 'cwue', '5.7', 'Dahi vada', 'bf', 1415, 166, '2.00', 'number'),(55, 'cwue', '5.7.1', 'Vada', 'bf', 340, 43, '2.00', 'number'),(56, 'cwue', '5.8', 'Masala vada', 'bf', 400, 60, '3.00', 'number'),(57, 'cwue', '5.9', 'Dalia', 'bf', 665, 140, '1.00', 'katori'),(58, 'cwue', '5.10.05', 'Dosa', 'bf', 295, 84, '2.00', 'number'),(59, 'cwue', '5.10.1', 'Masala dosa', 'bf', 680, 100, '1.00', 'number'),(60, 'cwue', '5.11', 'Onion dosa', 'bf', 655, 146, '2.00', 'number'),(61, 'cwue', '5.12', 'Idli', 'bf', 519, 170, '3.00', 'number'),(62, 'cwue', '5.13', 'Kodai shooter kachori', 'bf', 365, 90, '2.00', 'number'),(63, 'cwue', '5.14', 'Onion Pakori', 'bf', 215, 60, '8.00', 'number'),(64, 'cwue', '5.15', 'Potato bonda', 'bf', 500, 83, '2.00', 'number'),(65, 'cwue', '5.16', 'Sago vada', 'bf', 865, 60, '2.00', 'number'),(66, 'cwue', '5.17', 'Samosa', 'bf', 1045, 65, '1.00', 'number'),(67, 'cwue', '5.18', 'Sandwiches', 'bf', 1000, 65, '2.00', 'number'),(68, 'cwue', '5.19', 'Savian upma', 'bf', 650, 80, '1.00', 'katori'),(69, 'cwue', '5.2', 'Upma', 'bf', 505, 160, '1.25', 'katori'),(70, 'cwue', '5.21', 'Vegetable puff', 'bf', 1060, 56, '1.00', 'number'),(71, 'cwue', '6.1', 'Basen-kee-barfi', 'st', 1195, 60, '1.00', 'big piece'),(72, 'cwue', '6.2', 'Chikki', 'st', 900, 60, '2.00', 'piece'),(73, 'cwue', '6.3', 'Dalia (sweet)', 'st', 1690, 145, '1.00', 'katori'),(74, 'cwue', '6.4', 'Fruit cake', 'st', 775, 50, '1.00', 'piece'),(75, 'cwue', '6.5', 'Jam tart', 'st', 590, 35, '1.00', 'piece'),(76, 'cwue', '6.6', 'Lemon tart', 'st', 1000, 56, '1.00', 'tart'),(77, 'cwue', '6.7', 'Nut biscuits', 'st', 640, 40, '2.00', 'number'),(78, 'cwue', '6.8', 'Rice puttu', 'st', 355, 100, '1.00', 'katori'),(79, 'cwue', '6.9', 'Sandesh', 'st', 220, 44, '2.00', 'piece'),(80, 'cwue', '6.1', 'Queen cakes', 'st', 680, 40, '1.00', 'cake'),(81, 'cwue', '7.1', 'Blanch mange', 'pd', 940, 100, '0.66', 'katori'),(82, 'cwue', '7.2', 'Bread pudding', 'pd', 2050, 125, '1.00', 'katori'),(83, 'cwue', '7.3', 'Caramelised custard', 'pd', 950, 100, '1.00', 'katori'),(84, 'cwue', '7.4', 'Double-kaa-Meetha', 'pd', 2500, 105, '1.00', 'katori'),(85, 'cwue', '7.5', 'Floating island', 'pd', 1135, 95, '1.00', 'katori'),(86, 'cwue', '7.6', 'Halwa', 'pd', 533, 100, '0.75', 'katori'),(87, 'cwue', '7.7', 'Jelly with custard', 'pd', 1850, 100, '1.00', 'katori'),(88, 'cwue', '7.8', 'Payasam', 'pd', 1905, 150, '1.00', 'katori'),(89, 'cwue', '7.9', 'Pooran poli', 'pd', 855, 71, '1.00', 'number'),(90, 'cwue', '7.1', 'Savian', 'pd', 1240, 110, '1.00', 'katori'),(91, 'cwue', '7.11', 'Steam cake', 'pd', 1500, 85, '0.50', 'katori'),(92, 'cwue', '7.12', 'Suji payasam', 'pd', 2330, 150, '1.00', 'katori'),(93, 'cwue', '7.13', 'Srikhand', 'pd', 1340, 100, '0.50', 'katori'),(94, 'cwue', '7.14', 'Walnut pudding', 'pd', 1470, 100, '0.75', 'katori'),(95, 'cwue', '8.1', 'Dam-kaa-chicken', 'nv', 1320, 125, '1.00', 'katori'),(96, 'cwue', '8.2', 'Fish cutlets', 'nv', 1240, 80, '2.00', 'number'),(97, 'cwue', '8.3', 'Fillet of fish', 'nv', 770, 115, '2.00', 'piece'),(98, 'cwue', '8.4', 'Fried fish', 'nv', 810, 85, '2.00', 'big piece'),(99, 'cwue', '8.5', 'Fish jhol', 'nv', 900, 110, '1.00', 'katori'),(100, 'cwue', '8.6', 'Irish stew', 'nv', 3810, 150, '1.00', 'katori'),(101, 'cwue', '8.7', 'Liver do piazza', 'nv', 775, 140, '1.00', 'katori'),(102, 'cwue', '8.8', 'Mutton ball curry', 'nv', 1500, 145, '1.00', 'katori'),(103, 'cwue', '8.9', 'Prawn do piazza', 'nv', 1085, 115, '0.75', 'katori'),(104, 'cwue', '8.1', 'Prawn curry', 'nv', 1690, 145, '1.00', 'katori'),(105, 'cwue', '9.1', 'Coconut chutney', 'ch', 475, 55, '2.00', 'tbsp'),(106, 'cwue', '9.2', 'Coriander chutney', 'ch', 200, 20, '1.00', 'tbsp'),(107, 'cwue', '9.3', 'Groundnut chutney', 'ch', 350, 20, '1.00', 'tbsp'),(108, 'cwue', '9.4', 'Mint chutney', 'ch', 225, 18, '1.00', 'tbsp'),(109, 'cwue', '9.5', 'Instant chutney', 'ch', 185, 35, '1.00', 'tbsp'),(110, 'cwue', '9.6', 'Tamarind chutney', 'ch', 200, 20, '1.00', 'tbsp'),(111, 'cwue', '9.7', 'Tomato chutney', 'ch', 200, 50, '0.50', 'katori')";
    this.dbservice.createTable('recipes.sql', createQuery, insertQuery, `recipes`);

    this.dbservice.insertValuesToTable('recipes.sql', insertQuery, `recipes`);

    let getRecipiesQuery = "SELECT uid_recipes, Itemname, one_serving_wt_g FROM recipes";

    this.dbservice.getDataFromTable('recipes', 'recipes.sql', getRecipiesQuery);

    this.eventservice.getMessage().subscribe((data) => {
      if (data.name == 'recipes') {
        // alert(JSON.stringify(data.value.values))
        this.totalRecipies = data.value.values;
      }
    });
  }

  onFocus(event:Event){
event.srcElement.parentElement.offsetTop;
  }

  setMinDate() {
    var beforeDate = new Date();
    beforeDate.setDate(beforeDate.getDate() - 1);
    var dateStr = (beforeDate.getDate() / 10) < 1 ? "0" + beforeDate.getDate().toString() : beforeDate.getDate().toString();
    var monthStr = ((beforeDate.getMonth() + 1) / 10) < 1 ? "0" + (beforeDate.getMonth() + 1).toString() : (beforeDate.getMonth() + 1).toString();
    this.sel_minDate = beforeDate.getFullYear().toString() + "-" + monthStr + "-" + dateStr;
    // alert(JSON.stringify(this.sel_minDate));
  }

  setMaxDate() {
    var beforeDate = new Date();
    beforeDate.setDate(beforeDate.getDate() );
    var dateStr = (beforeDate.getDate() / 10) < 1 ? "0" + beforeDate.getDate().toString() : beforeDate.getDate().toString();
    var monthStr = ((beforeDate.getMonth() + 1) / 10) < 1 ? "0" + (beforeDate.getMonth() + 1).toString() : (beforeDate.getMonth() + 1).toString();
    this.sel_maxDate = beforeDate.getFullYear().toString() + "-" + monthStr + "-" + dateStr;
    // alert(JSON.stringify(this.sel_maxDate));
  }


ionViewDidEnter(){

  this.clearValues();
}


  ngOnInit() {


    this.storage.get('totalRecipies').then((data1) => {
     
      this.totalRecipies = data1;
      // console.log(JSON.stringify(data1));
    });

    this.maxDate.setDate(this.maxDate.getDate() - 1);
    // let currentDate = new Date();
    this.setMinDate();
    this.setMaxDate();
    // this.sel_date =(currentDate.getMonth() + 1).toString() + "/" + currentDate.getDate().toString()  + "/" + currentDate.getFullYear().toString();
    // //  this.sel_minDate = "2017-05-10";   

    //     this.sel_minDate =  this.maxDate.getFullYear().toString() +"-" + this.maxDate.getMonth().toString() +"-"+ this.maxDate.getDate().toString();
    this.getUsersData();
    console.log(this.sel_date);

    this.storage.get('uid').then((data) => {   
      
      // alert(JSON.stringify("uuid"));
      // alert(JSON.stringify(data));  
      this.uid = data;

    });

    this.storage.get('uname').then((data) => {
      this.uname = data;
    });

    // this.getData();
    this.onOrientationChange();
  }

  onOrientationChange() {
    this.devHeight = (window.innerHeight - 100).toString() + "px";
    var self = this;
    //window.removeEventListener("orientationchange", self.changeDivHeight, false);
    window.addEventListener("orientationchange", self.changeDivHeight, true);

  }

  changeDivHeight() {

    this.devHeight = (window.innerHeight - 100).toString() + "px";
  }


  getUsersData() {
    let prevRegDetails = [];
    this.storage.get('regDetails').then((data) => {    
      if (data.length > 0) {
        prevRegDetails = data;
        this.Users = prevRegDetails;
      }
    });
    console.log(JSON.stringify(this.Users));
  }
showList(){
  this.isDisplayRecipeList = true;
}


  getFilteredRecipies(ele) {
    // alert(JSON.stringify(this.totalRecipies));
    var filterStr = ele;
    if (filterStr.length > 0) {
      this.filteredRecipies = this.totalRecipies.filter((item) => (item[0].toLowerCase().includes(filterStr.toLowerCase())));
      this.isDisplayRecipeList = true;
    } else {
      this.isDisplayRecipeList = false;
    }

  }

  clearRecipeValues() {
    this.selectedRecipies = [];
  }
  addRecipe(recipe, event, quantity, timetype, date) {
    if ((event.value.length != 0)&& (date.length!=0)) {
    let filterVlues = this.selectedRecipies.filter((filterItem) =>{  let isSameItem =(filterItem.item[0] == this.currentitem[0]); let isSameTime = (timetype==filterItem.timetype)  ;return isSameItem && isSameTime });
    this.isDisplayRecipeList = false;
     if (filterVlues.length < 1) {
      this.selectedRecipies.push({ item: this.currentitem, value: quantity, timetype: timetype});

     }
    event.value = "";
    }else{
       alert("Select date and item to add");
    }
  }


  getRecipeValues() {
    // this.navController.push(KnowRecipeValuesComponent, { selectedRecipies: this.selectedRecipies });
  }

  restricttonumbers(event) { 

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {
      console.log(JSON.stringify(event.which));
    } else {
      console.log('JSON.stringify(event.which)');
      event.preventDefault();
    }

  }
  setInput(input, item) {
    this.isDisplayRecipeList = false;
    input.value = item[0];
    this.currentitem = Array.from(item);
  }

  clearValues() {
    this.selectedRecipies = [];
  }



  addLabelfood() {
    this.navController.push(LabelFood);
  }

  getConsuptionDetails() {
    this.navController.push(ConsuptionDetailsComponent, { selectedRecipies: this.selectedRecipies, commons: { Userid: this.uid, Date: new Date(this.sel_date) } });

  }

  //  if (this.selectedRecipies.length > 0) {
  //     console.log(JSON.stringify({ Userid: this.uid, Date: this.sel_date, Userconsumptionlist: [{ Uid: this.selected_recipe[0], ItemName: this.selected_recipe[1], Quantity: this.quantity }] }));
  //     this.ninservice.submitConsumptionItem({ Userid: this.uid, Date: this.sel_date, Userconsumptionlist: [{ Uid: this.selected_recipe[0], ItemName: this.selected_recipe[1], Quantity: this.quantity }] }).subscribe(
  //       (response) => {
  //         if (response.Status == 'Success') {

  //         } else {
  //           // this.navController.push(ConsuptionDetailsComponent, { recipe: this.selected_recipe });
  //         }
  //         console.log(JSON.stringify(response));
  //       }
  //     );
  //   }
}