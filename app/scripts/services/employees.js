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

    };

        this.getEmployee = function (empId) {
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {successCallback = callback; return response;},
                error: function (callback) {errorCallback = callback; return response;}
            };

            $http.get('http://localhost:3000/api/employees/'+empId)
                .success(function(item){
                    var idx = getEmployeeIndex (employees, empId);
                    if (idx !== -1) {
                        employees[idx] = item;
                    }
                    successCallback(item);
                })
                .error(function(error){
                    if (error) {
                        errorCallback({msg: 'No Employee with: ' + empId + ' id'});
                    }
                });

            return response;
        };

    this.addEmployee = function(newEmp) {
        $http.post('http://localhost:3000/api/employees', newEmp)
            .success(function (item) {
                employees.push(item);
            })
            .error(function (error) {
                if (error) {
                    errorCallback(error);
                }
            });
    };

        this.deleteEmployee = function(empId) {
            $http.delete('http://localhost:3000/api/employees/'+empId)
                .success(function (item) {var idx = getEmployeeIndex (employees, '' + empId);
                    if (idx !== -1) {
                        employees.splice(idx, 1);
                    }
                })
                .error(function (error) {
                    if (error) {
                        errorCallback(error);
                    }
                });
        };

        this.updateEmployee = function(newEmp) {
            $http.put('http://localhost:3000/api/employees/'+newEmp._id, newEmp)
                .success(function(item){
                    var idx = getEmployeeIndex (employees, '' + newEmp._id);
                    if (idx !== -1) {
                        employees[idx] = item;
                    }
                })
                .error(function(error){
                    if (error) {
                    }
                });
        };

        this.getEmployeeByName = function (employees, name) {
            if (!employees) {
                return undefined;
            }
            var len = employees.length;
            for (var idx = 0; idx < len; idx++) {
                if (employees[idx].name === name) {
                    return employees[idx];
                }
            }
            if (len > 0) {
                return employees[0];
            }
            return undefined;
        };

        var getEmployeeIndex = function (employees, empId) {
            var len = employees.length;
            for (var idx = 0; idx < len; idx++) {
                if ('' + employees[idx]._id === empId) {
                    return idx;
                }
            }
            return -1;
        };
  });

