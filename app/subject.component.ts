import { Component } from '@angular/core';
import { Course } from './course.component';

@Component({
    selector: 'subject-item'
})
export class Subject {
    title: string;
    shortname: string;
    courses: Course[];

    constructor(title, shortname, courses){
        this.title = title;
        this.shortname = shortname;
        this.courses = courses;
    }
}   