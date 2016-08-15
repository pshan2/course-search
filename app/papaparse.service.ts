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

    private systemurl = 'documents/test.csv';

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


var lineCount = 0;
var readNextLine = true;
function dataParse(res: Response): any{
        var resultCollegeCollection: College[];
        Papa.parse(res.text(), {
            worker: true,
            config: {
                header: false,
                skipEmptyLines: true
            },
            error: function(err, file, inputElem, reason){
                console.log(err);
            },
            step: function(results, tempLimit){
                //pshan Aug 15: one object.data[0] is a one line in csv file
                var line = results.data[0];
                lineCount ++;
                for(var i=0; i<line.length; i++){
                    if(line[i].indexOf('Report ID') >=0){
                        lineCount = 0;
                        readNextLine = false;
                    }
                    
                    if(lineCount == 3){
                        //Start of New College/Program/Subject Combo
                        var newCollege = line[i].split('-')[0];
                        var newProgram = line[i].split('-')[1];
                        var newSubject = getAttributeContent(String(line[i].split('-')[2]));
                        console.log(newCollege + '/' + newProgram + '/' + newSubject);
                        readNextLine = true;
                    }

                    //Read next line if needed
                    if(!readNextLine){
                        break;
                    }
                }
                tempLimit ++;
                if(tempLimit > 10){
                    Papa.abort();
                }
            }
        });
        return resultCollegeCollection;
    }

function getAttributeContent(item: string){
    var result = item.substr(item.indexOf(':')+2);
    return result;
}    