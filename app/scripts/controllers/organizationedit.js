'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:OrganizationeditCtrl
 * @description
 * # OrganizationeditCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationeditCtrl', function ($scope, $state, $stateParams, organizationsService) {


        organizationsService.getOrganization($stateParams.orgId)
            .success (function (data){
            $scope.organization = data;
            $scope.$apply();
            console.log ($scope.organization.name);})
            .error (function (error){
            console.log (error.msg);});

    $scope.addProject = function (orgName) {
        for(var i = 0; i<= orgName.projects.length-1; i++){
          if($scope.addNewProject == orgName.projects[i]){
            alert ("Duplicate Org Name");
            $scope.addNewProject = undefined;
            return false;
          }
        }
        if ($scope.addNewProject != undefined && $scope.addNewProject.trim() != '') {
          organizationsService.addProjectToCurrentOrg($scope.addNewProject.trim(), orgName.name);
          $scope.addNewProject = undefined;
        }
    };

    $scope.deleteProject = function(project, orgName) {

      organizationsService.removeProject(project, orgName);
    };

    $scope.openDialog = function(project, orgName) {
      $state.transitionTo("organization.edit.popup");
    };

    $scope.updateProject = function(projectIndex, newValue, orgName) {
      organizationsService.updateProject(projectIndex, newValue, orgName);
    }

    $scope.resetProject = function(projectIndex, projectName, orgName) {
      organizationsService.resetProject(projectIndex, projectName, orgName);

      $scope.$apply();
    }

  });
