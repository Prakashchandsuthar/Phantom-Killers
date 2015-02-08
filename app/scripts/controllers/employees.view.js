'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmployeesViewCtrl
 * @description
 * # EmployeesViewCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('EmployeesViewCtrl', function ($scope, $stateParams, employeesService) {
        employeesService.getEmployee($stateParams.empId)
            .success (function (data){
            $scope.employee = data;
        })
            .error (function (error){
            console.log (error.msg);});

        $scope.deleteEmployee = function(empId) {
            employeesService.deleteEmployee(empId);
        }
  });
