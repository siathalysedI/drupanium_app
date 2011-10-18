/**
 * Remember that in the debug process we can always use:
 * Ti.API.info(foo);
 * to log something to the console
 */

// Include our config file
Ti.include('../config.js');

// Define the variable win to contain the current window
var win = Ti.UI.currentWindow;

//Create a user variable to hold some information about the user
var user = {
	uid: Titanium.App.Properties.getInt("userUid", 0),
}

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
// in this case, we'll connecting to http://example.com/api/rest/node/1.json
var url = SITE_PATH + 'node/1' + '.json';

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
		
		// Create the flag button
		var flagButton = Titanium.UI.createButton({
			title:'Bookmark this',
			height:40,
			width:200,
			top:1000
		});

		// Add the flag button to the view
		view.add(flagButton);
		

		//Add the event listener for when the button is created
		flagButton.addEventListener('click', function() {
			
			// Define the url which contains the full url
			// in this case, we'll connecting to http://example.com/api/rest/node/1.json
			var url = SITE_PATH + 'flag/flag.json';
			
			var flag = {
				flag_name: "bookmarks",
				content_id: "1",
				action: "flag",
				uid: user.uid,
			}

			// Create a conection inside the variable connection
			var connection = Titanium.Network.createHTTPClient();
			
			connection.setRequestHeader('Content-Type','application/json; charset=utf-8');
			
			// Open the connection
			connection.open("POST",url);

			// Send the connection
			connection.send(flag);
			
			// When the connection loads we do:
			connection.onload = function() {
				// Save the status of the connection in a variable
				// this will be used to see if we have a connection (200) or not
				var statusCode = connection.status;
				
				// Check if we have a connection
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