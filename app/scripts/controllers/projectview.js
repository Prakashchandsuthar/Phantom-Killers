'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ProjectviewCtrl
 * @description
 * # ProjectviewCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ProjectviewCtrl', function ($scope, $stateParams, projectsService) {
        console.log ($stateParams.projId);

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
