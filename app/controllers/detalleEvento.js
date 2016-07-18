// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var talkDetails=args.talkDetails;

$.talktitle.text    = talkDetails[0].title;
$.time.text       = talkDetails[0].time;
$.room.text       = talkDetails[0].room;
$.description.text    = talkDetails[0].description;
//$.speakerbio.text = talkDetails[0].ponentebiblio;

if (talkDetails[0].speaker !== '' && talkDetails[0].speaker !== null){
  $.speaker.text = String.format(L('about'),talkDetails.speaker);
}else{
  $.speaker.text = '';
}

if (talkDetails[0].ponentebiblio !== '' && talkDetails[0].ponentebiblio !== null){
  $.speakerbio.text = talkDetails[0].ponentebiblio;
}else{
  $.speakerbio.text = '';
}

function closewindow(evt){
  $.talkdetails.close();
}

$.talkdetails.addEventListener('open', function(evt) {
		if (OS_ANDROID) {
			var activity = evt.source.getActivity();
			var actionbar = activity.actionBar;
			actionbar.title = talkDetails[0].title;
			actionbar.displayHomeAsUp = true;
			actionbar.onHomeIconItemSelected = function() {
				evt.source.close();
			};
		}else{//IOS
			Alloy.createController('detalleEvento').getView();
		};
	});