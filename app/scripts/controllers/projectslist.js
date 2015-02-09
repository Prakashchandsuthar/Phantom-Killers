'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ProjectslistCtrl
 * @description
 * # ProjectslistCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ProjectslistCtrl', function ($scope, $state, projectsService, employeesService, organizationsService) {
        //$scope.projects = projectsService.getAllProjects();

        $scope.addUniqueItem = addUniqueItem;
        projectsService.getAllProjects()
            .success (function (data){
                $scope.projects = data;
                //$scope.$apply();
             })
            .error (function (error){
                console.log (error.msg);});

        employeesService.getAllEmployees()
            .success (function (data){
            $scope.employees = data;
            $scope.addOwner = $scope.employees[0];
            $scope.addEmp = $scope.employees[0];
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

    $scope.addProject = function (newProject) {
        newProject = newProject || {};
        if (!newProject.name) {
            alert('Add Name');
            return;
        }
        $scope.addProj = false;
        $scope.newProj = {};
        newProject.owner = $scope.addOwner.name || 'Vinayak';
        newProject.organization = $scope.addOrg.name;
        newProject._id = $scope.projects.length ? $scope.projects[$scope.projects.length-1]._id + 1: 1;
        projectsService.addProject(newProject);
    };
  });
