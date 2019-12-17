import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../form/form.model';
import { FormControl } from '@angular/forms';

@Injectable()
export class DataService {
    public user: IUser;
    public formControl: FormControl = new FormControl();
    public userSubject: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

    constructor( ) {
        this.formControl.valueChanges.subscribe((data: IUser) => {
            this.userSubject.next(data);
        });
    }
}
