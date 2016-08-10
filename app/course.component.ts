import { Component } from '@angular/core';

declare var courseInfo: any;

export class Course {
    program: any;
    subProgram: any;
    subject: any;

    constructor(subject, subprogram, program: any){
        this.program = program;
        this.subProgram = subprogram;
        this.subject = subject;
    }
}   