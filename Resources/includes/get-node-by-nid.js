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
var url = REST_PATH + 'node/' + win.nid + '.json';

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
			height: "auto",
			top: 30,
			left: 10,
			right: 10,
		});
		
		// Add both nodeTitle and nodeBody labels to our view
		view.add(nodeTitle);
		view.add(nodeBody);
		
		// Add the buttons bar 
		var buttonsBar = Titanium.UI.createButtonBar({
			// data.comment_count has the number of comments the node has
			backgroundColor:'blue',
			labels: ['Comments (' + data.comment_count + ')', "Add comment", "Bookmark"],
		});
		
		var nodeFlagStatus = "";
		
		// Check if this node is flagged or not
		var checkFlag = {
			flag_name: "bookmarks",
			content_id: win.nid,
			uid: user.uid,
		}
		
		var isFlaggedURL = REST_PATH + 'flag/is_flagged.json';

		// Create a connection to check if this node is flagged
		var isFlagged = Titanium.Network.createHTTPClient();
			
		isFlagged.setRequestHeader('Content-Type','application/json; charset=utf-8');
			
		// Open
		isFlagged.open("POST",isFlaggedURL);

		// Send the xhr
		isFlagged.send(checkFlag);
		
		isFlagged.onload = function() {
			var status = isFlagged.status;
			if(status == 200) {
				// Save the response
				var isFlaggedResponse = isFlagged.responseText;
				
				var isFlaggedResult = JSON.parse(isFlaggedResponse);
				
				if(isFlaggedResult == 1) {
					nodeFlagStatus = "flagged";
				}
				else {
					nodeFlagStatus = "unflagged";
				}
			}
		}	
		
		// Add a flexible space so the buttons are centered
		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		}); 
		
		// Add the toolbar to the window, note that we add the flexible space,
		// then the buttonsBar and then again another flexible space
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
				var addCommentWin = Titanium.UI.createWindow({
					title: 'Add comment',
					backgroundColor: '#666',
					url: 'create-comment.js',
					nid: data.nid,
					touchEnabled: true,
					animated: true,
					modal: false,
					navBarHidden: false,
				});
				
				// Order Titanium to open the window in the same tabe
				Titanium.UI.currentTab.open(addCommentWin);
			}
			
			// Clicked on bookmark this
			else if(e.index == 2) {
				// @todo this gives an error when the node is already flagged
				
				// Define the url which contains the full url
				// in this case, we'll connecting to http://example.com/api/rest/node/1.json
				var flagURL = REST_PATH + 'flag/flag.json';
				
				var flag = {
					flag_name: "bookmarks",
					content_id: win.nid,
					uid: user.uid,
				}
				
				if(nodeFlagStatus == "flagged") {
					flag.action = "unflag";
				}
				else {
					flag.action = "flag";
				}
				
				// Create a conection inside the variable xhr
				var xhr = Titanium.Network.createHTTPClient();
				
				xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
				
				// Open the xhr
				xhr.open("POST",flagURL);

				// Send the xhr
				xhr.send(flag);
				
				// When the xhr loads we do:
				xhr.onload = function() {
					// Save the status of the xhr in a variable
					// this will be used to see if we have a xhr (200) or not
					var statusCode = xhr.status;
					
					// Check if we have a xhr
					if(statusCode == 200) {
						if(nodeFlagStatus == "flagged") {
							alert("Unbookmarked");
						}
						else {
							alert("Bookmarked");
						}
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
