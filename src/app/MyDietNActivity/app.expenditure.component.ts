import { Component } from '@angular/core';
// declare var require: any;
import { DBService } from '../Services/dbservice'
import { EventService } from '../Services/eventservice'
import { NINService } from '../Services/ninhttpservice';
import { Storage } from '@ionic/storage';
// import { DatePicker } from '@ionic-native/date-picker';
// declare var Object;
declare var window;


interface ExpenditureItem {
  userid: any,
  activityname: any,
  energy: any,
  hours: any,
  date: any
}

@Component({
  selector: 'Energy expenditure',
  templateUrl: './expenditure.html',
  styles: [`
  `]
})
export class ExpenditureComponent {
  devHeight;
  searchStr: string = "";
  isDisplayActivityList: boolean = false;
  filteredActivities: any[] = [];
  selectedActivities: any = [];
  totalActivities: any = {};
  hours: any = "HRS";
  minuts: any = "MM";
  pageTitle = "Energy Expenditure"
  selActivity: any = "0";
  sel_date: any = "";
  expenditureDetails: any = {};
  Users: any = [];
  uid;
  tempdetails: any = [];
  // storage = new Storage();
  sel_minDate: any = "";
  sel_maxDate = "";
  constructor(private storage: Storage, private dbservice: DBService, private eventservice: EventService, private ninservice: NINService) {
    
  }

  getPhysicalActList(ele) {
    var filterStr = ele;
    if (filterStr.length > 0) {
      this.isDisplayActivityList = true;
    } else {
      this.isDisplayActivityList = false;
    }
  }
  setMaxDate() {
    var beforeDate = new Date();
    beforeDate.setDate(beforeDate.getDate());
    var dateStr = (beforeDate.getDate() / 10) < 1 ? "0" + beforeDate.getDate().toString() : beforeDate.getDate().toString();
    var monthStr = ((beforeDate.getMonth() + 1) / 10) < 1 ? "0" + (beforeDate.getMonth() + 1).toString() : (beforeDate.getMonth() + 1).toString();
    this.sel_maxDate = beforeDate.getFullYear().toString() + "-" + monthStr + "-" + dateStr;
    // alert(JSON.stringify(this.sel_maxDate));
  }

  getUsersData() {
    this.storage.get('uid').then((data) => {
      this.uid = data;

    });
    let prevRegDetails = [];
    this.storage.get('regDetails').then((data) => {
      if (data.length > 0) {
        prevRegDetails = data;
        this.Users = prevRegDetails;
      }
    });

    console.log(JSON.stringify(this.Users));
  }

  getData() {
    let createQuery = "CREATE TABLE IF NOT EXISTS IF NOT EXISTS `physical_activities_individual` (   `sno` int(2) NOT NULL,   `Activity` varchar(19) DEFAULT NULL,   `kcal_per_hour` int(3) DEFAULT NULL )";


    let insertQuery = "INSERT INTO `physical_activities_individual` (`sno`, `Activity`, `kcal_per_hour`) VALUES (1, 'Cleaning/Mopping', 210), (2, 'Gardening', 300), (3, 'Watching TV', 86), (4, 'Cycling- 15 (Km/hr)', 360), (5, 'Running- 12 (Km/hr)', 750), (6, 'Running- 10 (Km/hr)', 655), (7, 'Running- 8 (Km/hr)', 522), (8, 'Running- 6 (Km/hr)', 353), (9, 'Walking - 4 (Km/hr)', 160), (10, 'Shuttle', 348), (11, 'Table Tennis', 245), (12, 'Tennis', 392), (13, 'Volley Ball', 180), (14, 'Dancing', 372), (15, 'Fishing', 222), (16, 'Shopping', 204), (17, 'Typing', 108), (18, 'Sleeping', 57), (19, 'Standing', 132), (20, 'Sitting', 86)";
    this.dbservice.createTable('recipes.sql', createQuery, insertQuery, 'physical_activities_individual');
    this.dbservice.insertValuesToTable('recipes.sql', insertQuery, 'physical_activities_individual');

    let getRecipiesQuery = "select * from physical_activities_individual";
    var self = this;
    this.dbservice.getDataFromTable('physical_activities_individual', 'recipes.sql', getRecipiesQuery, function (a, b) {
      // self.totalActivities = b;
      // alert(JSON.stringify(a));
      // alert(JSON.stringify(b));
    });

    this.eventservice.getMessage().subscribe((data) => {
      if (data.name == 'physical_activities_individual') {
        this.totalActivities = data.value;
      }

    });


  }

  setMinDate() {
    var beforeDate = new Date();
    beforeDate.setDate(beforeDate.getDate() - 1);
    var dateStr = (beforeDate.getDate() / 10) < 1 ? "0" + beforeDate.getDate().toString() : beforeDate.getDate().toString();
    var monthStr = ((beforeDate.getMonth() + 1) / 10) < 1 ? "0" + (beforeDate.getMonth() + 1).toString() : (beforeDate.getMonth() + 1).toString();
    this.sel_minDate = beforeDate.getFullYear().toString() + "-" + monthStr + "-" + dateStr;

  }

  ngOnInit() {
    this.storage.get('totalActivities').then((data1) => {
      this.totalActivities = data1;
      //  alert(JSON.stringify(data1));
    });
    // let currentDate = new Date();

    // this.sel_date = currentDate.getFullYear().toString()+ "-" + ( currentDate.getMonth() + 1).toString() + "-" + currentDate.getDate().toString() ;
    this.getData();
    this.setMinDate();
    this.setMaxDate();
    this.tempdetails = [];
    this.getUsersData();

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


  addActivity(uid, activity, hours, minuts, date) {
    if (hours != 'HRS' && minuts != 'MM' && this.selActivity != 0 && this.sel_date != "") {
      let filterResult = this.selectedActivities.filter((item) => {
        console.log(JSON.stringify(item.activityname));
        console.log(JSON.stringify(activity[1]))
        return (item.activityname == activity[1]);
      });

      var tempDate = new Date(this.sel_date);

      if (!filterResult.length) {
        let expItem: ExpenditureItem = {
          userid: uid,
          activityname: activity[1],
          energy: activity[2] * hours + (activity[2] / 60 * minuts),
          hours: (parseInt(this.hours) * 60) + parseInt(minuts),
          date: tempDate
        };

        this.selectedActivities.push(expItem);



      }
    } else {
      alert('Please Enter All Values')
    }
  }
  clearValues() {
    this.tempdetails = [];
    this.selectedActivities = [];
    this.sel_date = '';
    this.hours = "HRS";
    this.minuts = "MM";
    this.selActivity = "0";
  }




  submit() {

    this.expenditureDetails = {
      Userexpenditure1list: this.selectedActivities,
      "total": 22.0
    };


    console.log(JSON.stringify(this.selectedActivities));

    this.ninservice.submitExpenditure(this.expenditureDetails).subscribe(
      (response) => {
        if (response.Status == 'Success') {
          this.tempdetails = [];
          alert("Successfully Saved")
          this.clearValues();
        } else {
          // alert(JSON.stringify(response));
        }
        console.log(JSON.stringify(response));
      }
    );

  }

  restricttonumbers(event) {

    if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

    } else {
      event.preventDefault();
    }

  }




}
