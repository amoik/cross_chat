const LS_KEY = "CHAT_CROSS_ADVANCED";

$(function()
{
	addHandlers();
	var dt = getLSData();

	if(dt != null)
	{
		var name = dt.name;
		var farbe = dt.farbe;
		$("#name").val(name);
		$("#farbe").val(farbe);
	}

	rebuildChats();
});



function addHandlers()
{
	$('#farbe').change(function()
	{
		saveLSData("farbe", $("#farbe").val());
		rebuildChats();
	});

	$('#name').change(function()
	{
		saveLSData("name", $("#name").val());
		rebuildChats();
	});




	$('#input').keypress(function(e)
	{
		if(e.which == 13)
		{
				send();
		}
	});
}

function send()
{
	var name = $("#name").val();
	var farbe = $("#farbe").val();
	var msg = $("#input").val();

	if(farbe === "")
		farbe = "black";

	if(name === "")
		alert("Es wurde kein Name angegeben!");
	else
	{
		saveLSData("name", name);
		saveLSData("farbe", farbe);
		addChatLine(name, farbe, msg);
		$("#input").val("");
		addMsg(name, msg);
	}
}

function checkDT(dt)
{
	if(!dt)
	{
		dt = new Object;
	}

	if(!dt.chat)
	{
		dt.chat = new Array;
	}
	return dt;
}

function rebuildChats()
{
	$("#chatcontent").empty();
	var dt = getLSData();
	dt = checkDT(dt);

	for(var i = 0; i < dt.chat.length; i++)
	{
		addChatLine(dt.name, dt.farbe, dt.chat[i])
	}
}


function addChatLine(name, farbe, msg)
{
	var line = "";
	line += '<li style="color:'+farbe+';">';
	line += name + ": ";
	line += msg;
	line += '</li>';

	$("#chatcontent").append(line);
}

function getLSData()
{
	return JSON.parse(localStorage.getItem(LS_KEY));
}

function addMsg(name, msg)
{
	var dt = getLSData();


	if(dt.chat === undefined)
	{
		dt.chat = new Array;
	}


	dt.chat.push(msg);
	saveLSData("chat", dt.chat);
}

function saveLSData(id, value)
{
	var old = JSON.parse(localStorage.getItem(LS_KEY));
	if(old === null)
		old = new Object;

	old[id] = value
	localStorage.setItem(LS_KEY, JSON.stringify(old))
}

function printLS()
{
	console.log(localStorage.getItem(LS_KEY));
}


function loescheAlles()
{
	localStorage.removeItem(LS_KEY);
	$("#name").val("");
	$("#farbe").val("");
	$("#chatcontent").empty();
	$("#input").val("");
}
function savePicture(imageData)
{
	$("#photoTag").prepend("<img src='data:image/jpeg;base64,"+imageData+"'></img>");
}
function onFail(message) {
    alert('Fehler: ' + message);
}


function doPhoto()
{
	navigator.camera.getPicture(savePicture,onFail,{
		quality : 75,
		destinationType : Camera.DestinationType.DATA_URL,
		sourceType : Camera.PictureSourceType.CAMERA,
		allowEdit : false,
		encodingType: Camera.EncodingType.JPEG,
		targetWidth: 100,
		targetHeight: 100,
		saveToPhotoAlbum: false
	});
}
