import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventService {
    private subject = new Subject<any>();
    sendMessage(name:any, message: any) {       
        this.subject.next({name:name, value: message });
    }

    clearMessage()  {
        this.subject.next();
      
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}