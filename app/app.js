'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', ['ngRoute','moviecat.movie_detail','moviecat.movie_list'])
	.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}]).controller('SearchController',['$scope','$route',function ($scope,$route)  {
	$scope.inputValue = '';		//绑定一个搜索框的值
	$scope.search = function(){
		$route.updateParams({category: 'search',q:$scope.inputValue});
	};
}]).controller('NavController',['$scope','$location',function($scope,$location){
	$scope.$location = $location;
	$scope.$watch('$location.path()',function(now){
		var now = now.split('/');
		switch (now[1]){
			case 'in_theaters':
				$scope.type = "in_theaters";
				break;
			case 'coming_soon':
				$scope.type = "coming_soon";
				break;
			case 'top250':
				$scope.type = "top250";
				break;
			default : $scope.type = "in_theaters"; break;
		}
	})
}]);













