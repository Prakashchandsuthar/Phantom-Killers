'use strict';

describe('Controller: EmployeesListCtrl', function () {

  // load the controller's module
  beforeEach(module('dashboardApp'));

  var EmployeesListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmployeesListCtrl = $controller('EmployeesListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
