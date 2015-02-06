'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmployeesListCtrl
 * @description
 * # EmployeesListCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('EmployeesListCtrl', function ($scope,employeesService) {
    employeesService.getAllEmployees()
      .success (function (data){
      $scope.employees = data;
      //$scope.$apply();
    })
      .error (function (error){
      console.log (error.msg);});

  });
