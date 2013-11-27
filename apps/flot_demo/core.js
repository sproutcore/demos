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

  // This is our sample data.
  currentData: [{
    label: "A",
    data: [],
    color: 'rgb(0, 137, 255)',
    lines: {
      fill: true
    }
  },
  {
    label: "B",
    data: [],
    color: 'rgb(0, 255, 189)',
    lines: {
      fill: true
    }
  }],

  // Adds a new random data point and shifts each point down by one.
  addDataPoint: function () {
    var currentData = this.get('currentData'),
      lastData,
      lastPoint,
      newPoint;

    // Series 1
    lastData = currentData[0].data;
    lastPoint = lastData[lastData.length - 1];
    newPoint = this.generateRandomPoint(lastPoint);

    // Ensure that we use KVO methods when manipulating the data.
    lastData.beginPropertyChanges();
    lastData.pushObject(newPoint);
    lastData.removeAt(0);

    for (var i = 0, len = lastData.length; i < len; i++) {
      lastData[i][0] = i;
    }
    lastData.endPropertyChanges();

    // Series 2
    lastData = currentData[1].data;
    lastPoint = lastData[lastData.length - 1];
    newPoint = this.generateRandomPoint(lastPoint);
    // Ensure that we use KVO methods when manipulating the data.
    lastData.beginPropertyChanges();
    lastData.pushObject(newPoint);
    lastData.removeAt(0);

    for (i = 0, len = lastData.length; i < len; i++) {
      lastData[i][0] = i;
    }
    lastData.endPropertyChanges();
  },

  // Generates a random point near the previous point.
  generateRandomPoint: function (lastPoint) {
    var lastX = lastPoint[0],
      lastY = lastPoint[1],
      randomDelta;

    // Generate a point slightly off from the previous point.
    randomDelta = (Math.random() * 1) - 0.5;
    lastY = lastY + randomDelta;

    // Constrain the value between 0 - 10.
    lastY = Math.max(0, Math.min(10, lastY));

    return [lastX + 1, lastY];
  },

  // Generates a set of starting data.
  generateStartingData: function () {
    var currentData = this.get('currentData'),
      series1 = currentData[0].data,
      series2 = currentData[1].data,
      newPoint1 = [0, 5],
      newPoint2 = [0, 5];

    for (var i = 0; i < 120; i++) {
      newPoint1 = this.generateRandomPoint(newPoint1);
      series1.pushObject(newPoint1);

      newPoint2 = this.generateRandomPoint(newPoint2);
      series2.pushObject(newPoint2);
    }

    this.set('currentData', currentData);
  },

  // Initialize.
  init: function () {
    this.generateStartingData();

    // For simulation purposes we generate random data every few seconds and assign to our currentData property bound to the view.
    // Use SC.Timer because it is RunLoop aware and will cause bindings to flush.
    SC.Timer.schedule({
      target: this,
      action: 'addDataPoint',
      interval: 60,
      repeats: true
    });
  }

});
