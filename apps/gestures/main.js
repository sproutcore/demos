// ==========================================================================
// Project:   Gestures
// Copyright: @2015 7x7 Software, Inc.
// ==========================================================================
/*globals Gestures */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Gestures.main = function main() {

  // This is a very simple app consisting of a single pane with a lot of views in it. Typically,
  // we'd be better suited to split the views across multiple pages (SC pages are just containers
  // used to house our configured views) and we'd use an application statechart (see SC.Statechart)
  // to handle the complexity of the application state.
  var splashMainPane = Gestures.splashPage.get('mainPane');
  splashMainPane.append();

  // Append a non-visible pane to hold our audio tags for the entirety of the session.
  var audioPane = Gestures.accessoriesPage.get('audioPane');
  audioPane.append();

  // Set the initial volume of the Audio elements. Has no effect on Mobile Safari.
  audioPane.setPath('lobbyAudio.volume', 0.5);
  audioPane.setPath('gameAudio.volume', 0.8);


    // Append the thanks pane.
    // var gameEndPane = Gestures.accessoriesPage.get('gameEndPane');
    // gameEndPane.append();

};


function main() { Gestures.main(); }
