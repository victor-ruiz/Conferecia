// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};
$.row.rowId       = args.index;
$.time.text       = args.time;
$.location.text     = args.room;
$.talkname.text     = args.title;
$.speaker.text      = args.speaker;
$.talkdescription.text  = args.description;