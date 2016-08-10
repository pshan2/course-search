import {Component} from '@angular/core';
import {Course} from './course.component';
import {CourseImportService} from './courses.service';

declare var courses: Course[];

@Component({
    selector: 'course-list'
})
export class CourseItemComponent{
    courses = courses;

    constructor(private courseImportService: CourseImportService){}

    ngOnInit(){
        this.courses = this.courseImportService.get()
        .subscribe( courses => {
            this.courses = courses;
        })
    }
}