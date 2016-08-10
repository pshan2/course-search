import { Component } from '@angular/core';
import { Section } from './section.component';

@Component({
    selector: 'course-item'
})
export class Course {
    id: number;
    sections: Section[];

    constructor(id, sections){
        this.id = id;
        this.sections = sections;
    }
}   