// ==========================================================================
// Project:   FlotDemo
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*globals FlotDemo */

/** @namespace

  My cool new app.  Describe your application.

  @extends SC.Object
*/
FlotDemo = SC.Application.create(
  /** @scope FlotDemo.prototype */ {

  NAMESPACE: 'FlotDemo',
  VERSION: '0.1.0',

  currentData: [{
    "label": "Europe (EU27)",
    "data": [[1999, 3.0], [2000, 3.9], [2001, 2.0], [2002, 1.2], [2003, 1.3], [2004, 2.5], [2005, 2.0], [2006, 3.1], [2007, 2.9], [2008, 0.9]]
  },
  {
    "label": "Japan",
    "data": [[1999, -0.1], [2000, 2.9], [2001, 0.2], [2002, 0.3], [2003, 1.4], [2004, 2.7], [2005, 1.9], [2006, 2.0], [2007, 2.3], [2008, -0.7]]
  },
  {
    "label": "USA",
    "data": [[1999, 4.4], [2000, 3.7], [2001, 0.8], [2002, 1.6], [2003, 2.5], [2004, 3.6], [2005, 2.9], [2006, 2.8], [2007, 2.0], [2008, 1.1]]
  }],

  // For simulation purposes we generate random data every few seconds and assign to our currentData property bound to the view.
  generateRandomPoint: function () {
    var currentData = this.get('currentData'),
      lastData,
      lastPoint,
      lastYear,
      lastValue,
      randomDelta;

    // Europe
    lastData = currentData[0].data;
    lastPoint = lastData[lastData.length - 1];
    lastYear = lastPoint[0];
    lastValue = lastPoint[1];
    randomDelta = (Math.random() * 4) - 2;
    // Ensure that we use KVO methods when manipulating the data.
    lastData.pushObject([lastYear + 1, lastValue + randomDelta]);
    lastData.removeAt(0);

    // Japan
    lastData = currentData[1].data;
    lastPoint = lastData[lastData.length - 1];
    lastYear = lastPoint[0];
    lastValue = lastPoint[1];
    randomDelta = (Math.random() * 4) - 2;
    // Ensure that we use KVO methods when manipulating the data.
    lastData.pushObject([lastYear + 1, lastValue + randomDelta]);
    lastData.removeAt(0);

    // USA
    lastData = currentData[2].data;
    lastPoint = lastData[lastData.length - 1];
    lastYear = lastPoint[0];
    lastValue = lastPoint[1];
    randomDelta = (Math.random() * 4) - 2;
    // Ensure that we use KVO methods when manipulating the data.
    lastData.pushObject([lastYear + 1, lastValue + randomDelta]);
    lastData.removeAt(0);

    this.set('currentData', currentData);
  },

  init: function () {
    // Use invokeLater() because it is RunLoop aware and will cause bindings to flush.
    // this.invokeLater({
    //   this.generateRandomPoint();
    // }, 1000);
    SC.Timer.schedule({
      target: this,
      action: 'generateRandomPoint',
      interval: 1000,
      repeats: true
    });
  }

});
