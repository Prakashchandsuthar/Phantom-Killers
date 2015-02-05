'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('DashboardCtrl', function ($scope, dashboardService,projectsService) {
    var weeklyStats = dashboardService.getWeeklyStats();
    var dailyStats = dashboardService.getDailyStats();
    //$scope.projects = projectsService.getAllProjects();
    projectsService.getAllProjects()
      .success (function (data){
      $scope.projects = data;
      //$scope.$apply();
    })
      .error (function (error){
      console.log (error.msg);});

    $scope.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    $scope.series = ['Billable', 'Bench'];
    $scope.weeklyStats = [
      weeklyStats.billable,
      weeklyStats.bench
    ];
    $scope.dailyStats = [dailyStats.billable, dailyStats.bench];

  });
