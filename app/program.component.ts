import { Component } from '@angular/core';
import { Subject } from './subject.component';

@Component({
    selector: 'program-item'
})
export class Program {
    title: string;
    subjects: Subject[];

    constructor(title, subjects){
        this.title = title;
        this.subjects = subjects;
    }
}   