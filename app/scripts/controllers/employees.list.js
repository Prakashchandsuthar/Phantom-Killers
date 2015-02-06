'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmployeesListCtrl
 * @description
 * # EmployeesListCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('EmployeesListCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
