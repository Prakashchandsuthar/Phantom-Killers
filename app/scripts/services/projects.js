'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.projects
 * @description
 * # projects
 * Service in the dashboardApp.
 */
angular.module('dashboardApp')
  .service('projectsService', function ($http) {
        var projects = [];

        // AngularJS will instantiate a singleton by calling "new" on this function
        this.getAllProjects = function () {
          //console.log("getAllprojects");
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {successCallback = callback; return response;},
                error: function (callback) {errorCallback = callback; return response;}
                };


            $http.get('http://localhost:3000/api/projects')
                .success(function(items){
                    projects = items;
                    successCallback(projects);
                })
                .error(function(error){
                    if (error) {
                        errorCallback(error);
                    }
                });

            return response;
        };

        this.getProject = function (projId) {
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {successCallback = callback; return response;},
                error: function (callback) {errorCallback = callback; return response;}
            };

            $http.get('http://localhost:3000/api/projects/'+projId)
                .success(function(item){
                    var idx = getProjectIndex (projects, projId);
                    if (idx !== -1) {
                        projects[idx] = item;
                    }
                    successCallback(item);
                })
                .error(function(error){
                    if (error) {
                        errorCallback({msg: 'No Project with: ' + projId + ' id'});
                    }
                });

            return response;
        };

        this.addProject = function(newProject) {
            $http.post('http://localhost:3000/api/projects', newProject)
                .success(function (item) {
                    projects.push(item);
                })
                .error(function (error) {
                    if (error) {
                        errorCallback(error);
                    }
                });
        };

        this.deleteProject = function(projId) {
            $http.delete('http://localhost:3000/api/projects/'+projId)
                .success(function (item) {var idx = getProjectIndex (projects, '' + projId);
                    if (idx !== -1) {
                        projects.splice(idx, 1);
                    }
                })
                .error(function (error) {
                    if (error) {
                        errorCallback(error);
                    }
                });
        };

        this.updateProject = function(newProj) {
            $http.put('http://localhost:3000/api/projects/'+newProj._id, newProj)
                .success(function(item){
                    var idx = getProjectIndex (projects, '' + newProj._id);
                    if (idx !== -1) {
                        projects[idx] = item;
                    }
                })
                .error(function(error){
                    if (error) {
                    }
                });
        };

        this.getProjectByName = function (projects, name) {
            if (!projects) {
                return undefined;
            }
            var len = projects.length;
            for (var idx = 0; idx < len; idx++) {
                if (projects[idx].name === name) {
                    return projects[idx];
                }
            }
            if (len > 0) {
                return projects[0];
            }
            return undefined;
        };

        var getProjectIndex = function (projects, projId) {
            var len = projects.length;
            for (var idx = 0; idx < len; idx++) {
                if ('' + projects[idx]._id === projId) {
                    return idx;
                }
            }
            return -1;
        };
  });
