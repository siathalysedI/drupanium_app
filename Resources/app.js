// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var homeWin = Titanium.UI.createWindow({  
    title:'Home',
    backgroundColor:'#fff'
    url: 'home.js'
});
var homeTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Home',
    window:homeWin
});

//
//  add tabs
//
tabGroup.addTab(homeTab);  


// open tab group
tabGroup.open();
