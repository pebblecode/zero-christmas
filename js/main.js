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

    var styles = ".zero-x{color:transparent!important;background:#000!important}acronym.zero-x,b.zero-x,bdo.zero-x,big.zero-x,br.zero-x,cite.zero-x,code.zero-x,dfn.zero-x,em.zero-x,i.zero-x,img.zero-x,input.zero-x,kbd.zero-x,label.zero-x,map.zero-x,object.zero-x,q.zero-x,samp.zero-x,script.zero-x,select.zero-x,small.zero-x,span.zero-x,strong.zero-x,sub.zero-x,sup .zero-x.btn,sup button.zero-x,textarea.zero-x,tt abbr.zero-x,var a.zero-x{display:inline-block!important;height:auto!important}.zero-x-image{display:inline-block!important;position:relative}.zero-x-image:after{content:'';position:absolute;top:0;left:0;bottom:0;right:0;background:#000}.z-x-1{transform:rotate(1deg)!important;-ms-transform:rotate(1deg)!important;-moz-transform:rotate(1deg)!important;-webkit-transform:rotate(1deg)!important;-o-transform:rotate(1deg)!important}.z-x-2{transform:rotate(2deg)!important;-ms-transform:rotate(2deg)!important;-moz-transform:rotate(2deg)!important;-webkit-transform:rotate(2deg)!important;-o-transform:rotate(2deg)!important}.z-x-3{transform:rotate(-1deg)!important;-ms-transform:rotate(-1deg)!important;-moz-transform:rotate(-1deg)!important;-webkit-transform:rotate(-1deg)!important;-o-transform:rotate(-1deg)!important}.z-x-4{transform:rotate(-2deg)!important;-ms-transform:rotate(-2deg)!important;-moz-transform:rotate(-2deg)!important;-webkit-transform:rotate(-2deg)!important;-o-transform:rotate(-2deg)!important}";

    // list of words to censor
    var xmasWords = [ "angel","artificial tree","bells","birth","blizzard","blustery","boots","bough","bow","box","candle","candy","candy cane","cap","card","carolers","caroling","carols","celebrate","celebration","ceremony","charity","chestnuts","chill","chilly","chimney","christmas","christmas card","christmas carol","christmas eve","christmastide","christmas tree","christmas tree stand","cider","coal","cold","cookie","creche","december 25","decorate","decorations","display","eggnog","elf","elves","eve","evergreen","exchange","family","family reunion","father christmas","feast","feliz navidad","festival","festive","fir","fireplace","firewood","frankincense","frosty","frosty the snowman","fruitcake","garland","gift","gift-giving","gingerbread","gingerbread house","gingerbread man","gingerbread woman","give","gold","goodwill","goose","green","greetings","guest","happy","holiday","holly","hope","hat","hot chocolate","hot cider","hug","ice skates","icicle","icy","ivy","jack frost","jesus","jingle bells","jolly","joy","joyful","joyeux noel","kings","krampus","kris kringle","lights","list","log","love","manger","merry","merry christmas","mince pie","mistletoe","mittens","myrrh","nativity","naughty","nice","nippy","noel","north pole","nutcracker","occasion","ornaments","package","pageant","parade","partridge","party","pie","pine tree","pinecone","plum pudding","poinsettia","popcorn string","presents","receive","red","reindeer","rejoice","reunion","ribbon","ritual","rudolph","saint nicholas","sales","santa","claus","santa claus","santa's elves","santa's helpers","santa's list","santa's workshop","scarf","scrooge","season","season's greetings","shopping","skate","sled","sleigh","sleigh bells","snow","snowball","snowbound","snowfall","snowflake","snowman","snowy","socks","spirit","star","st. nick","stocking","stocking stuffer","sugarplum","sweater","tidings","tinsel","toboggan ","togetherness","toy","tradition","tree","trimming","trips","turkey","unwrap","vacation","visit","wassail","winter","wintertime","wintry ","wise men","wish","wonder","workshop","wrap","wrapping paper","wreath","xmas","yule","yule log","yuletide","bells","candles","cards","celebrate","festival","family reunion","Frosty","greetings","holiday","jubilee","merry","Noel","parades","party","red/green","Scrooge","season","spirit","stocking stuffers","stockings","tidings","tradition","traffic","trips","vacation","wassail","wassailing","yule","yuletide","brandy butter","bread","candy","candy canes","Christmas cookies","cranberry sauce","dressing","eggnog","fruitcake","ham","mince pies","mince meat","pie","plum pudding","pumpkin pie","punch","sauce","spice tea","sweet potato","turkey","white sauce","holly","mistletoe","poinsettia","wreath","Advent","alleluia","angelic","angels","announcement","astrologers","babe","baby","Bethlehem","birth","camel","ceremonies","Christ Child","creche","donkey","Emmanuel/Immanuel","Epiphany","flocks","frankincense","gifts","gloria","gold","goodwill","holy","incarnation","inn","Jerusalem","Joseph","Lord","Magi","manager","Mary","miracle","myrrh","nativity","pageant","Prince of Peace","proclamation","prophecy","sacred","Savior","shepherds","stable","star","wisemen","worship","Christmas Tree","cedar","Christmas tree","decorations","fir","icicles","ivy","lights","pine","stand","star","tinsel","Shopping","crowds","dolls","gift boxes","lists","presents","ribbon","ribbon","sales","seals","stickers","toys","wrapping paper","Santa Claus","chimney","elves","fairies","jolly","North Pole","reindeer","Rudolph","sled","sleigh","sleigh bells","St. Nick","toys","anticipating","excited","exhausted","happy","sad","Blitzer","Rudolph","Comet","Cupid","Dancer","Dasher","Donner","Prancer","Vixan","Advent","Advent Calender","Alcohol","Angels","Antlers","Apple","Artificial Christmas Tree","Baby","Baking","Baubles","Beard","Bells","Bethlehem","Birth","Biscuits","Blitzen","Bloated","Bows","Boxing Day","Brandy","Brussel Sprouts","Buffet","Bulk buying","Busy","Cadburys Roses","Cake (Christmas)","Candles","Candy Cane","Cards","Carols","Carol singers","Carrot","Celebration","Ceremonies","Charity donations","Cheer","Cheese","Chestnuts","Chimney","Chocolate coins","Chocolates","Choirs","Christ","Christian","Christianity","Christmas","Christmas Eve","Christmas lights switch on","Christmas Tree","Cinnamon","Cliff Richard (Mistletoe & Wine song)","Coca Cola lorry","Cold","Colly birds","Comet","Cookies","Crackers","Cranberry Sauce","Cupid","Curling ribbon","Dancer","Dancing","Dasher","December","Decorations","Donkeys","Donner","Doves","Drinks","Drummers drumming","Early start","Eggnog","Elves","Eve","Evergreen","Excited","Exhausted﻿","Fairies","Faith","Fa la la la la","Family","Fancy dress","Father Christmas","Feast","Festive","Figgy pudding","Films","Finger food","Fir","Fires","Fireplace","Fireworks","Flashing lights","Food","Frankincense","French hens","Friends","Frost","Frostie the snowman","Fruitcake","Fun","Gabriel","Games","Garland","Geese a laying","Generosity","Ghost of Christmas Future","Ghost of Christmas Past","Ghost of Christmas Present","Gingerbread","Gifts","Gift tags","Giving","Glad Tidings","Glistening","Glitter","Gloves","Gold","Gold Rings","Goodwill","Goose","Green","Grinch","Grotto","Happy","Hats","Ho Ho Ho","Holly","Holiday","Holy","Hustle & bustle","Ice","Icicles","Igloo","Illuminations","Inn keeper","Ivy","Jack Frost","Jerusalem","Jesus","Jingle Bells","Jokes","Jolly","Joseph","Joyful","Jumpers","Kings","Kissing","Ladies dancing","Lanterns","Lapland","Late night shopping","Laughter","Leftovers","Lights","Lists","Logs","Lords a leaping","Love","Magic","Maids a milking","Manger","Marshmallows","Mary","Merry","Midnight mass","Milk","Mince pies","Miracle","Mistletoe","Mittens","Money","Morning","Mottos","Movies","Mrs Claus","Mulled wine","Music","Myrrh","Nativity","Naughty","New Years Eve","New Years Day","Nice","Night","Noel","North Pole","North Star","Nose (Rudolphs red one)","Nutcracker","Nuts","Occasion","Open fires","Opening (presents)","Oranges","Ornaments","Packages","Pantomimes","Paper hats","Parcels","Parties","Partridge in a pear tree","Party poppers","Peace","Pigs in blankets","Pine","Pine cones","Pipers piping","Polar express","Poinsettia","Prancer","Presents","Pudding (Christmas)","Punch","Quality Streets","Queens speech","Real (tree)","Red","Reindeer","Rejoicing","Relaxing","Resolutions","Ribbon","Roasting","Robin","Rudolph","Sack (Santas)","Sad","Sales","Santa Claus","Scarf","School play","Scissors","Scrooge","Season","Selection box","Sellotape","Shepherds","Shopping","Silent Night","Sledge","Sleep","Sleepless","Sleigh","Sleigh bells","Smurfs Christmas Songs Album (had to add this, its my Xmas guilty pleasure!) :0)","Snow","Snowflakes","Snow globe","Snowman","Snow spray","Soaps (TV)","Socialising","Songs","Special offers","Spirit","Spruce","Stable","Stand (for your tree)","St Nick","Stocking","Stocking fillers","Stress","Stuffing","Surprise","Swans a swimming","Sweets","Teddy Bears","Tidings","Tinsel","Tiny Tim","Togetherness","Toys","Traditions","Trains","Tree","Tree skirt","Turkey","Turtle doves","TV","Twelve days of Christmas","Twenty fourth","Twenty fifth","Twenty sixth","Under the tree","United","Uplifting","Vacation","Virgin","Visiting","Vixen","Warmth","White","White Christmas","Window displays","Window stickers","Wine","Winter","Winter wonderland","Wise men","Wishes","Wrapping paper","Wreath","Xmas","Xmas number 1 (music charts)","Yule","Yuletide","Yule log" ];


    // add styles
    $( '<style>' + styles + '</style>' ).appendTo( 'head' )

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
      $( this ).css( 'background-color' , 'black');
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
      $( this ).css( 'color' , 'black');
    } );

    // remove xmas images
    var imgSelector = "";
    for (var i = 0; i < xmasWords.length; i++) {
      imgSelector += "img[src*='" + xmasWords[i] + "'], img[alt*='" + xmasWords[i] + "']";
      if (i < xmasWords.length - 1) {
        imgSelector += ",";
      }
    }

    $( imgSelector ).wrap( '<div class="zero-x-image"></div>' );

    // add random rotations
    $( '.zero-x, .zero-x-image' ).each( function() {
      $( this ).addClass( 'z-x-' + ( Math.floor( Math.random() * 4 ) + 1 ) );
    } );

})();