import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import './rxjs-operators';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
@Injectable()
export class HttpRequest {
    // http://218.248.6.41/api/Food/GetRawCategories
    //   baseUrl: string = 'http://218.248.6.41/api';
      baseUrl: string = 'http://testsite.macronel.com/api';
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
    });

    constructor(private http: Http, private spinnerDialog: SpinnerDialog) { }    

    get(url: any) {       
        //this.spinnerDialog.show('Loading..');
        // let options = new RequestOptions({ headers:this.headers, responseType: ResponseContentType.Blob });
        return this.http.get(this.baseUrl + url, {headers: this.headers})
            .map((res: Response) => {return res.json()})
            .catch((error: any) =>{   return Observable.throw(error.json().error )})    }

    //Post data to server
    post(data: any) { 
        // alert(JSON.stringify(data))
        if(data.request==='dummy'){
             console.log('dummy')
              return this.http.post(this.baseUrl + data.url,  this.headers)
            .map((res: Response) =>{ this.spinnerDialog.hide() ;return res.json()} )
            .catch((error: any) =>{alert(JSON.stringify(error));   return Observable.throw(error.json().error )});
        }  
           
       this.spinnerDialog.show('Loading..');
    //    let options = new RequestOptions({ headers: this.headers, responseType: ResponseContentType.Blob });
        return this.http.post(this.baseUrl + data.url, data.request, {headers: this.headers})
            .map((res: Response) =>{ this.spinnerDialog.hide() ;return res.json()} )
            .catch((error: any) => {alert(JSON.stringify(error)); return Observable.throw(error.json().error || 'Server error')});
    }
    post_promise(data: any) {
        let headers = new Headers({ 'Content-type': 'application/json', responseType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
        return this.http.post(data.url, data.request, options).toPromise().then(res => this.wrapResponse(res));
    }
   

    private wrapResponse(res: Response) {
        alert(JSON.stringify(res))
        return {
            statusCode: res.status,
            data: res,
            isSuccess: (res.status === 200 ? true : (res.status === 201 ? true : false))
        };
    }
    
    // private extractData(res: Response) {
    //     let body = res;
    //     return body || {};
    // }

}