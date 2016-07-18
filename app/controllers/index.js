Alloy.Globals.tabGroup=$.index;


//empieza desdel 0 .. n-1
function tabHandler(e) {

}

function table1click(evt) {

	var dia = "dia1";
	var data = obtenerDetalleEvento(dia, evt.index);	
	tableClick(evt, data, dia);
}
function table2click(evt) {

	var dia = "dia2";
	var data = obtenerDetalleEvento(dia, evt.index);	
	tableClick(evt, data, dia);
}
function table3click(evt) {

	var dia = "dia3";
	var data = obtenerDetalleEvento(dia, evt.index);	
	tableClick(evt, data, dia);
}

function tableClick(evt, talkDetails, dayTag) {
	//alert(JSON.stringify(talkDetails));
	var w = Alloy.createController('detalleEvento', {
		rowId : evt.row.rowId,
		talkDetails : talkDetails,
		day : dayTag
	}).getView().open();
	
}


function table2click(evt) {
	//alert(evt.index);
	var dia = "dia2";
	var data = obtenerDetalleEvento(dia, evt.index);
	
}

function table3click(evt) {
	//alert(evt.index);
	var dia = "dia3";
	var data = obtenerDetalleEvento(dia, evt.index);
	
}

function obtenerDetalleEvento(dia, row) {
	var arreglo = [];
	var db = Ti.Database.install('/bd/conferenciasBD.sqlite', 'conferenciasBD');

	var resulset = db.execute('SELECT * FROM ' + dia + ' where rowid = ' + parseInt(row + 1));

	while (resulset.isValidRow()) {

		arreglo.push({
			time : resulset.fieldByName('horario'),
			room : resulset.fieldByName('salon'),
			title : resulset.fieldByName('titulo'),
			speaker : resulset.fieldByName('ponente'),
			description : resulset.fieldByName('descripcion'),
			ponentebiblio : resulset.fieldByName('ponentebiblio')
		});

		resulset.next();
	}
	resulset.close();

	return arreglo;

}

function tablescroll(evt) {
	evt.cancelBubble = true;
}

function ConexionBD(dia) {
	var arreglo = [];
	var data = [];
	var db = Ti.Database.install('/bd/conferenciasBD.sqlite', 'conferenciasBD');
	if (dia == 0) {
		var resulset = db.execute('SELECT * FROM dia1');

		while (resulset.isValidRow()) {

			arreglo.push({
				time : resulset.fieldByName('horario'),
				room : resulset.fieldByName('salon'),
				title : resulset.fieldByName('titulo'),
				speaker : resulset.fieldByName('ponente'),
				description : resulset.fieldByName('descripcion'),
				ponentebiblio : resulset.fieldByName('ponentebiblio')
			});

			resulset.next();
		}
		for (var i = 0; i < arreglo.length; i++) {

			var row = Alloy.createController('fila', arreglo[i]).getView();
			data.push(row);
		};
		resulset.close();

		return data;
	} else {
		if (dia === 1) {
			var resulset = db.execute('SELECT * FROM dia2');

			var index = 0;
			while (resulset.isValidRow()) {

				arreglo.push({
					index : index,
					time : resulset.fieldByName('horario'),
					room : resulset.fieldByName('salon'),
					title : resulset.fieldByName('titulo'),
					speaker : resulset.fieldByName('ponente'),
					description : resulset.fieldByName('descripcion'),
					ponentebiblio : resulset.fieldByName('ponentebiblio')
				});
				index++;
				resulset.next();
			}
			for (var i = 0; i < arreglo.length; i++) {

				var row = Alloy.createController('fila', arreglo[i]).getView();
				data.push(row);
			};
			resulset.close();

			return data;
		} else {
			var resulset = db.execute('SELECT * FROM dia3');

			while (resulset.isValidRow()) {

				arreglo.push({
					time : resulset.fieldByName('horario'),
					room : resulset.fieldByName('salon'),
					title : resulset.fieldByName('titulo'),
					speaker : resulset.fieldByName('ponente'),
					description : resulset.fieldByName('descripcion'),
					ponentebiblio : resulset.fieldByName('ponentebiblio')
				});

				resulset.next();
			}
			for (var i = 0; i < arreglo.length; i++) {

				var row = Alloy.createController('fila', arreglo[i]).getView();
				data.push(row);
			};
			resulset.close();

			return data;
		};
	};

}

function accesoQR(e) {
	//alert('me presionaste');
	if (OS_IOS) {
		$.index.openWindow(Alloy.createController('viewQR').getView());
	} else if (OS_ANDROID) {
		Alloy.createController('viewQR').getView().open();
	}
}

function clickmap(evt) {
	var lugar = $.lblDir.getText();
	Ti.Platform.openURL('https://maps.google.com/maps?q=' + encodeURIComponent(lugar));
}

