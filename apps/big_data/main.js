// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// ==========================================================================
/*global BigData */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
BigData.main = function main() {

  // Append the main pane.
  BigData.getPath('mainPage.mainPane').append();

  // Set the active query for the controller to get things started.
  BigData.peopleController.set('activeQuery', 'flatArrayQuery');

};


function main() { BigData.main(); }
