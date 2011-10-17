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
var nodeTitleLabel = Titanium.UI.createLabel({
	text:'Title',
	font:{fontSize:14, fontWeight: "bold"},
	left:10,
	top:10,
	width:300,
	height:'auto'
});

// Add the label to the window
win.add(nodeTitleLabel);

// Create the textfield to hold the node title
var nodeTitleTextfield = Titanium.UI.createTextField({
	height:35,
	top:30,
	left:10,
	width:300,
	font:{fontSize:16},
	borderWidth:2,
	borderColor:'#bbb',
	borderRadius:5,
});

// Add the textfield to the window
win.add(nodeTitleTextfield);

// Create the label for the node body
var nodeBodyLabel = Titanium.UI.createLabel({
	text:'Body',
	font:{fontSize:14, fontWeight:"bold"},
	left:10,
	top:75,
	width:300,
	height:'auto'
});

// Add the label to the window
win.add(nodeBodyLabel);

// Create the textarea to hold the body
var nodeBodyTextarea = Titanium.UI.createTextArea({
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
win.add(nodeBodyTextarea);


// Add the save button
var saveButton = Titanium.UI.createButton({
	title:'Save',
	height:40,
	width:200,
	top:270
});

// Add the button to the window
win.add(saveButton);

// Add the event listener for when the button is created
saveButton.addEventListener('click', function() {
	
	var node = {
		title: nodeTitleTextfield.value,
		body: {
			und: {
				0: {
					value: nodeBodyTextarea.value,
				}
			}
		},
		type: "article",
	}
	
	alert(node);
	
	// Define the url which contains the full url
	// in this case, we'll connecting to http://example.com/api/rest/node/1.json
	var url = SITE_PATH + 'node/';

	// Create a conection inside the variable connection
	var connection = Titanium.Network.createHTTPClient();

	// Open the connection
	connection.open("POST",url);

	// Send the connection
	connection.send(node);

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
			
			// the reponse contains the nid and the uri
			//alert(data);
			
			alert("Content created with nid: " + data.nid);
			
			// Redirect to the new content
			// Define a new Window "nodeWindow"
            var nodeWindow = Titanium.UI.createWindow({
            	// the window is not here, but in the file get-node-by-nid.js
            	// so we load it
            	url:'get-node-by-nid.js',
            	
            	// define some basic properties
            	backgroundColor:'#fff',
            	
            	// Define the title of our new window using the node title
            	// e.rowData contains the information we defined when we passed it
            	// to Titanium.UI.createTableView using the property "data"
            	// so e.rowData.title = data.title for each of the rows in the table
            	
            	
            	// The same for the nid
            	// We send the nid as an property in this window and the 
            	// get-node-by-nid file will recognize it and use it
            	nid:data.nid,
            	
            	// a boolean indicating if the view should receive touch events (true, default) or forward them to peers (false)
            	touchEnabled: true
            });
            
            // order the app to open the nodeWindow window in the current Tab
            Titanium.UI.currentTab.open(nodeWindow,{animated:true});
            
		}
	}

});

