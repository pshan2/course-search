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
var papaparse_service_1 = require('./papaparse.service');
var CoursesListComponent = (function () {
    function CoursesListComponent(paraseservice) {
        this.paraseservice = paraseservice;
        this.mode = 'Observable';
    }
    CoursesListComponent.prototype.ngOnInit = function () { this.getColleges(); };
    CoursesListComponent.prototype.getColleges = function () {
        var _this = this;
        this.paraseservice.getSystem().subscribe(function (colleges) { return _this.colleges = colleges; }, function (error) { return _this.errorMessage = error; });
    };
    CoursesListComponent = __decorate([
        core_1.Component({
            selector: 'course-list',
            template: 'course-list.component.html',
            directives: [CourseComponent]
        }), 
        __metadata('design:paramtypes', [papaparse_service_1.papaParseService])
    ], CoursesListComponent);
    return CoursesListComponent;
}());
exports.CoursesListComponent = CoursesListComponent;
//# sourceMappingURL=papaparse.component.js.map