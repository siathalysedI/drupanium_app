
	function mapToolbar (mapview, homeRegion, win) {
		// Creates a Navigation Bar for maps
		// that includes some common features for all maps
		
		// Defines some empty variables
		
		// remove all annotations on the map
		var removeAll = null;
		
		// holds the main location, this is where the map will load the first time
		var mainLocation = null;
		
		// satellite map view
		var satellite = null;
		
		// standard map view
		var standard = null;
		
		// hybrid map view
		var hybrid = null;
		
		// zoom in button
		var zoomin = null;
		
		// zoom out button
		var zoomout = null;
		
		// Define the function to handle all events
		var wireClickHandlers = function() {
			// remove all annotations		
			removeAll.addEventListener('click', function() {
				mapview.removeAllAnnotations();
			});
			
			// move to the main location in the map defined by the latitude
			// and longitude of homeRegion
			mainLocation.addEventListener('click', function() {
				// set location to sv
				mapview.setLocation(homeRegion);

				// activate annotation
				mapview.selectAnnotation(mapview.annotations[1].title,true);
			});
			
			// change the map view to sattellite view
			satellite.addEventListener('click',function() {
				// set map type to satellite
				mapview.setMapType(Titanium.Map.SATELLITE_TYPE);
			});
			
			// change the map view to standard view
			standard.addEventListener('click',function() {
				// set map type to standard
				mapview.setMapType(Titanium.Map.STANDARD_TYPE);
			});
			
			// change the map view to hybrid view
			hybrid.addEventListener('click',function() {
				// set map type to hybrid
				mapview.setMapType(Titanium.Map.HYBRID_TYPE);
			});

			// zoom in
			zoomin.addEventListener('click',function() {
				mapview.zoom(1);
			});

			// zoom out
			zoomout.addEventListener('click',function() {
				mapview.zoom(-1);
			});
		}; // end the variable
		
		// DEFINE THE BUTTONS
		// Flexible space
		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		
		removeAll = Titanium.UI.createButton({
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
			title:'Remove All'
		});
		// Add the removeAll button to the right nav button window
		// and not to the toolbar
		win.rightNavButton = removeAll;
		
		mainLocation = Titanium.UI.createButton({
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
			title:'Home'
		});
		
		satellite = Titanium.UI.createButton({
			title:'Sattelite',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		
		standard = Titanium.UI.createButton({
			title:'Standard',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		
		hybrid = Titanium.UI.createButton({
			title:'Hybrid',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		
		zoomin = Titanium.UI.createButton({
			title:'+',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		
		zoomout = Titanium.UI.createButton({
			title:'-',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		
		// Load the handlers function
		wireClickHandlers();

		// add a toolbar to the window
		win.setToolbar([flexSpace,standard,flexSpace,hybrid,flexSpace,satellite,flexSpace,mainLocation,flexSpace,zoomin,flexSpace,zoomout,flexSpace]);
		
		return win;
	};