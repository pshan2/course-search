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
var Section = (function () {
    function Section(title, format, credit, location, room, days, time, instructor, classEnrollCap, classEnrollTotal, classWaitCap, classWaitTotal, classMinTotal, Note) {
        this.title = title;
        this.format = format;
        this.credit = credit;
        this.location = location;
        this.room = room;
        this.days = days;
        this.time = time;
        this.instructor = instructor;
        this.classEnrollCap = classEnrollCap;
        this.classEnrollTotal = classEnrollTotal;
        this.classWaitCap = classWaitCap;
        this.classWaitTotal = classWaitTotal;
        this.classMinEnroll = classMinTotal;
        this.Note = Note;
    }
    Section = __decorate([
        core_1.Component({
            selector: 'section-item'
        }), 
        __metadata('design:paramtypes', [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
    ], Section);
    return Section;
}());
exports.Section = Section;
//# sourceMappingURL=section.component.js.map