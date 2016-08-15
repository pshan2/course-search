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
var subject_component_1 = require('./subject.component');
var program_component_1 = require('./program.component');
var college_component_1 = require('./college.component');
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
    Papa.parse(res.text(), {
        worker: true,
        config: {
            header: false,
            skipEmptyLines: true,
            comments: '______'
        },
        error: function (err, file, inputElem, reason) {
            console.log(err);
        },
        step: function (results, tempLimit) {
            //pshan Aug 15: one object.data[0] is a one line in csv file
            var line = results.data[0];
            lineCount++;
            for (var i = 0; i < line.length; i++) {
                if (line[i].indexOf('Report ID') >= 0) {
                    lineCount = 0;
                    readNextLine = false;
                }
                if (lineCount == 3) {
                    //Start of New College/Program/Subject Combo
                    var newCollege = String(line[i].split('-')[0]).trim();
                    var newProgram = String(line[i].split('-')[1]).trim();
                    var newSubject = getAttributeContent(String(line[i].split('-')[2]).trim());
                    //1. Check if college exists
                    if (resultCollegeCollection.length == 0 || !checkCollegeExist(resultCollegeCollection, newCollege)) {
                        var newsub = new subject_component_1.Subject(newSubject, '', null);
                        var newpro = new program_component_1.Program(newProgram, newsub);
                        var newcol = new college_component_1.College(newCollege, newpro);
                        resultCollegeCollection.push(newcol);
                    }
                    else {
                        //2. Check if program exists. Always take the last college in college array
                        if (!checkProgramExist(resultCollegeCollection[resultCollegeCollection.length - 1], newProgram)) {
                            var newsub = new subject_component_1.Subject(newSubject, '', null);
                            var newpro = new program_component_1.Program(newProgram, null);
                            addNewSubject(newpro, newsub);
                            addNewProgram(resultCollegeCollection[resultCollegeCollection.length - 1], newpro);
                        }
                        else {
                        }
                    }
                    console.log(newCollege + '/' + newProgram + '/' + newSubject);
                    readNextLine = true;
                }
                //Read next line if needed
                if (!readNextLine) {
                    break;
                }
            }
            tempLimit++;
            if (tempLimit > 10) {
                Papa.abort();
            }
        }
    });
    return resultCollegeCollection;
}
function getAttributeContent(item) {
    var result = item.substr(item.indexOf(':') + 2);
    return result;
}
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
//# sourceMappingURL=papaparse.service.js.map