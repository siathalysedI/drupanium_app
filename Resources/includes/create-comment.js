/**
 * This file is used to create a simple comment
 */

// Include the config.js file
Ti.include("../config.js");

// Include the tiajax.js library
Ti.include("../lib/tiajax.js");

// Define $ and $.ajax
$ = {}
$.ajax = Titanium.Network.ajax

//Define the variable win to contain the current window
var win = Ti.UI.currentWindow;

// Set the background of the window here
win.backgroundColor = "#333";

// Create a new button to have a cancel button
var leftButton = Ti.UI.createButton({
	title: 'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});

// Create a new event listener for the leftButton
leftButton.addEventListener("click", function() {
	// Just close this window
	win.close();
});

// We don't add the button to the window, instead, we tell the app
// to set the button as the left navigation button
win.setLeftNavButton(leftButton);

if(Titanium.App.Properties.getInt("userUid")) {
	// Create a user variable to hold some information about the user
	var user = {
		uid: Titanium.App.Properties.getInt("userUid"),
		sessid: Titanium.App.Properties.getString("userSessionId"),
		session_name: Titanium.App.Properties.getString("userSessionName"),
		name: Titanium.App.Properties.getString("userName"),
	}
	
	// Create a new view "view" to hold the form
	var view = Ti.UI.createView({
		top: 0,
	});

	// Add the view to the window
	win.add(view);

	// Create the label for the comment title
	var commentTitleLabel = Titanium.UI.createLabel({
		text:'Title',
		font:{fontSize:14, fontWeight: "bold"},
		left:10,
		top:10,
		width:300,
		height:'auto',
		color: '#fff',
	});

	// Add the label to the window
	view.add(commentTitleLabel);

	// Create the textfield to hold the comment title
	var commentTitleTextfield = Titanium.UI.createTextField({
		height:35,
		top:30,
		left:10,
		width:300,
		font:{fontSize:16},
		borderWidth:2,
		borderColor:'#bbb',
		borderRadius:5,
		backgroundColor: '#fff',
	});

	// Add the textfield to the window
	view.add(commentTitleTextfield);


	// Create the label for the comment body
	var commentBodyLabel = Titanium.UI.createLabel({
		text:'Body',
		font:{fontSize:14, fontWeight:"bold"},
		left:10,
		top:75,
		width:300,
		height:'auto',
		color: '#fff',
	});

	// Add the label to the window
	view.add(commentBodyLabel);

	// Create the textarea to hold the body
	var commentBodyTextarea = Titanium.UI.createTextArea({
		editable: true,
		value:'',
		height:150,
		width:300,
		top:100,
		font:{fontSize:16,fontWeight:'normal'},
		color:'#888',
		textAlign:'left',
		borderWidth:2,
		borderColor:'#bbb',
		borderRadius:5,
		// True = hit return and the textarea looses focus
		// False = hit return and the textarea enters an paragraph space
		suppressReturn:true,
	});

	// Add the textarea to the window
	view.add(commentBodyTextarea);


	// Add the save button
	var saveButton = Titanium.UI.createButton({
		title:'Save',
		height:40,
		width:200,
		top:270
	});

	// Add the button to the window
	view.add(saveButton);

	// Add the event listener for when the button is created
	saveButton.addEventListener("click", function() {
		
		// Create a new comment object
		var comment = {
		  comment:{
			subject: commentTitleTextfield.value,
			comment_body: {
			  und: [
			    { value: commentBodyTextarea.value, 
			    }
			  ]
			},
			uid: user.uid,
			// We need to pass the nid to the object and win.nid has the nid
			nid: win.nid
		  }
		};
		
		// Define the url 
		// in this case, we'll connecting to http://example.com/api/rest/comment
		var url = REST_PATH + 'comment';
		
		// Use $.ajax to create the comment
		$.ajax({
	        type: "POST",
	        url: url,
	        data: JSON.stringify(comment), // Stringify the comment
	        dataType: 'json',
	        contentType: 'application/json',
	        // On success do some processing like closing the window and show an alert
	        success: function(data) {
	        	win.close();
	            alert("Posted comment");
	        },
	        error: function(err) {
	        	
	        }
	    });
	});
}
else {
	alert("You need to login first");
}