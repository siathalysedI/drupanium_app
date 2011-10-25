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

// Create a user variable to hold some information about the user
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
		
		// Add the buttons bar 
		var buttonsBar = Titanium.UI.createButtonBar({
			labels:['Comments (' + data.comment_count + ')', 'Add comment', 'Bookmark this'],
			backgroundColor:'blue'
		});
		
		// Add a flexible space so the buttons are centered
		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		}); 
		
		// Add the toolbar to the window, note that we add the flexible space,
		// then the buttonsBar and then agin another flexible space
		win.setToolbar([flexSpace,buttonsBar,flexSpace]);

		// Add an event listerner for clicks on the buttons bar
		buttonsBar.addEventListener('click', function(e) {
			// The buttons are indexed (starting from 0)
			// So we have to set every case
			
			// Clicked on comments.
			if(e.index == 0) {
				// Create a new window to load the comments.js file
				var commentsWin = Titanium.UI.createWindow({  
				    title:'Comments',
				    backgroundColor:'#fff',
				    url: 'comments.js',
				    // Send the nid to the next window
				    nid: data.nid,
				    touchEnabled: true,
				    animated: true,
				});
				
				// Order Titanium to open the window commentsWin in the same tab
				Titanium.UI.currentTab.open(commentsWin);
			} // End the comments case
			
			// Clicked on the add comment button
			else if(e.index == 1) {
				// Not working
				alert("Create form to add comment here");
			}
			
			// Clicked on bookmark this
			else if(e.index == 2) {
				// @todo this gives an error when the node is already flagged
				
				// Define the url which contains the full url
				// in this case, we'll connecting to http://example.com/api/rest/node/1.json
				var flagURL = SITE_PATH + 'flag/flag.json';
				
				var flag = {
					flag_name: "bookmarks",
					content_id: win.nid,
					action: "flag",
					uid: user.uid,
				}

				// Create a conection inside the variable connection
				var connection = Titanium.Network.createHTTPClient();
				
				connection.setRequestHeader('Content-Type','application/json; charset=utf-8');
				
				// Open the connection
				connection.open("POST",flagURL);

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
						alert("I'm sorry, there was an error " + statusCode);
					}
				}
			} // End the flag case
		}); // End the buttons bar event listener
	} // End the statusCode 200 
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
