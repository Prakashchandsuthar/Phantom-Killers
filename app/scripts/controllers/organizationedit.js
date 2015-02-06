'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:OrganizationeditCtrl
 * @description
 * # OrganizationeditCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationeditCtrl', function ($scope, $stateParams, organizationsService) {
    $scope.organization = {};

        organizationsService.getOrganization($stateParams.orgId)
            .success (function (data){
            $scope.organization = data;
            //$scope.$apply();
            console.log ($scope.organization.name);})
            .error (function (error){
            console.log (error.msg);});

    $scope.addProject = function () {
      for(var i = 0; i<= $scope.organization.projects.length-1; i++){
        if($scope.newProjectName == $scope.organization.projects[i]){
          alert ("Duplicate Org Name");
          $scope.newProjectName = undefined;
          return false;
        }
      }
      if ($scope.newProjectName != undefined && $scope.newProjectName.trim() != '') {
        organizationsService.addProjectToCurrentOrg($scope.newProjectName.trim(), $scope.organization._id);
        $scope.$apply();
        $scope.newProjectName = undefined;
      }
    };

    $scope.deleteProject = function(project) {

      organizationsService.removeProject(project, $stateParams.orgId);
    };

    $scope.updateProject = function(projectIndex, newValue, orgId) {
      organizationsService.updateProject(projectIndex, newValue, orgId);
    }

    $scope.resetProject = function(projectIndex, projectName, orgName) {
      organizationsService.resetProject(projectIndex, projectName, orgName);

      $scope.$apply();
    }
  });
