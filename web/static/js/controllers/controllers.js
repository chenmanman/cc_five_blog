/**
 * 存放一些公用的controller
 * 注意的是这边返回的是一个module
 * 这边是可以建很多controller的,
 * 就类似于basecontroller
 * 
 * **/

define(['angular',
        ], function (angular) {
    'use strict';
    var BaseControllers = angular.module('controllers', []);
    
	return BaseControllers;

});


