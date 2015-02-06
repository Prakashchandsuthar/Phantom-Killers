'use strict';

describe('Controller: EmployeesViewCtrl', function () {

  // load the controller's module
  beforeEach(module('dashboardApp'));

  var EmployeesViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmployeesViewCtrl = $controller('EmployeesViewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
