/*global $:true, console:true, document:true*/
(function (){
  'use strict';

  var xmasWords = [ "angel", "artificial tree", "bells", "birth", "blizzard", "blustery", "boots", "bough", "bow", "box", "candle", "candy", "candy cane", "cap", "card", "carolers", "caroling", "carols", "celebrate", "celebration", "ceremony", "charity", "chestnuts", "chill", "chilly", "chimney", "christmas", "christmas card", "christmas carol", "christmas eve", "christmastide", "christmas tree", "christmas tree stand", "cider", "coal", "cold", "cookie", "creche", "december 25", "decorate", "decorations", "display", "eggnog", "elf", "elves", "eve", "evergreen", "exchange", "family", "family reunion", "father christmas", "feast", "feliz navidad", "festival", "festive", "fir", "fireplace", "firewood", "frankincense", "frosty", "frosty the snowman", "fruitcake", "garland", "gift", "gift-giving", "gingerbread", "gingerbread house", "gingerbread man", "gingerbread woman", "give", "gold", "goodwill", "goose", "green", "greetings", "guest", "happy", "holiday", "holly", "hope", "hat", "hot chocolate", "hot cider", "hug", "ice skates", "icicle", "icy", "ivy", "jack frost", "jesus", "jingle bells", "jolly", "joy", "joyful", "joyeux noel", "kings", "krampus", "kris kringle", "lights", "list", "log", "love", "manger", "merry", "merry christmas", "mince pie", "mistletoe", "mittens", "myrrh", "nativity", "naughty", "nice", "nippy", "noel", "north pole", "nutcracker", "occasion", "ornaments", "package", "pageant", "parade", "partridge", "party", "pie", "pine tree", "pinecone", "plum pudding", "poinsettia", "popcorn string", "presents", "receive", "red", "reindeer", "rejoice", "reunion", "ribbon", "ritual", "rudolph", "saint nicholas", "sales", "santa claus", "santa's elves", "santa's helpers", "santa's list", "santa's workshop", "scarf", "scrooge", "season", "season's greetings", "shopping", "skate", "sled", "sleigh", "sleigh bells", "snow", "snowball", "snowbound", "snowfall", "snowflake", "snowman", "snowy", "socks", "spirit", "star", "st. nick", "stocking", "stocking stuffer", "sugarplum", "sweater", "tidings", "tinsel", "toboggan ", "togetherness", "toy", "tradition", "tree", "trimming", "trips", "turkey", "unwrap", "vacation", "visit", "wassail", "winter", "wintertime", "wintry ", "wise men", "wish", "wonder", "workshop", "wrap", "wrapping paper", "wreath", "xmas", "yule", "yule log", "yuletide" ];

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