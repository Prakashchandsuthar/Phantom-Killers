'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.organizations
 * @description
 * # organizations
 * Service in the dashboardApp.
 */
angular.module('dashboardApp')
  .service('organizationsService', function ($http) {
        var organizations = [ ];

        this.currOrgId;
    // AngularJS will instantiate a singleton by calling "new" on this function
        this.getAllOrganizations = function () {
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {successCallback = callback; return response;},
                error: function (callback) {errorCallback = callback; return response;}
            };

            $http.get('http://localhost:3000/api/organizations')
                .success(function(items){
                    organizations = items;
                    successCallback(organizations);
                })
                .error(function(error){
                    if (error) {
                        errorCallback(error);
                    }
                });

            return response;
        };

        this.getOrganization = function (orgId) {
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {successCallback = callback; return response;},
                error: function (callback) {errorCallback = callback; return response;}
            };
            setTimeout(function(){
                var idx = getOrganizationIndex (organizations, orgId);
                if (idx !== -1) {
                    successCallback(organizations[idx]);
                } else {
                    errorCallback({msg: 'No Organization with: ' + orgId + ' id'});
                }
            }, 500);
            return response;
        };

        this.getCurrentOrganization = function () {
            return getOrganization(this.currOrgId);
        };

        this.setCurrentOrganization = function (orgId) {
            this.currOrgId = orgId;
        };

        var getOrganizationIndex = function (organizations, orgId) {
            var len = organizations.length;
            for (var idx = 0; idx < len; idx++) {
                if (organizations[idx].name === orgId) {
                    return idx;
                }
            }
            return -1;
        };
  });