function onClickTel(evt) {
	var tel = $.lblTel.getText();

	if (OS_IOS) {
		// canOpenURL is iOS only
		if (Ti.Platform.canOpenURL('tel://' + tel)) {
			tel = tel.replace("(0)", "").replace("(", "").replace(")", "").replace("-", "").replace("/", "").split(' ').join('');
			Ti.Platform.openURL('tel://' + tel);
		} else {
			alert(L('no_phone'));
		}
	} else {
		tel = tel.replace("(0)", "").replace("(", "").replace(")", "").replace("-", "").replace("/", "").split(' ').join('');
		Ti.Platform.openURL('tel://' + tel);
	}

}

$.index.addEventListener('open', function(evt) {
	if (OS_ANDROID) {
		var activity = evt.source.getActivity();
		var actionbar = activity.actionBar;
		actionbar.title = "Conferencia Alloy";
		//actionbar.icon = "appicon.png";

		var dataDia1 = ConexionBD(0);
		$.day1table.setData(dataDia1);

		var dataDia2 = ConexionBD(1);
		$.day2table.setData(dataDia2);

		var dataDia3 = ConexionBD(2);
		$.day3table.setData(dataDia3);

	};
});



var dataArray = [];

fetchTwitter();

function fetchTwitter(e) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.timeout = 1000000;
	xhr.open("GET", "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=InnovacionCDMX");

	xhr.setRequestHeader("Authorization", 'OAuth oauth_consumer_key="PPrqZxQZro0hz7VasWL8UC8qC", oauth_nonce="81ab49bd0c6c89e1e1fe4bfababea70c", oauth_signature="Wgjtb9v3b%2BxqzD0Qy2jVOzHv5aQ%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1468275251", oauth_version="1.0"');
	xhr.onload = function() {
		var tweets = JSON.parse(this.responseText);

		dataArray = [];

		for (var c = 0; c < tweets.length; c++) {
			var row = Ti.UI.createTableViewRow({
				title : tweets[c].text + "\n" + tweets[c].user.profile_image_url,

			});

			var imageAvatar = Ti.UI.createImageView({
				image : tweets[c].user.profile_image_url,
				left : 10,
				top : 20,
				width : 50,
				height : 50
			});
			row.add(imageAvatar);
			var labelUserName = Ti.UI.createLabel({
				color : '#fff',
				font : {
					fontFamily : 'Arial',
				},
				text : "\n" + tweets[c].text + "\n" + tweets[c].user.profile_image_url + "\n",
				left : 70,
				top : 25,
				width : 200,
				height : Ti.UI.FILL
			});
			row.add(labelUserName);

			var tituloLabel = Titanium.UI.createLabel({
				text : tweets[c].user.screen_name + "",
				//propiedades de la letra
				font : {
					fontFamily : 'Arial',
					fontSize : 17,
					fontWeight : 'bold'
				},
				left : 70,
				color : '#fff',
				top : 10,
				height : 20,
				width : 210
			});
			row.add(tituloLabel);

			row.addEventListener('change', function(e) {
				Ti.API.info('Busco : ' + e.value);
				alert("es:" + e.value);
			});

			/*
			 var win = Ti.UI.createWindow();
			 var webview = Ti.UI.createWebView({
			 url: 'https://twitter.com/jhozeomar'
			 });
			 win.add(webview);
			 row.add(win);*/

			dataArray.push(row);

		};
		$.tableViewTwitter.setData(dataArray);

	};

	xhr.send();
}

var openButton = Ti.UI.createButton({
	title : "Pantalla Completa",
	top : "200",
	height : "70",
	width: "150",
	left : "10",
});

openButton.addEventListener('click', function() {
	var activeMovie = Titanium.Media.createVideoPlayer({
		url : "/video/Appcelerator_Arrow__Salesforcecom_Connector_API.mp4",
		backgroundColor : 'blue',
		movieControlMode : Ti.Media.VIDEO_CONTROL_FULLSCREEN,
		mediaControlStyle : Titanium.Media.VIDEO_CONTROL_FULLSCREEN,
		scalingMode : Titanium.Media.VIDEO_SCALING_MODE_FILL,
		fullscreen : true,
		autoplay : true
	});
});

$.ventanaVideo.add(openButton);




var openButton = Ti.UI.createButton({
	title : "Pantalla Completa",
	top : "450",
	height : "70",
	width: "150",
	left : "10",
});

openButton.addEventListener('click', function() {
	var activeMovie = Titanium.Media.createVideoPlayer({
		url : "/video/Appcelerator_Arrow_MS_SQL_Connector.mp4",
		backgroundColor : 'blue',
		movieControlMode : Ti.Media.VIDEO_CONTROL_FULLSCREEN,
		mediaControlStyle : Titanium.Media.VIDEO_CONTROL_FULLSCREEN,
		scalingMode : Titanium.Media.VIDEO_SCALING_MODE_FILL,
		fullscreen : true,
		autoplay : true
	});
});

$.ventanaVideo.add(openButton);





$.paging.setScrollableView($.scrollableView);
$.index.open();
