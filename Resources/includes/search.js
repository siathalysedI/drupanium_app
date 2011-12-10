// Include our config file
Ti.include('../config.js');

// Define the variable win to contain the current window
var win = Ti.UI.currentWindow;

// Create the view
var view = Titanium.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'auto',
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:true,
	top: 43,
});

// Add our view to the window
win.add(view);

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
  win.remove(view);
});

search.addEventListener('click', function() {
	search.focus();
	win.remove(view);
});

// If change causes trouble change to return
search.addEventListener('return', function(e) {
	
	// Define the url
	// in this case, we'll connecting to http://example.com/api/rest/search_node/retrieve.json?keys=value
	var url = REST_PATH + 'search_node/retrieve.json?keys=' + e.value;
	
	// We want to check if the user can access the web:
	if (Titanium.Network.online == true) {
		// Create a connection inside the variable xhr
		var xhr = Titanium.Network.createHTTPClient();

		// Open the connection and send the url using GET
		xhr.open("GET",url);
		
		// Log
		// Ti.API.info("xhr open to " + url);
		
		// Set the header
		xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
		
		// Log
		// Ti.API.info("xhr set header");
		
		// Send the connection
		xhr.send();
		
		// Log
		// Ti.API.info("xhr sent");
		
		// On load do:
		xhr.onload = function requestReceived(e) {
			// Save the connection status in variable statusCode
			var statusCode = xhr.status;
			
			// Log
			// Ti.API.info("Status code is: " + statusCode);
			
			// If status is 200 (xhr OK) 
			if (statusCode == 200) {
				// get the responseText from the connection
				var response = xhr.responseText;
				
				// Parse the response
				var result = JSON.parse(response);
				
				// Log
				// Ti.API.info("Response is " + result);
	     
				// Hide the keyboard
				search.blur();
				
				/**
				 * Create a new array "results"
				 * This is necessary because we need to create an object
				 * to send to the Table we're creating with the results
				 * the table will have the title and the nid of every result
				 * and we'll use the nid to move to another window when we click
				 * on it. 
				 */
				var results = new Array();
				
				// Start loop
				for(var key in result) {
					// Create the data variable and hold every result
					var data = result[key];
					
					/**
					 * To see how the array is built by Services in Drupal
					 * go to drupanium debug and search for something
					 * you'll see that the array is something like:
					 * 
					 * 0 => array(
					 * 	title => some title
					 * 	date => some date
					 *  user => user string, drupal returns html here, don't know why
					 *  type => the node type
					 *  node => array(
					 *    nid => the node nid
					 *    vid => the node vid
					 *    title => the node title
					 *    uid => the user uid of the author of the node
					 *  )
					 *  snippet => the usual snippet we get when we search something in drupal
					 *  language => the language of this node if defined
					 *  
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
					 * in nid we save the node nid with data.node.nid (we walk the array)
					 * hasChild is very important becase we tell Titanium that we can
					 * click on the row and a new window will open
					 */
					results[key] = {title: data.title, hasChild:true, nid:data.node.nid};
				}
				
				// Create a new table to hold our results
				// We tell Titanium to use our array results as the Property "data"
				// See http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.TableView-object
				// Specially the properties
				var table = Titanium.UI.createTableView({data:results});
				
				// add a listener for click to the table
				// so every row is clickable 
				table.addEventListener('click',function(e) {
					
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
		            	title:e.rowData.title,
		            	
		            	// The same for the nid
		            	// We send the nid as an property in this window and the 
		            	// get-node-by-nid file will recognize it and use it
		            	nid:e.rowData.nid,
		            	
		            	// a boolean indicating if the view should receive touch events (true, default) or forward them to peers (false)
		            	touchEnabled: true
		            });
		            
		            // order the app to open the nodeWindow window in the current Tab
		            Titanium.UI.currentTab.open(nodeWindow,{animated:true});
		        });
				
				// add our table to the view
				view.add(table);
			}
		}
	}
});