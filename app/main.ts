import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';

declare var papaParse: any;

class parseCSV{
    papaParse: any;

    constructor(){
       Papa.parse('_includes/documents/test.csv', complete: function(results){
           this.papaParse = results.data;
       });
    }
}

bootstrap(AppComponent);