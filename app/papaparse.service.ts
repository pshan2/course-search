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
        var resultCollegeCollection = new Array<College>();
        var tempCourseCollection = new Array<Course>();
        var tempCourse = new Course(null, null, new Array<Section>());
        var tempCollege = '';
        var tempProgram = '';
        var tempSubject = '';
        var startReport = false;
        var startSection = false;
        var startAttribute = false;
        Papa.parse(res.text(), {
            worker: true,
            config: {
                header: false,
                skipEmptyLines: false
            },
            error: function(err, file, inputElem, reason){
                console.log(err);
            },
            step: function(results, tempLimit){
                //pshan Aug 15: one object.data[0] is a one line in csv file
                var line = results.data[0];
                lineCount ++;        
                //Prepare for next line
                if(allDivide(line) && !allSpace(line)){
                    startSection = true;
                }else if(allSpace(line)){
                    startAttribute = true;
                }
                else{
                    if(line[0].indexOf('Report ID') >=0){
                        //Show New Report ID. Wrap up everything before. Reset startsection/startreport/startattribute
                        lineCount = 0;
                    }
                    else if(startSection){
                        //Start A New Section (probably with a new course)
                        tempCourse.name = line[0]; 
                        tempCourse.id = line[1];
                        tempCourse.sections.push(new Section(line[3], line[4], line[5], line[6], null, null, null, null, null, null, null, null, null, null, null));
                        console.log(line);
                    }
                    else if(startAttribute){
                       var s = tempCourse.sections[tempCourse.sections.length-1];
                       s.location = line[0];
                    }
                    if(lineCount == 3){
                        //Start of New College/Program/Subject Combo
                        for(var item of line){
                            if(String(item).indexOf('Subject')>=0){
                                tempCollege = String(item.split('-')[0]).trim();
                                tempProgram = String(item.split('-')[1]).trim();
                                tempSubject = getAttributeContent(String(item.split('-')[2]).trim());
                                console.log(tempCollege + '/' + tempProgram + '/' + tempSubject);
                            }
                        }
                    }
                }
            }
        });
        return resultCollegeCollection;
    }

function getAttributeContent(item: string){
    var result = item.substr(item.indexOf(':')+2);
    return result;
}    

function allDivide(line: String[]){
    var result = false;
    for(var s of line){
        if(s.indexOf('_______________')>=0){ 
            result = true;
            break;
        }
    }
    return result;
}

function allSpace(line: String[]){
    var result = true;
    for(var s of line){
        for(var char of String(s)){
            if(s != ''){ 
                result = false;
                break;
            }
        }
        if(result == false)
            break;
    }
    return result;
}


//Tempory Code Below

function checkCollegeExist(colleges: College[], col: string){
    var result = true;
    for(var c of colleges){
        if(c.title == col){
            result = true;
            break;
        }else{
            result = false;
        }
    }
    return result;
}
function checkProgramExist(c: College, pro: string){
    var result = true;
    for(var p of c.programs){
        if(p.title == pro){
          result = true;
            break;
        }else{
            result = false;
        }
    }
    return result;
}
function checkSubjectExist(){

}
function addNewCollege(cols: Array<College>, col: College){
    cols.push(col);

}
function addNewProgram(col: College, pro: Program){
    col.programs.push(pro);
}
function addNewSubject(pro: Program, sub: Subject){
    pro.subjects.push(sub);
}

/*
//1. Check if college exists
if(resultCollegeCollection.length == 0 || !checkCollegeExist(resultCollegeCollection, newCollege)){
    var newsub = new Subject(newSubject, '', null);
    var newpro = new Program(newProgram, newsub);
    var newcol = new College(newCollege, newpro);
    resultCollegeCollection.push(newcol);
}
else{
    //2. Check if program exists. Always take the last college in college array
    if(!checkProgramExist(resultCollegeCollection[resultCollegeCollection.length-1], newProgram)){
        var newsub = new Subject(newSubject, '', null);
        var newpro = new Program(newProgram, null);
        addNewSubject(newpro, newsub);
        addNewProgram(resultCollegeCollection[resultCollegeCollection.length-1], newpro);
    }
    else{
        //3. Check if subject exists. Always take the last subject from program array
        
    }
}
*/