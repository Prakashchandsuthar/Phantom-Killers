'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:OrganizationlistCtrl
 * @description
 * # OrganizationlistCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationlistCtrl', function ($scope, $state, organizationsService, projectsService, employeesService) {

        $scope.addUniqueItem = addUniqueItem;

        organizationsService.getAllOrganizations()
            .success (function (data){
                $scope.organizations = data || [];
            })
            .error (function (error){
                console.log (error.msg);
             });

        employeesService.getAllEmployees()
            .success (function (data){
            $scope.employees = data;
            $scope.addOwner = $scope.employees[0];
        })
            .error (function (error){
            console.log (error.msg);});

        projectsService.getAllProjects()
            .success (function (data){
            $scope.projects = data;
            $scope.addProject = $scope.projects[0];
        })
            .error (function (error){
            console.log (error.msg);});

        $scope.addOrganization = function (newOrganization) {
            newOrganization = newOrganization || {};
            if (!newOrganization.name) {
                alert('Add Name');
                return;
            }
            $scope.addOrg = false;
            $scope.newOrg = {};
            var newId = 1;
            if ($scope.organizations.length) {
                $scope.organizations.sort(function(a,b){return a._id - b._id;});
                newId = $scope.organizations[$scope.organizations.length-1]._id + 1;
            }
            newOrganization._id = getUniqueTime();
            organizationsService.addOrganization(newOrganization);
        };
  });
