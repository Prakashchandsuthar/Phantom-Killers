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
                //$scope.$apply();
            })
            .error (function (error){
                console.log (error.msg);});

        //$scope.organization = organizationsService.getOrganization($stateParams.orgId);
        //console.log ($scope.organization.name);
  });
