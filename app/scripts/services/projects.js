'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.projects
 * @description
 * # projects
 * Service in the dashboardApp.
 */
angular.module('dashboardApp')
  .service('projectsService', function () {
        var projects = [
            {name: 'PDX', openpositions: '6', reddays: '0', billable: 'area-chart.png', peoples: ['Anil'], owner: 'Anil'},
            {name: 'CMS', openpositions: '0', reddays: '0', billable: 'pie-chart.png', peoples: ['Preshit'], owner: 'Preshit'},
            {name: 'Loven', openpositions: '1', reddays: '0', billable: 'pie-chart.png', peoples: ['Sumeet','Anuja', 'Vijay'], owner: 'Mukund'},
            {name: 'LRS', openpositions: '2', reddays: '1', billable: 'pie-chart.png', peoples: ['Sourabh','Rohan'], owner: 'Ashutosh'},
            {name: 'Google', openpositions: '16', reddays: '4', billable: 'pie-chart.png', peoples: ['Atul','Uttam', 'Rahul'], owner: 'Salil'},
            {name: 'Mercatus', openpositions: '0', reddays: '2', billable: 'pie-chart.png', peoples: ['Praveen','Mitesh', 'Chandan'], owner: 'Ashutosh'},
            {name: 'Halliburton', openpositions: '10', reddays: '0', billable: 'pie-chart.png', peoples: ['Mukund','Onkar'], owner: 'Mukund'},
            {name: 'Zimbra', openpositions: '3', reddays: '0', billable: 'pie-chart.png', peoples: ['hrishikesh','Rane'], owner: 'Ashutosh'},
            {name: 'Studer', openpositions: '2', reddays: '1', billable: 'pie-chart.png', peoples: ['Preshit'], owner: 'Preshit'},
            {name: 'CloudOn', openpositions: '0', reddays: '2', billable: 'pie-chart.png', peoples: ['Rohit','Sujit'], owner: 'Amit Bakore'},
            {name: 'Prezi', openpositions: '4', reddays: '0', billable: 'pie-chart.png', peoples: ['Ravindra', 'Amit'], owner: 'Amit Bakore'}
        ];
        this.currProjId;
        // AngularJS will instantiate a singleton by calling "new" on this function
        this.getAllProjects = function () {
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {
                    successCallback = callback; return response;
                },
                error: function (callback) {errorCallback = callback; return response;}
            };
            setTimeout(function(){
                successCallback(projects);
            }, 500);
            return response;
        };

        this.getProject = function (projId) {
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {successCallback = callback; return response;},
                error: function (callback) {errorCallback = callback; return response;}
            };
            setTimeout(function(){
                var idx = getProjectIndex (projects, projId);
                if (idx !== -1) {
                    successCallback(projects[idx]);
                } else {
                    errorCallback({msg: 'No Project with: ' + projId + ' id'});
                }
            }, 500);
            return response;
        };

        this.getCurrentProject = function () {
            return getProject(this.currProjId);
        };

        this.setCurrentProject = function (projId) {
            this.currProjId = projId;
        };

        var getProjectIndex = function (projects, projId) {
            var len = projects.length;
            for (var idx = 0; idx < len; idx++) {
                if (projects[idx].name === projId) {
                    return idx;
                }
            }
            return -1;
        };
  });
