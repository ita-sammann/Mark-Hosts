// ==UserScript==
// @name          Mark Hosts
// @namespace     https://github.com/borodean
// @description	  Marks the included hosts favicon with a colored square
// ==/UserScript==

(function(){

  var color = '#F00'

	var getFaviconTag = function() {
		var links = document.getElementsByTagName( 'link' );
		for( var i = 0, len = links.length;  i < len;  i++ ) {
			if ( (links[ i ].getAttribute( 'rel' ) || '' ).match( /\bicon\b/ ) ) {
				return links[ i ];
			};
		};
		return false;
	};

  var setFaviconTag = function( url ) {
    removeFaviconTag();
		var link = document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'icon';
		link.href = url;
		document.getElementsByTagName('head')[0].appendChild(link);
  };

	var removeFaviconTag = function() {
		var links = document.getElementsByTagName( 'link' );
		var head = document.getElementsByTagName( 'head' )[ 0 ];
		for( var i=0, len = links.length;  i < len;  i++ ) {
			var exists = ( typeof(links[ i ]) !== 'undefined' );
			if ( exists && links[ i ].getAttribute( 'rel' ) === 'icon' ) {
				head.removeChild( links[ i ] );
			};
		};
	};

	var getCurrentFavicon = function() {
    var tag = getFaviconTag();
    return tag ? tag.getAttribute( 'href' ) : '/favicon.ico';
	};


  var canvas = document.createElement( 'canvas' );
  canvas.width = 16;
  canvas.height = 16;

  var context = canvas.getContext( '2d' );

  var favicon = new Image();

  favicon.onload = function() {

    // Draw original favicon
    context.drawImage( favicon, 0, 0, favicon.width, favicon.height, 0, 0, 16, 16 );

    // Draw box around favicon
    context.strokeStyle = '#000';
    context.strokeRect( 0.5, 0.5, 15, 15 );
    context.strokeRect( 2.5, 2.5, 11, 11 );
    context.strokeStyle = color;
    context.strokeRect( 1.5, 1.5, 13, 13 );

    // Refresh tag in page
    setFaviconTag( canvas.toDataURL() );

  };

  favicon.src = getCurrentFavicon();

})();