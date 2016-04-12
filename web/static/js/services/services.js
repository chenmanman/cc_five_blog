define(['angular'], function (angular) {
    'use strict';
      
	var BaseServices=angular.module('services',['ngResource']);
    
	BaseServices.factory('BaseModule',['$resource','$http',function($resource,$http){
		function getModel(url){
			return $resource(
				url,
				{},
				{
					'get':  {
						method:'GET',
					}
				}
			);
		};
		
	
		
		function postModel(url,formData){
			return $resource(
				url,
				{},
				{
					'save':{
						method:'POST',
						data:formData,
					}
				}
			);
		}


		function deleteModel(url){
			return $resource(
				url,
				{},
				{
					'DELETE':{
						method:'DELETE',
					}
				}
			);
		}
		
		function putModel(url,formData){
			return $resource(
				url,
				{},
				{
					'put':{
						method:'PUT',
						data:formData,
					}
				}
			);
		}
		
		

		
		

		/*注意返回值*/
		return{
			getModel:getModel,
			postModel:postModel,
			deleteModel:deleteModel,
			putModel:putModel,
		
		};
	}]);
    
    
    return BaseServices;
});