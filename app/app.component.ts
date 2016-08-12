import { Component} from '@angular/core';
import './rxjs-operators';

//Show data here without Router (Aug 12)
import {CoursesListComponent} from './course-list.component';

@Component({
    selector: 'course-search', 
    templateUrl: 'index.html',
    directives: [CoursesListComponent]
})

export class AppComponent{};