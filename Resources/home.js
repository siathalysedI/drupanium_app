/**
 * This is the home window
 * 
 * It doesn't do anything fancy, the only thing it does is to create a table
 * with links to other windows that actually demonstrates the functionality
 * 
 * To see how a table is created see the file controls.js in Kitchen Sink
 */

// Create a new variable to hold the current window
var win = Titanium.UI.currentWindow;

// create table view data object
var data = [
    {title:'Login', hasChild:true, test:'includes/login.js'},
	{title:'Get Node', hasChild:true, test:'includes/get-node.js'},
	{title:'Create content', hasChild:true, test:'includes/post.js'},
	{title:'Create account', hasChild:true, test:'includes/create-account.js'},
	{title:'View all content', hasChild:true, test:'includes/view-all-content.js'},
	{title:'Favorites', hasChild:true, test:'includes/favorites.js'},
];

// create table view
var tableview = Titanium.UI.createTableView({
	data:data
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.title,
			backgroundColor:'#fff',
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
win.add(tableview);


/**
 *************************************
 * CREATE THE POST BUTTON
 *************************************
 */
if(Titanium.App.Properties.getInt("userUid")) {

	// Create a user variable to hold some information about the user
	var user = {
		uid: Titanium.App.Properties.getInt("userUid"),
		name: Titanium.App.Properties.getString("userName"),
	}
	
	// For users who created an account, they will be logged in but there will be no session id
	// or session_name 
	if(Titanium.App.Properties.getString("userSessionId")) {
		user.sessid = Titanium.App.Properties.getString("userSessionId");
	}
	
	if(Titanium.App.Properties.getString("userSessionName")) {
		user.session_name = Titanium.App.Properties.getString("userSessionName");
	}
	
	alert("Welcome " + user.name);
	
	// Create a new button
	var rightButton = Ti.UI.createButton({
		title: 'Post',
		style:Titanium.UI.iPhone.SystemButtonStyle.DONE
	});

	// Create a new event listener for the rightButton
	rightButton.addEventListener("click", function() {
		// Create a new window here to show the form
		var postWin = Ti.UI.createWindow({
			// title of the window
			title: "Post",
			
			// the modal indicates that this window will open outside the tabgroup
			modal: true,
			
			// url to the post file
			url: 'includes/post.js',
			
			// do not hide the navigation bar
			navBarHidden: false,
			
			// close the window on close
			exitOnClose: true,
		});
		
		// open the window
		postWin.open();
	});

	// We don't add the button to the window, instead, we tell the app
	// to set the button as the right navigation button
	win.setRightNavButton(rightButton);
}


