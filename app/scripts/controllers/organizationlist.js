'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:OrganizationlistCtrl
 * @description
 * # OrganizationlistCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationlistCtrl', function ($scope, $state, organizationsService) {

        organizationsService.getAllOrganizations()
            .success (function (data){
                $scope.organizations = data;
                // $scope.$apply();
            })
            .error (function (error){
                console.log (error.msg);
             });

        $scope.showOrganization = function (organization) {
            console.log ('AMOl', organization.name);
            //$state.transitionTo('organization.view', organization);
        };
  });
