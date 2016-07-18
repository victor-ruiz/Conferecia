// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

/**
 * variables para QR*/
var qrreader = undefined;
var qrCodeView = undefined;

qrreader = require('ti.barcode');
qrreader.allowRotation = false;
qrreader.displayedMessage = ' ';
qrreader.allowMenu = false;
qrreader.allowInstructions = false;
qrreader.useLED = false;

function closewin(evt) {
	$.winQR.close();
}

function doopen(evt) {
	reset();
	
	qrreader.capture({
        animate: true,
        overlay: overlay,
        showCancel: false,
        showRectangle: false,
        keepOpen: true,
        acceptedFormats: [
            qrreader.FORMAT_QR_CODE
        ]
    });
    //$.winQR.add(qrreader);
}

var overlay = Ti.UI.createView({
    backgroundColor: 'transparent',
    top: 0, right: 0, bottom: 0, left: 0
});



var scannedBarcodes = {}, scannedBarcodesCount = 0;
function reset() {
    scannedBarcodes = {};
    scannedBarcodesCount = 0;
}

qrreader.addEventListener('error', function (e) {
    
    alert(e.message);
});
qrreader.addEventListener('cancel', function (e) {
    Ti.API.info('Cancel received');
});

qrreader.addEventListener('success', function (e) {
    Ti.API.info('Success called with barcode: ' + e.result);
    if (!scannedBarcodes['' + e.result]) {
        scannedBarcodes[e.result] = true;
        scannedBarcodesCount += 1;
        
        qrreader.cancel();
        Ti.Media.vibrate();
		alert('data: ' + e.result);
		var vistaweb = Ti.UI.createWebView({
			url : e.result
		});
		$.winQR.add(vistaweb);
    }
});


if (Ti.Platform.osname === 'android') {
	var activity = Ti.Android.currentActivity;
	activity.addEventListener('pause', function(e) {
		Ti.API.info('Inside pause');
		if (qrCodeView != undefined) {
			qrCodeView.stop();
		}
	});
}