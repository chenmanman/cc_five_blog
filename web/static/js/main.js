/**
 * 将路由和require的初始化放在了一起,项目中很注重层次性
 */
require.config({

    paths: {
    	    'jquery': '../lib/jquery',
	        'angular': '../lib/angular/angular.min',
	        'angular-route': '../lib/angular/angular-route.min',
	        'angular-resource' : '../lib/angular/angular-resource.min',
	        'domReady': '../lib/domReady',
			'bootstrapm' : '../lib/bootstrap/bootstrap.min',
    },
    // 注意这边可以添加map的属性,告诉require在优先加载一些文件，在某些条件下

    shim: {
    	'jquery': {
    		exports: '$'
    	},
		'bootstrapm' : [ 'jquery' ],
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-resource': ['angular'],
    },

    deps: [
        './bootstrap'
    ]
});

require( [
	    'app',
	    'bootstrap',
	    'angular-resource',	
	    'controllers/controllers',
	    'jquery',
		'bootstrapm',
	     ],
	function(app) {
		'use strict';
		return app.config( [ '$routeProvider', function($routeProvider) {

			$routeProvider
			.when('/', {
				templateUrl : 'views/homepage.html',
				controller : 'homepagecontrol'
			}).
			when('/post:catecode', {
				templateUrl : 'views/post.html',
				controller : 'postcontrol'
			}).when('/about', {
				templateUrl : 'views/about.html',
				controller : 'aboutcontrol'
			}).when('/npostreading:postid', {
				templateUrl : 'views/postreading.html',
				controller : 'postreadcontrol'
			}).when('/backend', {
				templateUrl : 'views/backend.html',
				controller : 'backendinitcontrol'
			}).when('/backend/postAdd', {
				templateUrl : 'views/backendpostadd.html',
				controller : 'backendcontrol'
			}).when('/backend/postList', {
				templateUrl : 'views/backendpostlist.html',
				controller : 'backendcontrol'
			}).when('/backend/blogCate', {
				templateUrl : 'views/backendblogcate.html',
				controller : 'backendcontrol'
			}).when('/backend/homepage', {
                templateUrl : 'views/backendhomepage.html',
                controller : 'backendcontrol'
            }).otherwise( {
				redirectTo : '/'
			});
		} ]);
	}
);

