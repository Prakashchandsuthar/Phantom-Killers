'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmployeesListCtrl
 * @description
 * # EmployeesListCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('EmployeesListCtrl', function ($scope,employeesService, projectsService, organizationsService) {
    employeesService.getAllEmployees()
      .success (function (data){
      $scope.employees = data;
      //$scope.$apply();
    })
      .error (function (error){
      console.log (error.msg);});

        projectsService.getAllProjects()
            .success (function (data){
            $scope.projects = data;
            $scope.addProject = $scope.projects[0];
            //$scope.$apply();
        })
            .error (function (error){
            console.log (error.msg);});

        organizationsService.getAllOrganizations()
            .success (function (data){
            $scope.organizations = data;
            $scope.addOrg = $scope.organizations[0];
            //$scope.$apply();
        })
            .error (function (error){
            console.log (error.msg);});

        $scope.skills = ['Javascript', 'Java', 'C++', 'Python', 'NodeJs', 'MongoDB', 'Agile', 'Automation', 'Scripting'];
        $scope.addSkill = 'Javascript';

        $scope.addItem = function(items, item) {
            items = items || [];
            if (-1 === items.indexOf(item)) {
                items.push(item);
            }
        };

        $scope.addEmployee = function(newEmp) {
            newEmp = newEmp || {};
            if (!newEmp.name) {
                 alert('Add Name');
                return;
            }
            $scope.addEmp = false;
            $scope.newEmp = {};
            newEmp.billable = newEmp.billable || false;
            newEmp._id = $scope.employees.length ? $scope.employees[$scope.employees.length-1]._id + 1: 1;
            employeesService.addEmployee(newEmp);

        };

  });
