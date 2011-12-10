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

// Create a user variable to hold some information about the user
var user = {
	uid: Titanium.App.Properties.getInt("userUid", 0),
}

// Create the scrollview 
var view = Titanium.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'auto',
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:true,
	top: 0,
});

// Add our scrollview to the window
win.add(view);

// Define the url which contains the full url
// See how we build the url using the win.nid which is 
// the nid property we pass to this file when we create the window
var url = REST_PATH + 'comment/' + win.cid + '.json';

// Create a conection inside the variable xhr
var xhr = Titanium.Network.createHTTPClient();

// Open the xhr
xhr.open("GET",url);

// Send the xhr
xhr.send();

// When the xhr loads we do:
xhr.onload = function() {
	// Save the status of the xhr in a variable
	// this will be used to see if we have a xhr (200) or not
	var statusCode = xhr.status;
	
	// Check if we have a xhr
	if(statusCode == 200) {
		// Save the responseText from the xhr in the response variable
		var response = xhr.responseText;
		
		// Parse (build data structure) the JSON response into an object (data)
		var data = JSON.parse(response);
		
		// ensure that the window title is set
		win.title = data.subject;
		
		// Create a label for the node title
		var commentTitle = Ti.UI.createLabel({
			// The text of the label will be the node title (data.title)
			text: data.subject,
			color:'#000',
			textAlign:'left',
			font:{fontSize:16, fontWeight:'bold'},
			top:10,
			height:18,
			left: 10,
			right: 10,
		});
		
		// Create a label for the node body
		var commentBody = Ti.UI.createLabel({
			// Because D7 uses an object for the body itself including the language
			text: data.comment_body.und[0].value,
			color:'#000',
			textAlign:'left',
			font:{fontSize:14, fontWeight:'normal'},
			top: 30,
			height: "auto",
			left: 10,
			right: 10
		});
		
		// Add both nodeTitle and nodeBody labels to our view
		view.add(commentTitle);
		view.add(commentBody);
		
	}
	else {
		// Create a label for the node title
		var errorMessage = Ti.UI.createLabel({
			// The text of the label will be the node title (data.title)
			text: "Please check your internet xhr.",
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
