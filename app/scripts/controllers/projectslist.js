'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ProjectslistCtrl
 * @description
 * # ProjectslistCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ProjectslistCtrl', function ($scope, $state, projectsService) {
        //$scope.projects = projectsService.getAllProjects();

        projectsService.getAllProjects()
            .success (function (data){
                $scope.projects = data;
                //$scope.$apply();
             })
            .error (function (error){
                console.log (error.msg);});

    $scope.showProject = function (project) {
      //console.log ('test project', project.name);
      //$state.transitionTo('organization.view', organization);
    };
  });
