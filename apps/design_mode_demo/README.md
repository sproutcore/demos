# Design Mode Demo

This demo highlights SproutCore's design modes support.

While a design may be flexible enough to stretch between a medium to a large
display width, at a certain point, it doesn't make sense to keep stretching
or compressing the layout and instead use a new "design".

In this demo, we simulate an app that supports four different design modes.
Trying to adjust the design for four different design modes would normally
be very complicated, but because support is available within SproutCore it 
can be done with relatively little code and added complexity.

The demo uses `designAdjustments` to modify the layout for different modes, it
also uses the fact that the designMode property is set on each SC.View to
modify some computed properties, such as isVisible and rowHeight.  Finally,
since the design mode name is added as a class name to all SC.Views as well,
the styles are often modified slightly to fit.

Note: The performance addition of design modes should not effect an application.
It is very little additional code in the framework and optimized significantly.
Further, it only fires when the design mode changes, so on a fixed screen 
device, it will never fire.
