// ==========================================================================
// Project:   ColorDemo
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*globals DesignModeDemo */


DesignModeDemo.main = function main() {
  // Configure the shared demo page.
  CommonAssets.set('sourceURL', 'https://github.com/sproutcore/demos/tree/master/apps/design_mode_demo');
  CommonAssets.set('demoContent', 'DesignModeDemo.demoPage.demoContent');

  // Append the main demo pane.
  CommonAssets.mainPage.get('mainPane').append();
};

function main() { DesignModeDemo.main(); }
