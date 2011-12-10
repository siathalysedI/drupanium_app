// Include our config file
Ti.include('../config.js');

// Create a user variable to hold some information about the user
var user = {
	uid: Titanium.App.Properties.getInt("userUid"),
	sessid: Titanium.App.Properties.getString("userSessionId"),
	session_name: Titanium.App.Properties.getString("userSessionName"),
	name: Titanium.App.Properties.getString("userName"),
}

// Create a new variable to map the current window
var win = Ti.UI.currentWindow;

// Check if the user is logged in
if(user.sessid) {
	// Create the scrollview to contain the view
	var view = Titanium.UI.createScrollView({
		contentWidth:'auto',
		contentHeight:'auto',
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:true,
		top: 0,
	});

	// Add the view to the window
	win.add(view);

	// Define the URL, the full path would be http://example.com/api/rest/user/USERID.json
	var url = REST_PATH + 'user/' + user.uid + '.json';

	// Create a new connection in the variable xhr
	var xhr = Titanium.Network.createHTTPClient();

	// When the connection loads do:
	xhr.onload = function() {
		// Use the status Code in the variable statusCode
		var statusCode = xhr.status;
		
		Ti.API.log("Status is: " + statusCode);
		
		// Check for the status code = 200
		if(statusCode == 200) {
			// Create a new variable to contain the response
			var response = xhr.responseText;
			
			// alert(response);
					
			// Create a new variable to process the JSON output and create an object inside data
			var data = JSON.parse(response);
			
			// alert(data);
			
			// New variable to show the user picture
			// We create an ImageView to hold the image
			var userPicture = Ti.UI.createImageView({
				// We use the property image and the SITE_PATH instead of the REST_PATH
				// also notice how data.picture.filename is build, since data.picture is also
				// an object inside data
				image: SITE_PATH + 'sites/default/files/pictures/' + data.picture.filename,
				left:10,
				top:5,
				width:150,
				height: 150,
			});
			
			// New variable to show the user name
			var userName = Ti.UI.createLabel({
				text: data.name,
				font:{fontSize:14, fontWeight: "bold"},
				left:160,
				top:5,
				width:150,
				height:'auto'
			});
			
			// New variable to show the field "field_fullname"
			var userFullName = Ti.UI.createLabel({
				// Fields have this structure, is the same as any field
				text: data.field_fullname.und[0].value,
				font:{fontSize:14, fontWeight: "bold"},
				left:160,
				top:25,
				width:150,
				height:'auto'
			});
			
			// New variable to show the field "field_country"
			var userCountry = Ti.UI.createLabel({
				text: data.field_country.und[0].value,
				font:{fontSize:14, fontWeight: "bold"},
				left:160,
				top:45,
				width:150,
				height:'auto'
			});
			
			// Create a label for the field "field_about"
			var userAbout = Ti.UI.createLabel({
				// Because D7 uses an object for the body itself including the language
				text: data.field_aboutme.und[0].value,
				color:'#000',
				textAlign:'left',
				font:{fontSize:14, fontWeight:'normal'},
				width: 150,
				top: 65,
				height: "auto",
				left: 160,
				right: 10,
			});
			
			// Add each variable (field) to the view
			view.add(userName);
			view.add(userPicture);
			view.add(userFullName);
			view.add(userCountry);
			view.add(userAbout);
		}
	}

	//Open the connection using GET
	xhr.open("GET", url);

	// Send the connection, since we're using GET we don't pass anything as argument
	xhr.send();
}
else {
	alert("You need to log in first");	
}


