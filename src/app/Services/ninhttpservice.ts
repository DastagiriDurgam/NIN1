import { Injectable } from '@angular/core';
import { HttpRequest } from './httpservice'
@Injectable()
export class NINService {


    constructor(private http: HttpRequest) {

    }

    dummyCall() {
        let data = { url: '/Food/GetRawCategories', request: 'dummy' }
        return this.http.get(data.url);
    }

    login(url) {        
        return this.http.get(url);
    }
    register(requestData) {
        console.log(JSON.stringify(requestData));
        let data = { url: '/Food/RegisterUserDetails', request: requestData }
        return this.http.post(data);
    }

    submitConsumptionItem(requestData) {
        let data = { url: '/Food/RegisterUserConsumption', request: requestData }
        return this.http.post(data);
    }

    getConsumptionTotal(requestData) {
        let data = { url: '/Food/CalculateTotalUserConsumption', request: requestData }
        return this.http.post(data);
    }

    submitExpenditure(requestData) {
        let data = { url: '/Food/RegisterUserExpenditure', request: requestData }
        return this.http.post(data);
    }


    submitLabelFoodItem(requestData) {
        let data = { url: '/Food/RegisterUserLabelConsumption', request: requestData }
        return this.http.post(data);
    }

    getBalancesheet(url) {
        return this.http.get(url);
    }




}