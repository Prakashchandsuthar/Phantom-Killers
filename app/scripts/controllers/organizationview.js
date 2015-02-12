'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:OrganizationviewCtrl
 * @description
 * # OrganizationviewCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationviewCtrl', function ($scope, $stateParams, organizationsService) {
        console.log ($stateParams.orgId);

        organizationsService.getOrganization($stateParams.orgId)
            .success (function (data){
                $scope.organization = data;
                $scope.series = ['Total','Billable', 'Bench'];
                $scope.labels = data.labels;
                $scope.Stats = [
                    data.total,
                    data.billable,
                    data.bench
                ];
                //$scope.$apply();
            })
            .error (function (error){
                console.log (error.msg);});

        $scope.deleteOrganization = function(orgId) {
            organizationsService.deleteOrganization(orgId);
        }
  });
