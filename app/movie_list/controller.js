'use strict';

var module = angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http'])

module.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/:category/:page', {
		templateUrl: 'movie_list/view.html',
		controller: 'MovieListController'
	});
}]);

module.controller('MovieListController', ['$scope','$route','$routeParams','HttpService',function($scope,$route,$routeParams,HttpService) {
	var count = 5;
	var page = parseInt($routeParams.page);
	var start = (page - 1) * count;
	$scope.subjects = [];
	$scope.message = [];
	$scope.totalCount = 0;
	$scope.currentPage = page;
	HttpService.jsonp("http://api.douban.com/v2/movie/"+$routeParams.category,
		{start: start, count: count, q: $routeParams.q},
		function(data){
			$scope.title = data.title;
			$scope.subjects = data.subjects;
			$scope.totalCount = data.total;
			$scope.totalPages = Math.ceil($scope.totalCount / count); //得到共有多少页
			$scope.$apply('subjects');
		});
	//传过来第几页，就跳转第几页
		$scope.go = function (page) {
			//做上一页，下一页范围校验
			if(page >= 1 &&page <= $scope.totalPages){
				$route.updateParams({page: page});
			};
		};
}]);


















