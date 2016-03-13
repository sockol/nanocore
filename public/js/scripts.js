


/*
Main settings
*/ 

settings = {

    //edit path to your project root
    path : "http://localhost:8081",

    //breakpoint width defined in readme.md    
    devices : {
        iPad: 800 
    }, 
    dbug: false,
}

scroll = {

    keys : {37: 1, 38: 1, 39: 1, 40: 1},

    preventDefault: function (e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;  
    },

    preventDefaultForScrollKeys: function (e) {
        if (keys[e.keyCode]) {
            this.preventDefault(e);
            return false;
        }
    },

    disableScroll: function () {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', this.preventDefault, false);
      window.onwheel = this.preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
      window.ontouchmove  = this.preventDefault; // mobile
      document.onkeydown  = this.preventDefaultForScrollKeys;
    },

    enableScroll: function () {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;  
    }, 
} 
 
var app = angular.module("mainApp", ["ngRoute"]);

/*
Helper services
*/
app.service('helperService', ['$window', function(win) {
    
    this.navigationLeft = function(){
        
        return [];
        return [{
     
            link : settings.path+"/about",
            text : "About",
            internal : true
        }];
    };

    this.navigationRight = function(){

        return [];
        return [{
     
            link : settings.path+"/portfolio",
            text : "Portfoio",
            internal : true
        }];
    };

    this.partition = function(arr, start, stop) {
       
       return arr.splice(index, start, stop);
    } 
     
}]);




/*
Main controller
*/ 
app.controller("mainController", ["$scope","$route","$routeParams","$rootScope", "$timeout", "helperService", function($scope, $route, $routeParams, $rootScope, $timeout, helperService) {
 
    settings.dbug && console.log("Main controller");
  
    $scope.navigationLeft = helperService.navigationLeft();
    $scope.navigationRight = helperService.navigationRight();

    /* display main page content */
    $scope.visible = false; 
    $scope.hideLoader = function(){

        return $scope.visible;
    }; 
    $scope.showContent = function(){
  
        //load directive here?
        return !$scope.visible;
    }; 
    $timeout(function() { 
        $scope.visible = true;
    }, 500); 
    
    $scope.message = {
        show : false,
        text : 'Click "back" to enable scrolling'  
    }    

    $scope.$route = $route;  
}]);


