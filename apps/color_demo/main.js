// ==========================================================================
// Project:   ColorDemo
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*global ColorDemo, CommonAssets */


ColorDemo.main = function main() {

  // Configure the shared demo page.
  CommonAssets.set('sourceURL', 'https://github.com/sproutcore/demos/tree/master/apps/color_demo');
  CommonAssets.set('demoContent', 'ColorDemo.demoPage.demoContent');

  // Append the main demo pane.
  CommonAssets.mainPage.get('mainPane').append();

};

function main() { ColorDemo.main(); }
