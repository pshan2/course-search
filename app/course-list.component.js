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
var courses_service_1 = require('./courses.service');
var CourseItemComponent = (function () {
    function CourseItemComponent(courseImportService) {
        this.courseImportService = courseImportService;
        this.courses = [];
    }
    CourseItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.courses = this.courseImportService.get()
            .subscribe(function (courses) {
            _this.courses = courses;
        });
    };
    CourseItemComponent = __decorate([
        core_1.Component({
            selector: 'course-list'
        }), 
        __metadata('design:paramtypes', [courses_service_1.CourseImportService])
    ], CourseItemComponent);
    return CourseItemComponent;
}());
exports.CourseItemComponent = CourseItemComponent;
//# sourceMappingURL=course-list.component.js.map