/*
Home controller
*/ 
app.controller("homeController", ["$scope","$route","$routeParams","$rootScope", "$timeout", "$sce", "helperService", function($scope, $route, $routeParams, $rootScope, $timeout, $sce, helperService) {
    
    

    settings.dbug && console.log("Home controller!");
     
    /*
    Timeline
    */  


    $scope.portfolio = [
        [{
            url:'/nanocore',
            src:'/img/portfolio/nanocore/logo.png',
            date:'March 2016',
            title:'My Portfolio',
            subtitle:'you\'re looking at it now', 
            tags:['NodeJS','Angular','SCSS','Greensock-JS'],
            description:"A simple site made in a week to showcase my most presentable work since I began building websites.\n"+
                        "This portfolio is a simple NodeJS/Angular app (Node here is, for now, only being used as a server and to run gulp) with just 1 page (for now) "+
                        "with a description of the technologies I have used, my resume and a more descriptive timeline of what I\'ve been doing for the past 6 years",
            links:{
                github:'',
                site:'http://nanocore.ru',
                link:''
            },
            code:[{
                title:'My animation workflow',
                description:'Singelton for the win! A simple object used to abstract away the details of animating with the Greensock JS Library',
                text:'hello 1'
            },{
                title:'SCSS sample',
                description:'I usually break up my style into a style.css for main styles and a media.css file for media queries. Global variables will go to the top, then animation styles, then the rest',
                text:'hello 2'
            }]
        },{
            url:'/junebug-weddings',
            src:'/img/portfolio/junebug-weddings/logo.png',
            date:'Present',
            title:'Junebug Weddings',
            subtitle:'Media/News website',
            tags:['Wordpress','Raw PHP','MySql','jQuery','JS','SCSS'],
            description:"I am rebuilding a high traffic site managed by an Austin company as a contractor.\n"+
                        "The website is a multisite Wordpress installation that, at this point, is more raw PHP than Wordpress.",
            links:{ 
                site:'http://junebugweddings.com',
                link:'http://jb.nanocore.ru'
            },
        },{
            url:'/chrometv',
            src:'/img/portfolio/chrometv/logo.png',
            date:'Feb 2016',
            title:'Chrome Kiosk App',
            subtitle:'video player with caching',
            tags:['jQuery','SCSS','IndexedDB','Kaltura Platform'],
            description:"A small project I worked on at RxWiki as an intern. This is a Chrome Kiosk App that uses the kaltura video platform and IndexedDB to cache content and serve it without interruptions (works offline too) on a ChromeBox.\n"+
                        "Relies heavily on jQuery promises to synchronize workflow.\n"+
                        "Note - project is not finished - still need to finish the part that preloads new videos once a new playlist starts playing/fix small animation bugs\n"+
                        "Note - files intentionally left incomplete\n"+ 
                        "This project consists of 5 classes: \n"+
                        "1 Database class that simplifies indexedDB interaction through getter/setter/init methods\n"+
                        "2 Video class that handles fetching new content (links to video files) from a separate server\n"+
                        "3 Display class takes care of animations and transitions\n"+
                        "4 Kaltura class plays the actual video and has methods to reinitiate the player to the next video/play ads/functions that rebuild the player in case the ad happens to break the player\n"+
                        "5 A main class that puts the above 4 classes together\n",

            links:{
                github:'https://github.com/sockol/chrome-tv',
                site:'http://chrometv.nanocore.ru', 
            },
        }],

        [{
            url:'/rxwiki',
            src:'/img/portfolio/rxwiki/logo.png',
            date:'Dec 2016-Jan 2016',
            title:'RxWiki Video',
            subtitle:'Ads Integration',
            tags:['Drupal','JS','jQuery','Kaltura Platform', 'VAST/VPAID'],
            description:"Integrated the Kaltura Video Platform into the main company website to service video ads. To play ads you need both the video player and the ad provider to"+
                        "comply with the accepted ad format (VAST/VPAID). \nAnd ofcourse, no-one actually follows it 100% and some of the incoming ads were breaking the player."+
                        "The challenge there was to expand the player's functionality by catching errors, while sifting through tons of documentation that would be either inconsistent or inclomplete.\n"+
                        "The other challenge was to make the player work with custom video URLs, since the available ad plugins did not support that. So I had to use a generic ad plugin and expand its"+
                        "functionality to support waterfall ads and ad errors.\nLater, I rebuilt the workflow of the platform to improve speed and reduce the server load.\n"+
                        "I also built in a debuggin feature that you can see here: <a href='http://www.rxwiki.com/abilify?dbug=3'>link</a>",
            links:{
                github:'https://github.com/sockol/kaltura_player',
                site:'http://www.rxwiki.com/abilify', 
            },
        },{
            url:'/3dcrestwhite',
            src:'/img/portfolio/3dcrestwhite/logo.png',
            date:'June 2015',
            title:'3D-Crest-white',
            subtitle:'My E-Store',
            tags:['Wordpress','PHP','jQuery'],
            description:"My e-store theme (I made the design, front & backend) built on Wordpress and a customized Woocommerse. \n We sell mostly in Moscow and close by cities, with half of all "+
                        "our orders getting processed on this site. This site also has a tied to it admin system "+
                        "for tracking users and verifying how many real followers we have on our instagram page. Currently rebuilding",
            links:{
                github:'https://github.com/sockol/3dcrestwhite.ru',
                site:'http://3dcrestwhite.ru',
                link:'https://github.com/sockol/3dcrestwhite.ru/blob/master/js/scripts.js'
            },
        },{
            url:'/wilko',
            src:'/img/portfolio/wilko/logo.png',
            date:'Dec 2015',
            title:'Wilko Properties',
            subtitle:'Real Estate',
            tags:['Wordpress','PHP','jQuery','PSD'],
            description:"Built a theme (both back and front end) in Wordpress for an Austin Realtor.\n In the beginning I got a big list of requirments and content that the company "+
                        "wanted to display. Based on that, I first made mockups on Photoshop, which later were approved by the client, designed the content types and relationships, \n"+
                        "and then built both back and front end parts of the site. The most interesting part of this website is an Ajax-ified quote page, a map with properties "+
                        "which one can select, choose associated with them floor plans, and later pick the facades associated with the floor plans.",
            links:{
                github:'https://github.com/sockol/starlight',
                site:'http://wilko.nanocore.ru',
                link:'http://wilko.nanocore.ru/wp-content/themes/starlight/js/scripts.js?ver=4.3.3'
            },
        }],

        [{
            url:'/kickpleat',
            src:'/img/portfolio/kickpleat/logo.png',
            date:'Feb 2014',
            title:'Kickpleat',
            subtitle:'E-Store',
            tags:['Shopify','Liquid','jQuery'],
            description:'My first project on Shopify, here my work was mostly on front end. This is a clothing store in Austin, doing most of their sales through their website',
            links:{ 
                site:'http://kickpleat.com', 
            },
        },{
            url:'/yvek',
            src:'/img/portfolio/yvek/logo.png',
            date:'Apr 2013',
            title:'New-Century',
            subtitle:'My News Wesbite',
            tags:['Wordpress','PHP','jQuery','PSD'],
            description:"Made a news website on Wordpress and worked with 11 copywriters, an editor and a content manager to promote it (in Russia). Won a Business Incubator competition at "+
                        "the University of Economics of G.B. Plehanov in Moscow that gives the project access to federal funding and investors. \nLost in the final round, never got funding. Won two awards "+
                        "from the positivecontent.ru project and was invited to an award ceremony (which I couldn't attend) held each year in Moscow to connect Russian web start-ups.",
            links:{ 
                site:'http://yvek.ru', 
            },
        },{
            url:'/wilson-goldrick',
            src:'/img/portfolio/wilson-goldrick/logo.jpg',
            date:'July 2014',
            title:'Wilson Goldrick',
            subtitle:'Real Estate',
            tags:['Wordpress','PHP','jQuery'],
            description:"Built a custom theme on Wordpress for an Austin Realtor with multiple content types, custom filtering by multiple post field values, a map with posts based on the address, "+
                        "horizontal/vertical scrolling for landscape/portrait phone modes and occasional direct SQL queries for when a call to wp_query() isn’t enough.",
            links:{
                github:'https://github.com/sockol/wilson_goldrick',
                site:'http://wilsongoldrick.com', 
            },
        }]
    ];

    $scope.timeline = [
        [{
            top:'top-0',
            left:'left-m-0',
            text:'Went to the University of Richmond to major in Economics',
            date:'2010 Aug',
        },{
            top:'top-100',
            left:'left-p-50',
            text:'Droped out to work on a personal project',
            date:'2011 May',
        },{
            top:'top-200',
            left:'left-m-100',
            text:'Self taught Web Dev, built my first wesite on raw PHP,and later rebuilt it on CodeIgniter-2 & jQuery',
            date:'2011 June',
        },{
            top:'top-0',
            left:'left-p-350',
            text:'Launched my project at Drake University',
            date:'2013 Jan',
        },{
            top:'top-150',
            left:'left-m-50',
            text:'Started building a russian version of StumbleUpon.com on ZendFramework-2',
            date:'2013 Apr',
        },{
            top:'top-250',
            left:'left-m-250',
            text:'Built a tech-news website on Wordpress, wrote and posted my own articles',
            date:'2013 May',
        },{
            top:'top-50',
            left:'left-p-350',
            text:'Transferred to UT Austin, launched zacenieto.ru ',
            date:'2013 Aug',
        }],  

        [{
            top:'top-0',
            left:'left-m-0',
            text:'Got a part time job at RxWiki as a Front-End developer.  ',
            date:'2013 Sep',
        },{
            top:'top-150',
            left:'left-m-200',
            text:'yvek.ru began growing, with all of my traffic coming from search. We won two awards from the positivecontent.ru project and were invited to an award ceremony (which I couldn\'t attend) held each year in Moscow to connect Russian web start-ups and bloggers. Traffic grew steadily. ',
            date:'2013 Sep',
        },{
            top:'top-0',
            left:'left-m-200',
            text:'On the first month after launching we had 650/month pageviews. In November traffic reaches 4000 pageviews/month. 2 copywriters join the project',
            date:'2013 Nov',
        },{
            top:'top-150',
            left:'left-m-300',
            text:'We won two awards from the positivecontent.ru project and were invited to an award ceremony (which I couldn\'t attend) held each year in Moscow to connect Russian web start-ups and bloggers.',
            date:'2013 Nov',
        },{
            top:'top-100',
            left:'left-m-200',
            text:'Project passes the preliminary selection from 300 applicants and a first pitch presentation at a Business Incubator competition at the University of Economics of G.B. Plehanov in Moscow',
            date:'2014 Jan',
        },{
            top:'top-0',
            left:'left-m-200',
            text:'I eventually end up hiring 9 copywriters, a content manager and an editor to help me manage the site. ',
            date:'2014 Feb',
        },{
            top:'top-200',
            left:'left-m-300',
            text:'The site gets 40,000 pageviews/month',
            date:'2014 July',
        },{
            top:'top-0',
            left:'left-m-250',
            text:'I lost in the final round of the business incubator, couldn\'t keep up with payroll, had to close down the project. ',
            date:'2014 Aug',
        },{
            top:'top-100',
            left:'left-m-300',
            text:'The site is still online, getting around 30,000 pageviews/month.',
            date:'2013-2016 ',
        }],  
    ];
  
    $scope.portfolioSlideRight = function(site){


        $("html,body").animate({
            scrollTop: 1900
        },500,function(){
 
            TweenLite.to($("#portfolio-cicle-1"), .5, { 
                opacity:1,  
                onComplete: function(){

                    

                    TweenLite.to($("#portfolio"), 1, { 
                        left:-3000,    
                    });  
                    TweenLite.to($("#portfolio-line-8"), 1, { 
                        width:2400,  
                        onComplete: function(){  
                            
                            // scroll.disableScroll(); 
                            // $scope.message.show = true; 
                            // $scope.$apply();
                        }
                    }); 
                },  
            });   
        });  
        

        site.description = $sce.trustAsHtml(site.description.replace(/\n/g, "<br>")); 
        $scope.sitePage = site; 
    }
    $scope.portfolioSlideLeft = function(){
 

        $("html,body").animate({
            scrollTop: 1900
        },500,function(){
            
            // scroll.enableScroll();

            TweenLite.to($("#portfolio"), 1, { 
                left:0,    
            }); 
            TweenLite.to($("#portfolio-line-8"), 1, { 
                width:0,    
                onComplete: function(){
 
                    // $scope.message.show = false;
                    // $scope.$apply();

                    TweenLite.to($("#portfolio-cicle-1"), .5, { 
                        opacity:0,    
                    }); 
                }, 
            }); 
        });
    }
                    

    $scope.include = "/content/home.html"; 
    $scope.$route = $route;   
}]);


app.controller("portfolioController", ["$scope","$route","$routeParams", function($scope, $route, $routeParams) {

    $scope.include = "/content/single.html";
}]); 

app.controller("404Controller", ["$scope","$route","$routeParams", function($scope, $route, $routeParams) {

    $scope.include = "/main/404.html"; 
}]);   
 

/*
Configure our routes
Note-urls that match the pattern but yield no template will not display an error
*/ 
app.config(function($routeProvider, $locationProvider) {
    
    settings.dbug && console.log("App config");

    $routeProvider.when("/", { 
        controller: "homeController", 
        template: "<div ng-include='include'></div>" 

    }).when("/portfolio/:action", { 
        controller: "portfolioController", 
        template: "<div ng-include='include'></div>" 

    }).when("/content/:action/:subaction", { 
        controller: "subactionController", 
        template: "<div ng-include='include'></div>"  

    }).when("/404", { 
        controller: "404Controller", 
        template: "<div ng-include='include'></div>" 

    }).otherwise({
        redirectTo: '/404'   
    });  

    $locationProvider.html5Mode(true);
});  
 
 