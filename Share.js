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
	this.facebook = sett.facebook || null;
	this.twitter = sett.twitter  || null;
	this.google = sett.google  || null;

	// class methods
	this.bindEvents();
	this.initFacebookApi();
};

Share.prototype.bindEvents = function() {
	var _this = this;

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
	var _this = this;
	var appId = (this.facebook) ? this.facebook.appId : null;
	if (appId && appId !== '') {
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
	var url = element.href;
	var type = element.getAttribute('data-share-type');
	var description = element.getAttribute('data-share-description') || '';
	var title = element.getAttribute('data-share-title') || '';
	var caption = element.getAttribute('data-share-caption') || '';
	var image = element.getAttribute('data-share-image') || '';

	if (typeof(FB) != 'undefined') {
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
		var fUrl = 'https://facebook.com/sharer.php';
		var query = '?u=' + encodeURI(url);
		var attr = 'status=no,height=350,width=550,resizable=no,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no';

		this.openShare(fUrl+query, type, attr);
	}
};

Share.prototype.sendTwitter = function(element) {
	var url = element.href;
	var type = element.getAttribute('data-share-type');
	var description = element.getAttribute('data-share-description');
	var tUrl = 'https://twitter.com/intent/tweet';
	var query = '?url=' + encodeURI(url) + '&text=' + encodeURI(description);
	var attr = 'status=no,height=250,width=450,resizable=no,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no';

	this.openShare(tUrl+query, type, attr);
};

Share.prototype.sendGoogle = function(element) {
	var url = element.href;
	var type = element.getAttribute('data-share-type');
	var gUrl = 'https://plus.google.com/share';
	var query = '?url=' + encodeURI(url);
	var attr = 'status=no,height=450,width=500,resizable=no,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no';

	this.openShare(gUrl+query, type, attr);
};

Share.prototype.openShare = function(url,type,attr) {
	window.open(url,'share-' + type, attr);
};