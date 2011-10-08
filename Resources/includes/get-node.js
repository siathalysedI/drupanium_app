Ti.include('../config.js');

// Define the current window in a variable
var win = Ti.UI.currentWindow;

var url = SITE_PATH + '/node/' + 1 + '.json';

//First, you'll want to check the user can access the web:
if (Titanium.Network.online == true) {
 var xhr = Titanium.Network.createHTTPClient();
 xhr.open('GET',url);
 xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
 xhr.send();
 
 xhr.onload = function requestReceived(e) {
	   var statusCode = xhr.status;
	   if (statusCode == 200) {
	     var response = xhr.responseText;
	     var result = JSON.parse(response);
	     
	  // Message
	     var nodeTitle = Ti.UI.createLabel({
				text: result.title,
				color:'#ff0000',
				textAlign:'left',
				font:{fontSize:16, fontWeight:'normal'},
				top: 0,
				left: 28,
				right: 28,
				touchEnabled: true,
				height: "auto"
	     });
	     
	     
	     
	     scrollView.add(view);
	     view.add(nodeTitle);
	     view.add(nodeBody);
	     
	     win.add(scrollView);
	   }
 }
 
}