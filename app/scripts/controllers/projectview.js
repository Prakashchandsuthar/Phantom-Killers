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
                $scope.series = ['Total','Billable', 'Bench'];
                $scope.labels = data.labels;
                $scope.Stats = [
                    data.total,
                    data.billable,
                    data.bench
                ];
            })
            .error (function (error){
                console.log (error.msg);});

        $scope.deleteProject = function(projId) {
            projectsService.deleteProject(projId);
        }
  });
