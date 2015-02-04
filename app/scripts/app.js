'use strict';

/**
 * @ngdoc overview
 * @name dashboardApp
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */
angular
  .module('dashboardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'chart.js'
  ])
.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/dashboard");
    //
    // Now set up the states
    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            controller: 'DashboardCtrl'
        })
        .state('organization', {
            url: "/organization",
            templateUrl: "views/organization.html",
            controller: 'OrganizationCtrl'
        })
        .state('organization.list', {
            url: "/list",
            templateUrl: "views/organization.list.html",
            controller: 'OrganizationlistCtrl',
            parent: 'organization'
        })
        .state('organization.view', {
            url: "/view/:orgId",
            templateUrl: "views/organization.view.html",
            controller: 'OrganizationviewCtrl',
            parent: 'organization'
        })
        .state('organization.edit', {
            url: "/edit/:orgId",
            templateUrl: "views/organization.edit.html",
            controller: 'OrganizationeditCtrl',
            parent: 'organization'
        })
        .state('projects', {
            url: "/projects",
            templateUrl: "views/projects.html",
            controller: 'ProjectsCtrl'
        })
        .state('projects.list', {
            url: "/list",
            templateUrl: "views/projects.list.html",
            controller: 'ProjectslistCtrl',
            parent: 'projects'
        })
        .state('projects.view', {
            url: "/view/:projId",
            templateUrl: "views/project.view.html",
            controller: 'ProjectviewCtrl',
            parent: 'projects'
        })
        .state('projects.edit', {
            url: "/edit/:projId",
            templateUrl: "views/project.edit.html",
            controller: 'ProjecteditCtrl',
            parent: 'projects'
        })
        .state('employees', {
            url: "/employees",
            templateUrl: "views/employees.html",
            controller: 'EmployeesCtrl'
        });
});

