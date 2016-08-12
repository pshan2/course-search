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
        this.systemurl = '_includes/documents/test.csv';
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
function dataParse(res) {
    var result;
    Papa.parse(res.text(), {
        worker: true,
        config: {
            header: false,
            skipEmptyLines: true
        },
        error: function (err, file, inputElem, reason) {
            console.log(err);
        },
        step: function (results) {
            console.log(results);
            for (var _i = 0, _a = results.data; _i < _a.length; _i++) {
                var arrayItem = _a[_i];
                for (var _b = 0, arrayItem_1 = arrayItem; _b < arrayItem_1.length; _b++) {
                    var item = arrayItem_1[_b];
                }
            }
            result = results;
        }
    });
    return result;
}
//# sourceMappingURL=papaparse.service.js.map