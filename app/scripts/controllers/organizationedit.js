'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:OrganizationeditCtrl
 * @description
 * # OrganizationeditCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationeditCtrl', function ($scope, $state, $stateParams, organizationsService, employeesService, projectsService) {
    $scope.organization = {};

        $scope.addUniqueItem = addUniqueItem;

        organizationsService.getOrganization($stateParams.orgId)
            .success (function (data){
                $scope.organization = data;
                $scope.newOrg = JSON.parse(JSON.stringify($scope.organization));
                if ($scope.newOrg.owner && $scope.newOrg.owner.length > 0) {
                    $scope.addOwner = employeesService.getEmployeeByName($scope.employees, $scope.newOrg.owner[0]);
                }
                if ($scope.newOrg.projects && $scope.newOrg.projects.length > 0) {
                    $scope.addProject = projectsService.getProjectByName($scope.projects, $scope.newOrg.projects[0]);
                }
            })
            .error (function (error){
            console.log (error.msg);});

        employeesService.getAllEmployees()
            .success (function (data){
            $scope.employees = data;
            if ($scope.newOrg && $scope.newOrg.owner && $scope.newOrg.owner.length > 0) {
                $scope.addOwner = employeesService.getEmployeeByName($scope.employees, $scope.newOrg.owner[0]);
            }
        })
            .error (function (error){
            console.log (error.msg);});

        projectsService.getAllProjects()
            .success (function (data){
            $scope.projects = data;
            if ($scope.newOrg && $scope.newOrg.projects && $scope.newOrg.projects.length > 0) {
                $scope.addProject = projectsService.getProjectByName($scope.projects, $scope.newOrg.projects[0]);
            }
        })
            .error (function (error){
            console.log (error.msg);});

        $scope.updateOrganization = function(newOrg) {
            newOrg = newOrg || {};
            if (!newOrg.name) {
                alert('Add Name');
                return;
            }
            organizationsService.updateOrganization(newOrg);
            $state.transitionTo('organization.view', {orgId: newOrg._id});
        };

        $scope.cancelUpdate = function() {
            $scope.newOrg = JSON.parse(JSON.stringify($scope.organization));
            if ($scope.newOrg.owner && $scope.newOrg.owner.length > 0) {
                $scope.addOwner = employeesService.getEmployeeByName($scope.employees, $scope.newOrg.owner[0]);
            }
            if ($scope.newOrg.projects && $scope.newOrg.projects.length > 0) {
                $scope.addProject = projectsService.getProjectByName($scope.projects, $scope.newOrg.projects[0]);
            }
        };

  });
