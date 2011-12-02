/**
 * Remember that in the debug process we can always use:
 * Ti.API.info(foo);
 * to log something to the console
 */

// Include our config file
Ti.include('../config.js');

// Define the variable win to contain the current window
var win = Ti.UI.currentWindow;

// Create the label for the node title
var usernameLabel = Titanium.UI.createLabel({
	text:'Username',
	font:{fontSize:14, fontWeight: "bold"},
	left:10,
	top:10,
	width:300,
	height:'auto'
});

// Add the label to the window
win.add(usernameLabel);

// Create the textfield to hold the node title
var usernameTextfield = Titanium.UI.createTextField({
	height:35,
	top:30,
	left:10,
	width:300,
	font:{fontSize:16},
	borderWidth:2,
	borderColor:'#bbb',
	borderRadius:5,
	autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
});

// Add the textfield to the window
win.add(usernameTextfield);

//Create the label for the node title
var emailLabel = Titanium.UI.createLabel({
	text:'Email',
	font:{fontSize:14, fontWeight: "bold"},
	left:10,
	top:75,
	width:300,
	height:'auto'
});

// Add the label to the window
win.add(emailLabel);

//Create the textfield to hold the node title
var emailTextfield = Titanium.UI.createTextField({
	height:35,
	top:100,
	left:10,
	width:300,
	font:{fontSize:16},
	borderWidth:2,
	borderColor:'#bbb',
	borderRadius:5,
	autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
});

// Add the textarea to the window
win.add(emailTextfield);

//Create the label for the node title
var passwordLabel = Titanium.UI.createLabel({
	text:'Password',
	font:{fontSize:14, fontWeight: "bold"},
	left:10,
	top:150,
	width:300,
	height:'auto'
});

// Add the label to the window
win.add(passwordLabel);

//Create the textfield to hold the node title
var passwordTextfield = Titanium.UI.createTextField({
	height:35,
	top:170,
	left:10,
	width:300,
	font:{fontSize:16},
	borderWidth:2,
	borderColor:'#bbb',
	borderRadius:5,
	autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
	passwordMask:true,
});

// Add the textarea to the window
win.add(passwordTextfield);

// Add the login button
var createAccountButton = Titanium.UI.createButton({
	title:'Create account',
	height:40,
	width:200,
	top:220
});

// Add the button to the window
win.add(createAccountButton);

createAccountButton.addEventListener('click', function() {
		var newUser = {
			name: usernameTextfield.value,
			pass: passwordTextfield.value,
			mail: emailTextfield.value,
		}
		
		var account = JSON.stringify(newUser);
				
		// Define the url which contains the full url
		// in this case, we'll connecting to http://example.com/api/rest/node/1.json
		var url = REST_PATH + 'user';

		// Create a conection inside the variable connection
		var xhr = Titanium.Network.createHTTPClient();
		
		xhr.onerror = function(e) {
			Ti.UI.createAlertDialog({
				title: "Error",
				message: e.error(),
			}).show();
			Ti.API.info("IN ERROR " + e.error);
		}
		
		xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
		
		xhr.setTimeout(20000);
		
		// Open the connection
		xhr.open("POST",url);

		// Send the connection
		xhr.send(newUser);
		
		// When the connection loads we do:
		xhr.onload = function() {
			// Save the status of the connection in a variable
			// this will be used to see if we have a connection (200) or not
			var statusCode = xhr.status;
			
			// Check if we have a connection
			if(statusCode == 200) {
				alert("Account created");
				
				var response = xhr.responseText;
				
				// Parse (build data structure) the JSON response into an object (data)
				var data = JSON.parse(response);
				
				// alert(data);
				
				// Set a global variable
				Titanium.App.Properties.setInt("userUid", data.user.uid);
				Titanium.App.Properties.setInt("userSessionId", data.sessid);
				Titanium.App.Properties.setInt("userSessionName", data.sesion_name)
			}
			else {
				alert("There was an error");
			}
		}
});