/**
 * Module dependencies.
 */
 
var request = require('request'),
    jsdom = require('jsdom');

var scanLink = function(link) {
    request({uri: link}, function(err, response, body){
        if(err && response.statusCode !== 200){console.log('Request error.');}

        jsdom.env({
            html: body,
            scripts: ['http://code.jquery.com/jquery-2.1.3.min.js'],
            done: function(err, window){
                var $ = window.jQuery,
                    user = $('.notice')
                    firstUser = $('.notice > div'),
                    lastUser = $('.notice:last-child > div');
                
                console.log(firstUser.eq(0).text());
                console.log(lastUser.eq(0).text());


            }
        });
    });
};

//Tell the request that we want to fetch youtube.com, send the results to a callback function
//request({uri: 'http://vimgolf.com'}, function(err, response, body){
//    var self = this;
//    self.items = new Array();//I feel like I want to save my results in an array
//     
//    if(err && response.statusCode !== 200){console.log('Request error.');}
//
//    jsdom.env({
//        html: body,
//        scripts: ['http://code.jquery.com/jquery-2.1.3.min.js'],
//        done: function(err, window){
//            var $ = window.jQuery,
//                links = $('.challenge > a');
//            
//            links.each(function() {
//                console.log($(this).text());
//            });
//        }
//    });
//
//    scanLink('http://vimgolf.com/challenges/4e7dedb4f447090001000002');
//});

scanLink('http://vimgolf.com/challenges/5462e3f41198b80002512673');
