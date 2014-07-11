#social-share
>Javascript class for share links in facebook, twitter and google plus.

## Support
* IE 8+
* IE Mobile 10+
* Chrome 34+
* Firefox 29+
* Opera 22+
* Safari 7+
* iOS 3.2+
* Android 3+

## Getting Started

>Basic configuration

```html
	<a href="http://google.com" class="share-link" data-share-type="facebook" title="Facebook">Facebook</a>
	<a href="http://google.com" class="share-link" data-share-type="twitter" data-share-description="Text for Twitter" title="Twitter">Twitter</a>
	<a href="http://google.com" class="share-link" data-share-type="google" title="Google+">Google+</a>
```
```html
	<script type="text/javascript" src="Share.js"></script>
	<script type="text/javascript">
	var share = new Share();
	</script>
```

>Advanced configuration JS

```html
	<a href="http://nodo.cc"
		class="share-link" 
		data-share-type="facebook" 
		data-share-title="Title for share in facebook" 
		data-share-caption="Caption for share in facebook" 
		data-share-description="Description for share in facebook" 
		data-share-image="http://cdn.esoterya.com/wp-content/uploads/2011/01/nodo_2_small.jpg" 
	title="Facebook">Facebook</a>
	<a href="http://google.com" class="share-link" data-share-type="twitter" data-share-description="Text for Twitter" title="Twitter">Twitter</a>
	<a href="http://google.com" class="share-link" data-share-type="google" title="Google+">Google+</a>
```
```html
	<script type="text/javascript" src="Share.js"></script>
	<script type="text/javascript">
	var share = new Share({
		shareClass: '.share-link',
		facebook: {
			appId: 'APP_FACEBOOK_ID'
		}
	});
	</script>
```

>Advanced configuration JS with static values

```html
	<a href="#" class="share-link" data-share-type="facebook" title="Facebook">Facebook</a>
	<a href="#" class="share-link" data-share-type="twitter" title="Twitter">Twitter</a>
	<a href="#" class="share-link" data-share-type="google" title="Google+">Google+</a>
```
```html
	<script type="text/javascript" src="Share.js"></script>
	<script type="text/javascript">
	var share = new Share({
		shareClass: '.share-link',
		facebook: {
			appId: 'APP_FACEBOOK_ID',
			title: 'Title for share',
			caption: 'Caption for share',
			description: 'Description for share',
			url: 'URL for share',
			image: 'pathimage/imageforshare.png'
		},
		twitter: {
			description: 'Description for share',
			url: 'URL for share'
		},
		google: {
			url: 'URL for share'
		}
	});
	</script>
```