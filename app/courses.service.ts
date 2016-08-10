import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Course} from './course.component';
import 'papaparse';
import 'rxjs/add/operator/map';

declare var result: any;
declare var Papaparse: any;

@Injectable()
export class CourseImportService {
    constructor(private http: Http){}

    get(){
        return this.http.get('courses')
        .map(response => {
            return response;
        });
    }
}