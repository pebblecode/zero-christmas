/*global $:true, console:true, document:true*/
(function (){
  'use strict';

  // jquery highlight plugin
  $.extend({
      highlight: function (node, re, nodeName, className) {
          if (node.nodeType === 3) {
              var match = node.data.match(re);
              if (match) {
                  var highlight = document.createElement(nodeName || 'span');
                  highlight.className = className || 'highlight';
                  var wordNode = node.splitText(match.index);
                  wordNode.splitText(match[0].length);
                  var wordClone = wordNode.cloneNode(true);
                  highlight.appendChild(wordClone);
                  wordNode.parentNode.replaceChild(highlight, wordNode);
                  return 1; //skip added node in parent
              }
          } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
                  !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
                  !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
              for (var i = 0; i < node.childNodes.length; i++) {
                  i += $.highlight(node.childNodes[i], re, nodeName, className);
              }
          }
          return 0;
      }
  });

  $.fn.unhighlight = function (options) {
      var settings = { className: 'highlight', element: 'span' };
      $.extend(settings, options);

      return this.find(settings.element + "." + settings.className).each(function () {
          var parent = this.parentNode;
          parent.replaceChild(this.firstChild, this);
          parent.normalize();
      }).end();
  };

  $.fn.highlight = function (words, options) {
      var settings = { className: 'highlight', element: 'span', caseSensitive: false, wordsOnly: false };
      $.extend(settings, options);
      
      if (words.constructor === String) {
          words = [words];
      }
      words = $.grep(words, function(word, i){
        return word !== '';
      });
      words = $.map(words, function(word, i) {
        return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      });
      if (words.length === 0) { return this; };

      var flag = settings.caseSensitive ? "" : "i";
      var pattern = "(" + words.join("|") + ")";
      if (settings.wordsOnly) {
          pattern = "\\b" + pattern + "\\b";
      }
      var re = new RegExp(pattern, flag);
      
      return this.each(function () {
          $.highlight(this, re, settings.element, settings.className);
      });
  };

  var styles = ".zero-x{color:transparent !important;background:black !important}b.zero-x,big.zero-x,i.zero-x,small.zero-x,tt abbr.zero-x,acronym.zero-x,cite.zero-x,code.zero-x,dfn.zero-x,em.zero-x,kbd.zero-x,strong.zero-x,samp.zero-x,var a.zero-x,bdo.zero-x,br.zero-x,img.zero-x,map.zero-x,object.zero-x,q.zero-x,script.zero-x,span.zero-x,sub.zero-x,sup button.zero-x,sup .zero-x.btn,input.zero-x,label.zero-x,select.zero-x,textarea.zero-x{display:inline-block !important}.zero-x-image{display:inline-block !important;position:relative}.zero-x-image:after{content:'';position:absolute;top:0;left:0;bottom:0;right:0;background:black !important}.z-x-1{transform:rotate(1deg) !important;-ms-transform:rotate(1deg) !important;-moz-transform:rotate(1deg) !important;-webkit-transform:rotate(1deg) !important;-o-transform:rotate(1deg) !important}.z-x-2{transform:rotate(2deg) !important;-ms-transform:rotate(2deg) !important;-moz-transform:rotate(2deg) !important;-webkit-transform:rotate(2deg) !important;-o-transform:rotate(2deg) !important}.z-x-3{transform:rotate(-1deg) !important;-ms-transform:rotate(-1deg) !important;-moz-transform:rotate(-1deg) !important;-webkit-transform:rotate(-1deg) !important;-o-transform:rotate(-1deg) !important}.z-x-4{transform:rotate(-2deg) !important;-ms-transform:rotate(-2deg) !important;-moz-transform:rotate(-2deg) !important;-webkit-transform:rotate(-2deg) !important;-o-transform:rotate(-2deg) !important}.red{color:red}.box{height:3em;width:3em}";

  // list of words to censor
  var xmasWords = [ "angel", "artificial tree", "bells", "birth", "blizzard", "blustery", "boots", "bough", "bow", "box", "candle", "candy", "candy cane", "cap", "card", "carolers", "caroling", "carols", "celebrate", "celebration", "ceremony", "charity", "chestnuts", "chill", "chilly", "chimney", "christmas", "christmas card", "christmas carol", "christmas eve", "christmastide", "christmas tree", "christmas tree stand", "cider", "coal", "cold", "cookie", "creche", "december 25", "decorate", "decorations", "display", "eggnog", "elf", "elves", "eve", "evergreen", "exchange", "family", "family reunion", "father christmas", "feast", "feliz navidad", "festival", "festive", "fir", "fireplace", "firewood", "frankincense", "frosty", "frosty the snowman", "fruitcake", "garland", "gift", "gift-giving", "gingerbread", "gingerbread house", "gingerbread man", "gingerbread woman", "give", "gold", "goodwill", "goose", "green", "greetings", "guest", "happy", "holiday", "holly", "hope", "hat", "hot chocolate", "hot cider", "hug", "ice skates", "icicle", "icy", "ivy", "jack frost", "jesus", "jingle bells", "jolly", "joy", "joyful", "joyeux noel", "kings", "krampus", "kris kringle", "lights", "list", "log", "love", "manger", "merry", "merry christmas", "mince pie", "mistletoe", "mittens", "myrrh", "nativity", "naughty", "nice", "nippy", "noel", "north pole", "nutcracker", "occasion", "ornaments", "package", "pageant", "parade", "partridge", "party", "pie", "pine tree", "pinecone", "plum pudding", "poinsettia", "popcorn string", "presents", "receive", "red", "reindeer", "rejoice", "reunion", "ribbon", "ritual", "rudolph", "saint nicholas", "sales", "santa claus", "santa's elves", "santa's helpers", "santa's list", "santa's workshop", "scarf", "scrooge", "season", "season's greetings", "shopping", "skate", "sled", "sleigh", "sleigh bells", "snow", "snowball", "snowbound", "snowfall", "snowflake", "snowman", "snowy", "socks", "spirit", "star", "st. nick", "stocking", "stocking stuffer", "sugarplum", "sweater", "tidings", "tinsel", "toboggan ", "togetherness", "toy", "tradition", "tree", "trimming", "trips", "turkey", "unwrap", "vacation", "visit", "wassail", "winter", "wintertime", "wintry ", "wise men", "wish", "wonder", "workshop", "wrap", "wrapping paper", "wreath", "xmas", "yule", "yule log", "yuletide" ];


  // add styles
  $( "<style>" + styles + "</style>" ).appendTo( "head" )

  // use highlight plugin
  $( 'body' ).highlight( xmasWords, { className: 'zero-x' } );

  // rgb to hsl (only using hue)
  function rgbToHsl(r, g, b){
      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if(max == min){
          h = s = 0; // achromatic
      }else{
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max){
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
          }
          h = h / 6 * 360;
      }

      return [ h, s ];
  }

  // change all background colours in range to black
  $( '*' ).filter( function() {
    var match1 = [ 70, 160 ];
    var match2 = [ 0, 30 ];
    var match3 = [ 330, 360 ];
    var hue = rgbToHsl(
                $( this ).css( 'background-color' ).match(/\d+/g)[0],
                $( this ).css( 'background-color' ).match(/\d+/g)[1],
                $( this ).css( 'background-color' ).match(/\d+/g)[2]
              )[0];

    var sat = rgbToHsl(
                $( this ).css( 'background-color' ).match(/\d+/g)[0],
                $( this ).css( 'background-color' ).match(/\d+/g)[1],
                $( this ).css( 'background-color' ).match(/\d+/g)[2]
              )[1];

    return(
      ( hue >= match1[0] ) && ( hue <= match1[1] ) && ( sat !== 0 ) ||
      ( hue >= match2[0] ) && ( hue <= match2[1] ) && ( sat !== 0 ) ||
      ( hue >= match3[0] ) && ( hue <= match3[1] ) && ( sat !== 0 )
    );
  } ).each( function() {
    $( this ).css( "background-color" , "black");
  } );

  // change all background text in range to black
  $( '*' ).filter( function() {
    var match1 = [ 70, 160 ];
    var match2 = [ 0, 30 ];
    var match3 = [ 330, 360 ];
    var hue = rgbToHsl(
                $( this ).css( 'color' ).match(/\d+/g)[0],
                $( this ).css( 'color' ).match(/\d+/g)[1],
                $( this ).css( 'color' ).match(/\d+/g)[2]
              )[0];

    var sat = rgbToHsl(
                $( this ).css( 'color' ).match(/\d+/g)[0],
                $( this ).css( 'color' ).match(/\d+/g)[1],
                $( this ).css( 'color' ).match(/\d+/g)[2]
              )[1];

    return(
      ( hue >= match1[0] ) && ( hue <= match1[1] ) && ( sat !== 0 ) ||
      ( hue >= match2[0] ) && ( hue <= match2[1] ) && ( sat !== 0 ) ||
      ( hue >= match3[0] ) && ( hue <= match3[1] ) && ( sat !== 0 )
    );
  } ).each( function() {
    $( this ).css( "color" , "black");
  } );

  // remove xmas images
  var imgSelector = "";
  for (var i = 0; i < xmasWords.length; i++) {
    imgSelector += "img[src*='" + xmasWords[i] + "'], img[alt*='" + xmasWords[i] + "']";
    if (i < xmasWords.length - 1) {
      imgSelector += ",";
    }
  }

  $( imgSelector ).wrap( "<div class='zero-x-image'></div>" );

  // add random rotations
  $( '.zero-x, .zero-x-image' ).each( function() {
    $( this ).addClass( 'z-x-' + ( Math.floor( Math.random() * 4 ) + 1 ) );
  } );

})();