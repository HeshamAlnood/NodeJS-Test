let { qResult } = require("../src/db");
require([
  "require",
  "exports",
  "knockout",
  "ojs/ojbootstrap",
  "ojs/ojarraydataprovider",
  //"text!../cookbook/dataCollections/table/shared/departmentData.json",
  qResult,
  "ojs/ojtable",
  "ojs/ojknockout",
], function (require, exports, ko, ojbootstrap_1, ArrayDataProvider, deptData) {
  "use strict";

  class ViewModel {
    constructor() {
      this.deptArray = JSON.parse(deptData);
      this.dataprovider = new ArrayDataProvider(this.deptArray, {
        keyAttributes: "bill_id",
        implicitSort: [{ attribute: "bill_id", direction: "ascending" }],
      });
    }
  }
  ojbootstrap_1.whenDocumentReady().then(function () {
    ko.applyBindings(new ViewModel(), document.getElementById("table"));
  });
});
