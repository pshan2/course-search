import {Component} from '@angular/core';

@Component({
    selector: 'section-item'
})

export class Section{
    id: string;
    title: string;
    format: string;
    credit: number;
    location: string;
    room: number;
    days: string[];
    time: any;
    instructor: string[];
    classEnrollCap: number;
    classEnrollTotal: number;
    classWaitCap: number;
    classWaitTotal: number;
    classMinEnroll: number;
    Note: string;

    constructor(title, format, credit, location, room, days, time, instructor, classEnrollCap, classEnrollTotal, classWaitCap, classWaitTotal, classMinTotal, Note){
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
}