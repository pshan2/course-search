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
    var resultCollegeCollection;
    Papa.parse(res.text(), {
        worker: true,
        config: {
            header: false,
            skipEmptyLines: true
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
                    var newCollege = line[i].split('-')[0];
                    var newProgram = line[i].split('-')[1];
                    var newSubject = getAttributeContent(String(line[i].split('-')[2]));
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
//# sourceMappingURL=papaparse.service.js.map