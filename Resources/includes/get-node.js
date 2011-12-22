/**
 * Get a simple node
 */

// Include our config file
Ti.include('../config.js');

// Define the variable win to contain the current window
var win = Ti.UI.currentWindow;

if(Titanium.App.Properties.getInt("userUid")) {
	// Create a user variable to hold some information about the user
	var user = {
		uid: Titanium.App.Properties.getInt("userUid"),
	}
}

// Create the scrollview to contain the data
var view = Titanium.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'auto',
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:true,
	top: 0,
});

// Add our view to the window
win.add(view);

// Define the url which contains the full url
// in this case, we'll connecting to http://example.com/api/rest/node/1.json
var url = REST_PATH + 'node/1' + '.json';

// Create a connection inside the variable xhr
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
		
		// Create a label for the node title
		var nodeTitle = Ti.UI.createLabel({
			// The text of the label will be the node title (data.title)
			text: data.title,
			color:'#000',
			textAlign:'left',
			font:{fontSize:16, fontWeight:'bold'},
			top:10,
			height:18,
			left: 10,
			right: 10
		});
		
		// Create a label for the node body
		var nodeBody = Ti.UI.createLabel({
			// Because D7 uses an object for the body itself including the language
			text: data.body.und[0].value,
			color:'#000',
			textAlign:'left',
			font:{fontSize:14, fontWeight:'normal'},
			top: 30,
			height: "auto",
			left: 10,
			right: 10,
		});
		
		// Add both nodeTitle and nodeBody labels to our view
		view.add(nodeTitle);
		view.add(nodeBody);
		
		// Create the flag button
		var flagButton = Titanium.UI.createButton({
			title:'Bookmark this',
			height:40,
			width:200,
			top:1000
		});

		if(user.uid) {
			// Add the flag button to the view
			view.add(flagButton);
		}
		
		// Add the event listener for when the button is created
		flagButton.addEventListener('click', function() {
			
			// Define the url which contains the full url
			// in this case, we'll connecting to http://example.com/api/rest/flag/flag.json
			var url = SITE_PATH + 'flag/flag.json';
			
			var flag = {
				flag_name: "bookmarks",
				content_id: "1",
				action: "flag",
				uid: user.uid,
			}

			// Create a conection inside the variable xhr
			var xhr = Titanium.Network.createHTTPClient();
			
			xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
			
			// Open the xhr
			xhr.open("POST",url);

			// Send the xhr
			xhr.send(flag);
			
			// When the xhr loads we do:
			xhr.onload = function() {
				// Save the status of the xhr in a variable
				// this will be used to see if we have a xhr (200) or not
				var statusCode = xhr.status;
				
				// Check if we have a xhr
				if(statusCode == 200) {
					alert("Flagged");
				}
				else {
					alert("There was an error");
				}
			}
		});

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