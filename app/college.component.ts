import { Component } from '@angular/core';
import { Program } from './program.component';

@Component({
    selector: 'college-item'
})
export class College {
    title: string;
    programs: Program[];

    constructor(title, programs){
        this.title = title;
        this.programs = programs;
    }
} 