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
	top: 43,
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

// Create the search bar
var search = Titanium.UI.createSearchBar({
	barColor:'#000',
	showCancel:true,
	height:43,
	top:0,
	backgroundColor: '#fff',
	zindex: 2,
	touchEnabled: true,
	opacity: 1,
});

// Add the search bar to the window
win.add(search);

// Add the different event listeners for the search bar
search.addEventListener('cancel', function() {
  search.blur();
  win.remove(scrollView);
});

search.addEventListener('click', function() {
	search.focus();
	win.remove(scrollView);
});

//If change causes trouble change to return
search.addEventListener('return', function(e) {
	
	// Define the url
	// Define the url which contains the full url
	// in this case, we'll connecting to http://example.com/api/rest/node/1.json
	var url = SITE_PATH + 'search_node/retrieve.json?keys=' + e.value;
	
	//First, you'll want to check the user can access the web:
	if (Titanium.Network.online == true) {
		// Create a conection inside the variable connection
		var connection = Titanium.Network.createHTTPClient();

		// Open the connection
		connection.open("GET",url);
		
		// Log
		Ti.API.info("Connection open to " + url);
		
		// Set the header
		connection.setRequestHeader('Content-Type','application/json; charset=utf-8');
		
		// Log
		Ti.API.info("Connection set header");
		
		// Send the connection
		connection.send();
		
		// Log
		Ti.API.info("Connection sent");
		
		connection.onload = function requestReceived(e) {
			var statusCode = connection.status;
			
			// Log
			Ti.API.info("Status code is: " + statusCode);
			
			// If status is 200 (connection OK) 
			if (statusCode == 200) {
				// get the responseText from the connection made
				var response = connection.responseText;
				
				// Parse the response
				var result = JSON.parse(response);
				
				// Log
				Ti.API.info("Response is " + result);
	     
				// Hide the keyboard
				search.blur();
				
				var table = Titanium.UI.createTableView({data:result});
				
				/**
				 * how to make that when we select a title it goes
				 * to a new window and open a the complete node
				 */
				
				// add our table to the view
				view.add(table);
			}
		}
	}
});