import { Component } from '@angular/core';
import { Section } from './section.component';

@Component({
    selector: 'course-item'
})
export class Course {
    id: number;
    name: string;
    sections: Section[];

    constructor(id, name, sections){
        this.id = id;
        this.name = name;
        this.sections = sections;
    }
}   