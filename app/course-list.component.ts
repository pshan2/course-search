import {Component} from '@angular/core';
import {College} from './college.component';
import {papaParseService} from './papaparse.service';

@Component({
    selector: 'course-list',
    templateUrl: 'template/course-list.component.html',
    providers: [papaParseService]
})

export class CoursesListComponent{
    errorMessage: string;
    colleges: College[];
    mode = 'Observable';

    constructor(private paraseservice: papaParseService){}

    ngOnInit(){this.getColleges()}

    getColleges(){
        this.paraseservice.getSystem().subscribe(
            colleges => this.colleges = colleges,
            error => this.errorMessage = <any>error
        );
    }
}