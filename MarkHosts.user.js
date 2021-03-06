// ==UserScript==
// @name          Mark Hosts
// @namespace     https://github.com/borodean
// @description   Marks the included hosts favicon with a colored square
// @run-at        document-start
// @match         http://*.pt.mail.ru/*
// @match         https://*.pt.mail.ru/*
// @match         http://*.pt2.mail.ru/*
// @match         https://*.pt2.mail.ru/*
// @match         http://*.pt3.mail.ru/*
// @match         https://*.pt3.mail.ru/*
// ==/UserScript==

(function(){

    var color = '#069';

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

    document.addEventListener( 'DOMContentLoaded', function() {
  
        //if (!document.location.hostname.match(/pt3.mail.ru$/i)) {
        //    return;
        //}

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
            context.fillStyle = '#000';
            context.font      = 'bold 12px sans';

            context.beginPath();
            context.moveTo(2, 0);
            context.lineTo(16, 14);
            context.lineTo(16, 16);
            context.lineTo(14, 16);
            context.lineTo(0, 2);
            context.lineTo(0, 0);
            context.closePath();
            context.fill();

            context.beginPath();
            context.moveTo(14, 0);
            context.lineTo(0, 14);
            context.lineTo(0, 16);
            context.lineTo(2, 16);
            context.lineTo(16, 2);
            context.lineTo(16, 0);
            context.closePath();
            context.fill();

            //context.fillText('1', 3, 14);

            //context.font        = "normal 36px Arial";
            //context.strokeStyle = "#000000";
            //context.strokeText("HTML5 Canvas Text", 0, 0);

            //context.strokeRect( 0.5, 0.5, 15, 15 );
            //context.strokeRect( 2.5, 2.5, 11, 11 );
            //context.strokeStyle = color;
            //context.strokeRect( 1.5, 1.5, 13, 13 );
            // Refresh tag in page
            setFaviconTag( canvas.toDataURL() );

        };

        favicon.crossOrigin = 'anonymous';
        favicon.src = getCurrentFavicon();

        var host = document.location.hostname;
        var prefix = 'pt';
        if (host.match(/^s\.morozov/i)) {
            prefix = 'morozov';
        } else if (host.match(/^smal/i)) {
            prefix = 'smal';
        } else if (host.match(/^p.zabolotniy/i)) {
            prefix = 'zabolotniy';
        }
        document.title = '[' + prefix + '] ' + document.title;
    
    }, false );
  
})();
