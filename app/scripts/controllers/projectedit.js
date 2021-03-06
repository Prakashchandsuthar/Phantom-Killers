'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ProjecteditCtrl
 * @description
 * # ProjecteditCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ProjecteditCtrl', function ($scope, $state, $stateParams, projectsService, organizationsService, employeesService) {

        $scope.addUniqueItem = addUniqueItem;

        projectsService.getProject($stateParams.projId)
            .success (function (data){
                $scope.project = data;
                $scope.newProj = JSON.parse(JSON.stringify($scope.project));
                $scope.addOrg = organizationsService.getOrganizationByName($scope.organizations, $scope.newProj.organization);
                $scope.addOwner = employeesService.getEmployeeByName($scope.employees, $scope.newProj.owner);
                if ($scope.newProj.employees && $scope.newProj.employees.length > 0) {
                    $scope.addEmp = employeesService.getEmployeeByName($scope.employees, $scope.newProj.employees[0]);
                }
            })
            .error (function (error){
                console.log (error.msg);});

        employeesService.getAllEmployees()
            .success (function (data){
            $scope.employees = data;
            if($scope.newProj){
                $scope.addOwner = employeesService.getEmployeeByName($scope.employees, $scope.newProj.owner);

                if ($scope.newProj.employees && $scope.newProj.employees.length > 0) {
                    $scope.addEmp = employeesService.getEmployeeByName($scope.employees, $scope.newProj.employees[0]);
                }
            }
        })
            .error (function (error){
            console.log (error.msg);});

        organizationsService.getAllOrganizations()
            .success (function (data){
            $scope.organizations = data;
            if ($scope.newProj) {
                $scope.addOrg = organizationsService.getOrganizationByName($scope.organizations, $scope.newProj.organization);
            }
        })
            .error (function (error){
            console.log (error.msg);});

        $scope.updateProject = function (newProj) {
            newProj = newProj || {};
            if (!newProj.name) {
                alert('Add Name');
                return;
            }
            $scope.newProj = {};
            if ($scope.addOwner) {
                newProj.owner = $scope.addOwner.name;
            }
            if ($scope.addOrg) {
                newProj.organization = $scope.addOrg.name;
            }
            projectsService.updateProject(newProj);
            $state.transitionTo('projects.view', {projId: newProj._id});
        };

        $scope.cancelUpdate = function() {
            $scope.newProj = JSON.parse(JSON.stringify($scope.project));
            $scope.addOrg = organizationsService.getOrganizationByName($scope.organizations, $scope.newProj.organization);
            $scope.addOwner = employeesService.getEmployeeByName($scope.employees, $scope.newProj.owner);
            if ($scope.newProj.employees && $scope.newProj.employees.length > 0) {
                $scope.addEmp = employeesService.getEmployeeByName($scope.employees, $scope.newProj.employees[0]);
            }
        };
  });
