'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ProjecteditCtrl
 * @description
 * # ProjecteditCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ProjecteditCtrl', function ($scope, $stateParams, projectsService) {

        projectsService.getProject($stateParams.projId)
            .success (function (data){
                $scope.project = data;
                //$scope.$apply();
                console.log ($scope.project.name);})
            .error (function (error){
                console.log (error.msg);});

        //$scope.project = projectsService.getProject($stateParams.projId);
        //console.log ($scope.project.name);
  });
