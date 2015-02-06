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


        organizationsService.getOrganization($stateParams.orgId)
            .success (function (data){
            $scope.organization = data;
            //$scope.$apply();
            console.log ($scope.organization.name);})
            .error (function (error){
            console.log (error.msg);});

        //$scope.organization = organizationsService.getOrganization($stateParams.orgId);
        //console.log ($scope.organization.name);
  });
