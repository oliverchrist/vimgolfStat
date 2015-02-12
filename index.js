/**
 * Module dependencies.
 */
 
var request = require('request'),
    jsdom = require('jsdom');

var scanLink = function(links, index) {
    link = 'http://www.vimgolf.com' + links[index++];
    request({uri: link}, function(err, response, body){
        if(err && response.statusCode !== 200){console.log('Request error.');}

        jsdom.env({
            html: body,
            scripts: ['http://code.jquery.com/jquery-2.1.3.min.js'],
            done: function(err, window){
                var $ = window.jQuery,
                    users = window.$('.notice'),
                    firstUser = $('.notice > div'),
                    lastUser = $('.notice:last-child > div'),
                    meUser = null,
                    bestScore,
                    worstScore,
                    myScore;
                
                users.each(function() {
                    var name = $(this).find('h6').text();

                    if(name.match(/Oliver Christ/)) {
                        meUser = $(this);
                    }
                });

                bestScore = parseInt(firstUser.eq(0).text());
                worstScore = parseInt(lastUser.text());

                console.log(link);
                if(meUser) {
                    myScore = parseInt(meUser.find('> div').text());
                    console.log('behind best: ' + (myScore - bestScore));
                } else {
                    console.log('not challenged');
                }

                if(index < links.length) {
                    scanLink(links, index);
                }
            }
        });
    });
};

request({uri: 'http://vimgolf.com'}, function(err, response, body){
    var self = this;
    self.items = new Array();//I feel like I want to save my results in an array
     
    if(err && response.statusCode !== 200){console.log('Request error.');}

    jsdom.env({
        html: body,
        scripts: ['http://code.jquery.com/jquery-2.1.3.min.js'],
        done: function(err, window){
            var $ = window.jQuery,
                links = $('.challenge > a'),
                linksHref = [];
            
            links.each(function() {
                linksHref.push($(this).attr('href'));
            });
            scanLink(linksHref, 0);
        }
    });
});
