/**
 * Remember that in the debug process we can always use:
 * Ti.API.info(foo);
 * to log something to the console
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

// Define the name of the view (view as in Drupal's view)
var drupal_view = "content";

// Define the url which contains the full url
// in this case, we'll connecting to http://example.com/api/rest/node/1.json
var url = SITE_PATH + 'views/content.json';

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
		
		// Since the data is already an object and titanium request a data array
		// we just pass it
		// also see this example:
		// var data = [{title:"Row 1"},{title:"Row 2"}];
		// var table = Titanium.UI.createTableView({data:data});
		// view.add(table);
		var table = Titanium.UI.createTableView({data:data});
		
		/**
		 * how to make that when we select a title it goes
		 * to a new window and open a the complete node
		 */
		
		// add our table to the view
		view.add(table);
		
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