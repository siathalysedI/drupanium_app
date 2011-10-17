/**
 * Remember that in the debug process we can always use:
 * Ti.API.info(foo);
 * to log something to the console
 */

/**
 * this file is almost the same as the get-node with
 * one big difference, the nid is taken as an argument 
 * and is passed by other files and this file
 * recognize the nid and use it in the url to load the
 * given node nid
 */

// Include our config file
Ti.include('../config.js');

// Define the variable win to contain the current window
var win = Ti.UI.currentWindow;

// Create the scrollview to contain the view
var scrollView = Titanium.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'auto',
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:true,
	top: 0,
});

// Create a view, we'll be adding our data to this view
var view = Ti.UI.createView({
	backgroundColor:'#fff',
	width:300,
	height:2000,
	top: 0,
});

// Add our view to the scrollview
scrollView.add(view);

// Add our scrollview to the window
win.add(scrollView);

// Define the url which contains the full url
// See how we build the url using the win.nid which is 
// the nid property we pass to this file when we create the window
var url = SITE_PATH + 'node/' + win.nid + '.json';

// Create a conection inside the variable connection
var connection = Titanium.Network.createHTTPClient();

// Open the connection
connection.open("GET",url);

// Send the connection
connection.send();

// When the connection loads we do:
connection.onload = function() {
	// Save the status of the connection in a variable
	// this will be used to see if we have a connection (200) or not
	var statusCode = connection.status;
	
	// Check if we have a connection
	if(statusCode == 200) {
		// Save the responseText from the connection in the response variable
		var response = connection.responseText;
		
		// Parse (build data structure) the JSON response into an object (data)
		var data = JSON.parse(response);
		
		// ensure that the window title is set
		win.title = data.title;
		
		// Create a label for the node title
		var nodeTitle = Ti.UI.createLabel({
			// The text of the label will be the node title (data.title)
			text: data.title,
			color:'#000',
			textAlign:'left',
			font:{fontSize:16, fontWeight:'bold'},
			top:10,
			height:18
		});
		
		// Create a label for the node body
		var nodeBody = Ti.UI.createLabel({
			// Because D7 uses an object for the body itself including the language
			text: data.body.und[0].value,
			color:'#000',
			textAlign:'left',
			font:{fontSize:14, fontWeight:'normal'},
			top: 30,
			height: 1000,
		});
		
		// Add both nodeTitle and nodeBody labels to our view
		view.add(nodeTitle);
		view.add(nodeBody);
	}
	else {
		// Create a label for the node title
		var errorMessage = Ti.UI.createLabel({
			// The text of the label will be the node title (data.title)
			text: "Please check your internet connection.",
			color:'#000',
			textAlign:'left',
			font:{fontSize:24, fontWeight:'bold'},
			top:25,
			left:15,
			height:18
		});
		
		// Add the error message to the window
		win.add(errorMessage);
	}
}
