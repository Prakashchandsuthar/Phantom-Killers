'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmployeesViewCtrl
 * @description
 * # EmployeesViewCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('EmployeesViewCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
