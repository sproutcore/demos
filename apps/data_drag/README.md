Data-Drag Demo
====

This demo makes use of SC.RootResponder's dataDrag events (`dataDragEntered`,
`dataDragHovered`, `dataDragExited`, and `datadragDropped`) to implement a simple
interface for accepting data drags. You can use these events to accept drops, and
to give UI feedback about drop targets.

As of v1.11, RootResponder does not perform any normalization on the (relatively
stable) data-drag browser events, instead passing them raw to your event handlers.

The app's drag-drop interface is defined in two files: resources/demo_page.js and
views/drop_target.js. In the demo page, page-wide `dataDragEntered` and
`dataDragExited` event handlers are used to highlight drop targets which can accept
a given drag's content types. In the drop target class, these events are used for
further highlighting when a valid (or invalid) drag is over it; the drop target also
handles `dataDragHovered` to tell the browser when it would like to accept a drop,
and `dataDragDropped` to actually handle said drop. (Note the specific operations
performed on events, especially in DropTargetView's `dataDragHovered` and
`dataDragDropped` handlers.)

For more, see the Events chapter in [SC.View'sdocumentation](http://docs.sproutcore.com/?#doc=SC.View&src=false).