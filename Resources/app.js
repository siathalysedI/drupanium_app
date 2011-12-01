// Create a reference to the underscore.js module
// var _ = require('lib/underscore')._;

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// Create tab group to hold all the tabs
var tabGroup = Titanium.UI.createTabGroup();

//Create a user variable to hold some information about the user
var user = {
	uid: Titanium.App.Properties.getInt("userUid"),
	sessid: Titanium.App.Properties.getString("userSessionId"),
	session_name: Titanium.App.Properties.getString("userSessionName"),
	name: Titanium.App.Properties.getString("userName"),
}

// Create the home window
var homeWin = Titanium.UI.createWindow({  
	// Set the title for the window
    title:'Home',
    
    // Set the background color for the window
    backgroundColor:'#fff',
    
    // The actual window data will be in this file, not here
    url: 'home.js'
});

// Create the home tab
var homeTab = Titanium.UI.createTab({  
	// Set the icon for the button
    icon:'KS_nav_views.png',
    
    // Set the title for the tab
    title:'Home',
    
    // Relate the tab to a window so the app knows what window to open.
    window:homeWin
});

// Create the user window
var userWin = Ti.UI.createWindow({
	title: "User",
	backgroundColor: '#fff',
	url: 'user.js',
});

// Create the user tab
var userTab = Ti.UI.createTab({
	icon: "KS_nav_views.png",
	window: userWin
});

if(user.name) {
	userTab.title = user.name;
}
else {
	userTab.title = "User";
}

// Create the search window
var searchWin = Ti.UI.createWindow({
	title: "Search",
	backgroundColor: '#fff',
	url: 'search.js'
});

// Create the search tab
var searchTab = Ti.UI.createTab({
	title: 'Search',
	icon: "KS_nav_views.png",
	window: searchWin,
});

// Create the maps window
var mapsWin = Ti.UI.createWindow({
	title: "Maps",
	backgroundColor: '#fff',
	url: 'maps.js'
});

// Create the tab window
var mapsTab = Ti.UI.createTab({
	title: "Maps",
	icon: "KS_nav_views.png",
	window: mapsWin,
});

// Add the home tab to the tab group
tabGroup.addTab(homeTab);  

// Add the user tab to the tab group
tabGroup.addTab(userTab);

// Add the search tab to the tab group
tabGroup.addTab(searchTab);

// Add the maps tab
tabGroup.addTab(mapsTab);

// open tab group
tabGroup.open();
