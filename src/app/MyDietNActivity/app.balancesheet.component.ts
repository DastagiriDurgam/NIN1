import { Component } from '@angular/core';

// import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { NINService } from '../Services/ninhttpservice';
declare var window;


@Component({
    selector: 'balancesheet',
    templateUrl: './balancesheet.html',
    styles: [` 

  `]
})
export class BalancesheetComponent {
    devHeight;
    uid: any;
    pageTitle = "Balance sheet";
    enteredDate;
    // storage = new Storage();
    datestring: string = '';
    displayConsumption: any = [];
    weekday: any = new Array(7);
    datesArray: any = [];
    radioChecked = 'Consumption';
    Object: any = Object;
    Users: any = [];
    nutritionNamings: any = { "protein": "Protein(g)", "total_fat": "Fat(g)", "total_dietary_fibre": "Fibre(g)", "carbohydrate": "Carbohydrate(g)", "energy_joules": "Energy (Kcal)", "riboflavin_b2": "Vitamin B2(mg)", "total_b6": "Vitamin B6(mg)", "total_folate_b9": "Vitamin B9(µg)", "total_ascorbic_acid": "Vitamin C(mg)", "retinol": "Vitamin A(µg)", "total_carotenoids": "Carotenoids(µg)", "ergocalciferol_d2": "Vitamin D2(µg)", "cholecalciferol_d3": "Vitamin D3(µg)", "vitamin_25_hydroxy_D3": "Active Vitamin D3(µg)", "Iron_fe": "Iron(mg)", "Zinc_zn": "Zinc(mg)", "Potassium_k": "Potassium k(mg)", "sodium_na": "Sodium(mg)", "calcium_ca": "Calcium (mg)", "total_saturated_fatty_acids_TFSA": "Saturated Fat(g)" };
    responseData: any = {};
    constructor(private ninservice: NINService, private storage:Storage) {

        this.weekday[0] = "Sunday";
        this.weekday[1] = "Monday";
        this.weekday[2] = "Tuesday";
        this.weekday[3] = "Wednesday";
        this.weekday[4] = "Thursday";
        this.weekday[5] = "Friday";
        this.weekday[6] = "Saturday";
        this.datesArray = this.generateSevenDatesFromOneWeek();
    }

    ngOnInit() {


        this.storage.get('uid').then((data) => {
            this.uid = data;


            console.log(this.uid);
            let currentDate = new Date();
            let dateString = currentDate.getFullYear().toString() + '-' + currentDate.getMonth().toString() + '-' + currentDate.getDate().toString();
            console.log(dateString)
            this.getBalanceSheetValues(this.uid, dateString)

        });
        this.getUsersData();

        this.onOrientationChange();
    }

    onOrientationChange() {
        this.devHeight = (window.innerHeight - 75).toString() + "px";
        var self = this;
        window.removeEventListener("orientationchange", changeDivHeight, false);
        window.addEventListener("orientationchange", changeDivHeight, true);
        var changeDivHeight = () => {
            self.devHeight = (window.innerHeight - 75).toString() + "px";
        }

    }

