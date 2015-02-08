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

            $http.get('http://localhost:3000/api/organizations/'+orgId)
                .success(function(item){
                    var idx = getOrganizationIndex (organizations, orgId);
                    if (idx !== -1) {
                        organizations[idx] = item;
                    }
                    successCallback(item);
                })
                .error(function(error){
                    if (error) {
                        errorCallback({msg: 'No Organization with: ' + orgId + ' id'});
                    }
                });

            return response;
        };

        this.addOrganization = function(newOrganization) {
            $http.post('http://localhost:3000/api/organizations', newOrganization)
                .success(function (item) {
                    organizations.push(item);
                })
                .error(function (error) {
                    if (error) {
                        errorCallback(error);
                    }
                });
        };

        this.deleteOrganization = function(orgId) {
            $http.delete('http://localhost:3000/api/organizations/'+orgId)
                .success(function (item) {var idx = getOrganizationIndex (organizations, '' + orgId);
                    if (idx !== -1) {
                        organizations.splice(idx, 1);
                    }
                })
                .error(function (error) {
                    if (error) {
                        errorCallback(error);
                    }
                });
        };

        this.updateOrganization = function(newOrg) {
            $http.put('http://localhost:3000/api/organizations/'+newOrg._id, newOrg)
                .success(function(item){
                    var idx = getOrganizationIndex (organizations, '' + newOrg._id);
                    if (idx !== -1) {
                        organizations[idx] = item;
                    }
                })
                .error(function(error){
                    if (error) {
                    }
                });
        };

        this.getOrganizationByName = function (organizations, name) {
            if (!organizations) {
                return undefined;
            }
            var len = organizations.length;
            for (var idx = 0; idx < len; idx++) {
                if (organizations[idx].name === name) {
                    return organizations[idx];
                }
            }
            if (len > 0) {
                return organizations[0];
            }
            return undefined;
        };

        var getOrganizationIndex = function (organizations, orgId) {
            var len = organizations.length;
            for (var idx = 0; idx < len; idx++) {
                if ('' + organizations[idx]._id === orgId) {
                    return idx;
                }
            }
            return -1;
        };
  });
