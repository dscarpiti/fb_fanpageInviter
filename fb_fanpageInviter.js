var fb_fanpageInviter = {

	config : {
		intervalFunctions : null ,
		intervalTime : 1000 ,
		clickEvent : null ,
		openFriendsLink : null ,
		friendsContainer : null ,
		lastScrollTop : null
	} ,

	init : function(){
		
		fb_fanpageInviter.createEvents();

		fb_fanpageInviter.config.openFriendsLink = document.querySelectorAll( 'div div a' );

		var divCount = fb_fanpageInviter.config.openFriendsLink.length;

		for( var i = 0 ; i < divCount ; i++ ){
			if ( fb_fanpageInviter.config.openFriendsLink[ i ].innerHTML == 'Convide seus amigos' ){
				fb_fanpageInviter.config.openFriendsLink = fb_fanpageInviter.config.openFriendsLink[ i ];//.parentElement;
				break;
			}
		}

		fb_fanpageInviter.openFriends();

	} ,

	createEvents : function(){

		fb_fanpageInviter.config.clickEvent = document.createEvent( 'HTMLEvents' );

		fb_fanpageInviter.config.clickEvent.initEvent( 'click' , true , false );
	} ,

	openFriends : function(){
		fb_fanpageInviter.config.openFriendsLink.dispatchEvent( fb_fanpageInviter.config.clickEvent );

		fb_fanpageInviter.config.intervalFunctions = setInterval( function(){

			if ( document.querySelector( '.fbProfileBrowserListItem' ) ){

				clearInterval( fb_fanpageInviter.config.intervalFunctions )
				fb_fanpageInviter.loadFriends();
			}

		} , fb_fanpageInviter.config.intervalTime );

	} ,

	loadFriends : function(){
		fb_fanpageInviter.config.friendsContainer = document.querySelector( '.fbProfileBrowserResult' );

		fb_fanpageInviter.config.intervalFunctions = setInterval( function(){
			
			if ( fb_fanpageInviter.config.friendsContainer.scrollTop === fb_fanpageInviter.config.lastScrollTop ) {

				clearInterval( fb_fanpageInviter.config.intervalFunctions );
				fb_fanpageInviter.inviteFriends();

			}
			else{

				fb_fanpageInviter.config.lastScrollTop = fb_fanpageInviter.config.friendsContainer.scrollTop;
				fb_fanpageInviter.config.friendsContainer.scrollTop = fb_fanpageInviter.config.friendsContainer.scrollHeight;

			}
		} , fb_fanpageInviter.config.intervalTime );

	} ,

	inviteFriends : function(){

		fb_fanpageInviter.createEvents();

		fb_fanpageInviter.config.buttons = document.querySelectorAll( '.uiButton' );

		fb_fanpageInviter.config.friendsCount = fb_fanpageInviter.config.buttons.length;
		
		for( var i = 0 ; i < fb_fanpageInviter.config.friendsCount ; i++ ){

			fb_fanpageInviter.config.buttons[ i ].dispatchEvent( fb_fanpageInviter.config.clickEvent );

		}

		alert( fb_fanpageInviter.config.friendsCount + ' amigos foram convidados com sucesso :)' );
	}
};

fb_fanpageInviter.init();