    changeDivHeight() {
        this.devHeight = (window.innerHeight - 75).toString() + "px";
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

    changeObjectToAtrray(inputObject) {
        var array = [];
        var keys = Object.keys(inputObject);
        keys.forEach(element => {
            array.push({ key: element, value: inputObject[element] });
        });

        return array;
    }

    onchangeofuser() {
        let element1: any = document.getElementsByClassName('in');
        console.log(element1.detailscontainer.classList);
        if (element1.detailscontainer != undefined || element1.detailscontainer != null) {
            element1.detailscontainer.classList.remove('in');
        }
        // element1.classList.remove('in'); 

    }

    getBalanceSheetValues(uid, dateString) {
        // let urlString = '/Food/GetConsumptionByDate?userid=' + this.uid.toString() + '&date=' + dateString;
        // this.ninservice.getBalancesheet(urlString)
        //     .subscribe((response) => {
        //         console.log(response)
        //         this.displayConsumption = this.changeObjectToAtrray(response.Userconsumption);
        //     });;
    }

    datechanged(event) {
        let currentDate = new Date(event);
        this.datestring = currentDate.getFullYear().toString() + '-' + (currentDate.getMonth() + 1).toString() + '-' + currentDate.getDate().toString();
    }

    getButtonAction() {
        this.getBalanceSheetValues(this.uid, this.datestring);
    }

    generateSevenDatesFromOneWeek(): any {
        let datesArr = [];
        for (let i = 0; i < 7; i++) {
            let date = new Date();
            date.setDate(date.getDate() - i);
            datesArr.push({ weekday: this.weekday[date.getDay()], year: date.getFullYear(), month: date.getMonth() + 1, date: date.getDate(), isOpen:false });
            //  datesArr.push(this.weekday[date.getDay()] +"  " +date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate());
        }
        return datesArr;

    }
    getBalanceSheetDetails(sDate, ele: HTMLElement, index) {

         let element1: any = document.getElementsByClassName('in');        
        if (element1.detailscontainer != undefined || element1.detailscontainer != null) {
            element1.detailscontainer.classList.remove('in');
        }

        if (ele.classList.contains("in")) {
            ele.classList.remove('in');
            this.datesArray[index]['isOpen'] = false;
        } else {
            this.datesArray[index]['isOpen'] = true;
            ele.classList.add('in');
            // let urlString = '/Food/GetConsumptionByDate?userid=' + this.uid.toString() + '&date=' + sDate.year + "-" + sDate.month + "-" + sDate.date;
            let urlString = '/Food/GetConsumptionByDate?userid=' + this.uid + '&date=' + sDate.year + "-" + sDate.month + "-" + sDate.date;
            console.log(urlString);
            this.ninservice.getBalancesheet(urlString)
                .subscribe((response) => {
                   console.log(JSON.stringify(response))
                    this.responseData[sDate.date.toString() + sDate.month.toString() + sDate.year.toString()] = response;
                    this.responseData[sDate.date.toString() + sDate.month.toString() + sDate.year.toString()].isLoded = true;
                    this.responseData[sDate.date.toString() + sDate.month.toString() + sDate.year.toString()].checked = 0;
                    delete this.responseData[sDate.date.toString() + sDate.month.toString() + sDate.year.toString()]['Userconsumption']['uid_recipes'];
                });;
        }

    }

    fixedToTwoFloats(value) {
        
         if(value==null){
             return 0;
         }
        let parsedValue:any = parseFloat(value).toFixed(2);
        if (parsedValue != NaN) {
            return parsedValue;
        }
        return value;
    }

    radioOptionChecked(form, sDate) {
        console.log(form.option[0]);
        for (let i = 0; i < form.option.length; i++) {
            if (form.option[i].checked) {
                this.responseData[sDate.date.toString() + sDate.month.toString() + sDate.year.toString()].checked = i;
                // this.radioChecked = form.option[0].nextElementSibling.textContent;
            }
        }
        // form.option.filter((item, index) => {
        //     if (item.value == 'on') { 
        //         switch (index) {
        //             case 0:
        //                 this.radioChecked = 'c';
        //                 break;
        //             case 1:
        //                 this.radioChecked = 'n';
        //                 break;
        //             case 2:
        //                 this.radioChecked = 'e';
        //                 break;

        //             default:
        //                 break;
        //         }
        //     }
        //     return (item.value == 'on');
        // });
    }

    getDetails(date, category, details) {
        if (this.responseData[date] != null && this.responseData[date] != null) {
            return this.responseData[date.date.toString() + date.month.toString() + date.year.toString()][category][details];
        }
        return "";
    }
    restricttonumbers(event) {

        if ((event.which >= 48) && (event.which < 57) || (event.which == 8)) {

        } else {
            event.preventDefault();
        }

    }

    calculateBalanceValue(value1:any, value2:any){
        let result =parseFloat(value1) - parseFloat(value2);
        return result;
    }

}