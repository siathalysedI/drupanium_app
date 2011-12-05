// Include our config file
Ti.include('../config.js');

// Define the variable win to contain the current window
var win = Ti.UI.currentWindow;

var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region:{latitude: "25.6761382221336", longitude: "-100.346807166412", latitudeDelta: 0.05, longitudeDelta: 0.05},
    animate:true,
    regionFit:true,
    userLocation:false,
	touchEnabled: true,
});

// Add our scrollview to the window
win.add(mapview);

// Define the name of the view (view as in Drupal's view)
var drupal_view = "maps";

// Define the url which contains the full url
// in this case, we'll connecting to http://example.com/api/rest/node/1.json
var url = REST_PATH + 'views/' + drupal_view + '.json';

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
		var result = JSON.parse(response);
	
		/**
		* Create a new array "results"
		* This is necessary because we need to create an object
		* to send to the Table we're creating with the results
		* the table will have the title and the nid of every result
		* and we'll use the nid to move to another window when we click
		* on it.
		*/
		// var results = new Array();
		var annotations = [];
		// Start loop
		for(var key in result) {
			// Create the data variable and hold every result
			var data = result[key];
			// var data = [];
			/**
			* To see how the array is built by Services in Drupal
			* go to drupanium debug and use the views debug page
			* you'll see that the array is something like:
			*
			* 0 => array(
			* title => some title
			* date => some date
			* user => the user uid
			* type => the node type
			* nid => the node nid
			* vid => the node vid
			* )
			*/
	
			// Uncomment the next line to see the full object in JSON format
			// alert(result[key]);
			
			// Uncomment the next line to see an example of how to get the title of every result
			// alert(data.title);
			
			/**
			* We start adding the results one by one to our array "results"
			* it consists of title, nid and the property hasChild
			* in title we get the node title with data.title
			* in nid we save the node nid with data.nid (we walk the array)
			*/
			/*
			var annotationView = Ti.UI.createView();
			
			var annotationLabel = Ti.UI.createLabel({
				text: data.title,
				color:'#000',
				textAlign:'left',
				font:{fontSize:16, fontWeight:'bold'},
				top:0,
				height: "auto",
			});
			
			annotationView.add(annotationLabel);
			*/
			
			// results[key] = {title: data.title, hasChild:true, nid:data.nid};
			// alert(data);
			// alert(data.field_field_location);
			// data.body.und[0].value
			// alert(data.field_field_location[0].raw.lat);
			var annotation = Titanium.Map.createAnnotation({
				latitude: data.field_field_location[0].raw.lat,
				longitude: data.field_field_location[0].raw.lng,
				title: data.title,
				// subtitle: data.title,
				// pincolor:Titanium.Map.ANNOTATION_GREEN,
				animate:true,
				// rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
				// myid: key, // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS,
				// leftView: annotationView,
			});
			
			annotations.push(annotation);
			
			
			
			
		}
	
		// Create a new table to hold our results
		// We tell Titanium to use our array results as the Property "data"
		// See http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.TableView-object
		// Specially the properties
		// mapview.annotations = annotations;
		mapview.addAnnotations(annotations);
		
		mapview.addEventListener('click',function(evt)
				{
				var clickSource = evt.clicksource;
				Ti.API.info('mapview click clicksource = ' + clickSource);
				});
		
		// This var includes the latitude and longitude of the start location
		var homeRegion = {
			latitude:25.6761382221336,
			longitude:-100.346807166412,
			animate:true,
			latitudeDelta:0.04, 
			longitudeDelta:0.04
		};
		
		// include the file where the toolbar is
		// Ti.include("../lib/map-toolbar.js");
		// call the function
		// mapToolbar(mapview, homeRegion, win);
		
		
	
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