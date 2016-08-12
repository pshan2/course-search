import {Component, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Section} from './section.component';
import {Course} from './course.component';
import {Subject} from './subject.component';
import {Program} from './program.component';
import {College} from './college.component';

declare var Papa: any;
import 'node_modules/papaparse/papaparse.js';


@Injectable()
export class papaParseService{

    constructor (private http: Http){}

    private systemurl = '_includes/documents/test.csv';

    getSystem(): Observable<College[]>{
        return this.http.get(this.systemurl).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response){
        let body = dataParse(res);
        return body;
    }

    private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    
    
}

function dataParse(res: Response): any{
        var result: any;
        Papa.parse(res.text(), {
            worker: true,
            config: {
                header: false,
                skipEmptyLines: true
            },
            error: function(err, file, inputElem, reason){
                console.log(err);
            },
            step: function(results){
                console.log(results);
                for(let arrayItem of results.data){
                    for(let item of arrayItem){
                    }
                }
                result = results;
            }
        });
        return result;
    }