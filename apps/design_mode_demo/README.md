# Design Mode Demo

This demo highlights SproutCore's design modes support.

While a design may be flexible enough to stretch between a medium to a large
display width, at a certain point, it doesn't make sense to keep stretching
or compressing the layout and instead use a new "design".

In this demo, we simulate an app that supports three different design modes.
Trying to adjust the design for three different design modes would normally
be very complicated, but because support is available within SproutCore it 
can be done with relatively little code or added complexity.

The demo uses `modeAdjust` to modify the layout and specific properties such as 
isVisible and rowHeight, for the current mode.  Finally, since the design mode 
name is added as a class name to all SC.Views as well,
the styles are often modified slightly to fit.
