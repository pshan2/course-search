"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var section_component_1 = require('./section.component');
var course_component_1 = require('./course.component');
require('node_modules/papaparse/papaparse.js');
var papaParseService = (function () {
    function papaParseService(http) {
        this.http = http;
        this.systemurl = 'documents/test.csv';
    }
    papaParseService.prototype.getSystem = function () {
        return this.http.get(this.systemurl).map(this.extractData).catch(this.handleError);
    };
    papaParseService.prototype.extractData = function (res) {
        var body = dataParse(res);
        return body;
    };
    papaParseService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    papaParseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], papaParseService);
    return papaParseService;
}());
exports.papaParseService = papaParseService;
var lineCount = 0;
var readNextLine = true;
function dataParse(res) {
    var resultCollegeCollection = new Array();
    var tempCourseCollection = new Array();
    var tempCourse = new course_component_1.Course(null, null, new Array());
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
        error: function (err, file, inputElem, reason) {
            console.log(err);
        },
        step: function (results, tempLimit) {
            //pshan Aug 15: one object.data[0] is a one line in csv file
            var line = results.data[0];
            lineCount++;
            //Prepare for next line
            if (allDivide(line) && !allSpace(line)) {
                startSection = true;
            }
            else if (allSpace(line)) {
                startAttribute = true;
            }
            else {
                if (line[0].indexOf('Report ID') >= 0) {
                    //Show New Report ID. Wrap up everything before. Reset startsection/startreport/startattribute
                    lineCount = 0;
                }
                else if (startSection) {
                    //Start A New Section (probably with a new course)
                    tempCourse.name = line[0];
                    tempCourse.id = line[1];
                    tempCourse.sections.push(new section_component_1.Section(line[3], line[4], line[5], line[6], null, null, null, null, null, null, null, null, null, null, null));
                    console.log(line);
                }
                else if (startAttribute) {
                    var s = tempCourse.sections[tempCourse.sections.length - 1];
                    s.location = line[0];
                }
                if (lineCount == 3) {
                    //Start of New College/Program/Subject Combo
                    for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
                        var item = line_1[_i];
                        if (String(item).indexOf('Subject') >= 0) {
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
function getAttributeContent(item) {
    var result = item.substr(item.indexOf(':') + 2);
    return result;
}
function allDivide(line) {
    var result = false;
    for (var _i = 0, line_2 = line; _i < line_2.length; _i++) {
        var s = line_2[_i];
        if (s.indexOf('_______________') >= 0) {
            result = true;
            break;
        }
    }
    return result;
}
function allSpace(line) {
    var result = true;
    for (var _i = 0, line_3 = line; _i < line_3.length; _i++) {
        var s = line_3[_i];
        for (var _a = 0, _b = String(s); _a < _b.length; _a++) {
            var char = _b[_a];
            if (s != '') {
                result = false;
                break;
            }
        }
        if (result == false)
            break;
    }
    return result;
}
//Tempory Code Below
function checkCollegeExist(colleges, col) {
    var result = true;
    for (var _i = 0, colleges_1 = colleges; _i < colleges_1.length; _i++) {
        var c = colleges_1[_i];
        if (c.title == col) {
            result = true;
            break;
        }
        else {
            result = false;
        }
    }
    return result;
}
function checkProgramExist(c, pro) {
    var result = true;
    for (var _i = 0, _a = c.programs; _i < _a.length; _i++) {
        var p = _a[_i];
        if (p.title == pro) {
            result = true;
            break;
        }
        else {
            result = false;
        }
    }
    return result;
}
function checkSubjectExist() {
}
function addNewCollege(cols, col) {
    cols.push(col);
}
function addNewProgram(col, pro) {
    col.programs.push(pro);
}
function addNewSubject(pro, sub) {
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
//# sourceMappingURL=papaparse.service.js.map