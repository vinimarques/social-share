/*
	@Share Class
	@author: Vinicius Marques
	@Description: Javascript class for share links.
	@Support IE 8+ , IE Mobile 10+ , Chrome 34+ , Firefox 29+ , Opera 22+ , Safari 7+ , iOS 3.2+ , Android 3+
*/

var Share = function(settings) {
	"use strict";
	
	// settings
	var sett = settings || {};

	// class variables
	this.shareClass = sett.shareClass || '.share-link';
	this.facebook = sett.facebook || {};
	this.twitter = sett.twitter  || {};
	this.google = sett.google  || {};

	// class methods
	this.bindEvents();
	this.initFacebookApi();
};

Share.prototype.bindEvents = function() {
	var _this = this;

	// Get elements with the share class
	var elements = document.querySelectorAll(this.shareClass);
	for (var i = 0; i < elements.length; i++) {
		elements[i].onclick = function(event) {
			event.preventDefault();
			var type = this.getAttribute('data-share-type');
			switch (type) {
				case 'facebook': _this.sendFacebook(this); break;
				case 'twitter': _this.sendTwitter(this); break;
				case 'google': _this.sendGoogle(this); break;
			}
			return false;
		};
	}
};

Share.prototype.initFacebookApi = function() {
	// Initialize FB API if appID exist
	var _this = this;
	var appId = parseInt((this.facebook.appId) ? this.facebook.appId : 0);	

	if (appId && appId > 0) {
		(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		window.fbAsyncInit = function() {
			FB.init({
				appId      : _this.facebook.appId,
				xfbml      : true,
				version    : 'v2.0'
			});
		};
	}
};

Share.prototype.sendFacebook = function(element) {
	// Type for popup name
	var type = element.getAttribute('data-share-type');

	// URL for share
	var url = this.facebook.url || element.href || location.href;

	// Data for share box
	var description = this.facebook.description || element.getAttribute('data-share-description') || '';
	var title = this.facebook.title || element.getAttribute('data-share-title') || '';
	var caption = this.facebook.caption || element.getAttribute('data-share-caption') || '';
	var image = this.facebook.image || element.getAttribute('data-share-image') || '';

	if (typeof(FB) != 'undefined' && this.facebook.appId) {
		// When FB is inited, use to FB API
		FB.ui({
			method : 'feed',
			name: title,
			caption: caption,
			description: description,
			link: url,
			picture: image
		});
	}
	else {
		// When FB isn't inited, use simple FB URL for share
		var fUrl = 'https://facebook.com/sharer.php';
		var query = '?u=' + encodeURI(url);

		// Attributes for popup
		var attr = 'status=no,height=350,width=550,resizable=no,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no';

		this.openShare(fUrl+query, type, attr);
	}
};

Share.prototype.sendTwitter = function(element) {
	// Type for popup name
	var type = element.getAttribute('data-share-type');
	
	// URL for share and Text
	var url = this.twitter.url || element.href || location.href;	
	var description = this.twitter.description || element.getAttribute('data-share-description') || '';

	// URL Twitter share and query string
	var tUrl = 'https://twitter.com/intent/tweet';
	var query = '?url=' + encodeURI(url) + '&text=' + encodeURI(description);
	
	// Attributes for popup
	var attr = 'status=no,height=250,width=450,resizable=no,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no';

	this.openShare(tUrl+query, type, attr);
};

Share.prototype.sendGoogle = function(element) {
	// Type for popup name
	var type = element.getAttribute('data-share-type');

	// URL for share
	var url = this.google.url || element.href || location.href;
	
	// URL GooglePlus share and query string
	var gUrl = 'https://plus.google.com/share';
	var query = '?url=' + encodeURI(url);
	
	// Attributes for popup	
	var attr = 'status=no,height=450,width=500,resizable=no,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no';

	this.openShare(gUrl+query, type, attr);
};

Share.prototype.openShare = function(url,type,attr) {
	// Open popup
	window.open(url,'share-' + type, attr);
};
