'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.employees
 * @description
 * # employees
 * Service in the dashboardApp.
 */
angular.module('dashboardApp')
  .service('employeesService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var employees = [];

    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getAllEmployees = function () {
      var successCallback, errorCallback;
      var response = {
        success: function (callback) {
          successCallback = callback;
          return response;
        },
        error: function (callback) {
          errorCallback = callback;
          return response;
        }
      };

      $http.get('http://localhost:3000/api/employees')
        .success(function (items) {
          employees = items;
          successCallback(employees);
        })
        .error(function (error) {
          if (error) {
            errorCallback(error);
          }
        });

      return response;

    }
  });

