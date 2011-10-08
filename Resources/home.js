/**
 * This is the home window
 * 
 * It doesn't do anything fancy, the only thing it does is to create a table
 * with links to other windows that actually demonstrates the functionality
 */

// create table view data object
var data = [
	{title:'Get Node', hasChild:true, test:'includes/get-node.js'},
	{title:'Create content', hasChild:true, test:'includes/create-content.js'},
	{title:'Login', hasChild:true, test:'includes/login.js'},
	{title:'Create account', hasChild:true, test:'includes/create-account.js'},
	{title:'View all content', hasChild:true, test:'includes/view-all-content.js'},
	{title:'Search', hasChild:true, test:'includes/search.js'},
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
			title:e.rowData.title
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);