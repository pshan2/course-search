"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var parseCSV = (function () {
    function parseCSV() {
        Papa.parse('_includes/documents/test.csv', complete, function (results) {
            this.papaParse = results.data;
        });
    }
    return parseCSV;
}());
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent);
//# sourceMappingURL=main.js.map