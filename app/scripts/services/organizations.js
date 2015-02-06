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

        this.addProjectToCurrentOrg = function (newProjectName, orgId) {
          var currOrg;
          var idx = getOrganizationIndex (organizations, '' + orgId);
          if (idx !== -1) {
            currOrg = organizations[idx];
          }
          var newProjects = {projects: currOrg.projects};
          newProjects.projects.push(newProjectName);
          $http.put('http://localhost:3000/api/organizations/'+orgId, newProjects)
            .success(function(item){
              currOrg = item;
            })
            .error(function(error){
              if (error) {
              }
            });
        };

        this.removeProject = function(deletedProject, orgId) {

          var currOrg;
          var idx = getOrganizationIndex (organizations, '' + orgId);
          if (idx !== -1) {
            currOrg = organizations[idx];
          }
          var newProjects = {projects: currOrg.projects};
          newProjects.projects.splice(newProjects.projects.indexOf(deletedProject), 1);
          $http.put('http://localhost:3000/api/organizations/'+orgId, newProjects)
            .success(function(item){
              currOrg = item;
            })
            .error(function(error){
              if (error) {
              }
            });
        };

    var getProjectIndex = function(projects, projectName) {
      projects.forEach(function(project, index) {
        if(project == projectName) {
          return index;
        }
      });
    };

    this.updateProject = function(projectIndex, project, orgId) {
      var currOrg;
      var idx = getOrganizationIndex (organizations, '' + orgId);
      if (idx !== -1) {
        currOrg = organizations[idx];
      }
      var newProjects = {projects: currOrg.projects};
      newProjects.projects[projectIndex] = project;
      $http.put('http://localhost:3000/api/organizations/'+orgId, newProjects)
        .success(function(item){
          currOrg = item;
        })
        .error(function(error){
          if (error) {
          }
        });
    };

    this.resetProject = function(projectIndex, projectName, orgId) {

      var currOrg;
      var idx = getOrganizationIndex (organizations, '' + orgId);
      if (idx !== -1) {
        currOrg = organizations[idx];
      }
      var newProjects = {projects: currOrg.projects};
      newProjects.projects[projectIndex] = projectName;
      $http.put('http://localhost:3000/api/organizations/'+orgId, newProjects)
        .success(function(item){
          currOrg = item;
        })
        .error(function(error){
          if (error) {
          }
        });
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
                if ('' + organizations[idx]._id === orgId) {
                    return idx;
                }
            }
            return -1;
        };
  });
