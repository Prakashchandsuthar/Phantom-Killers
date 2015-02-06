'use strict';

describe('Service: employees', function () {

  // load the service's module
  beforeEach(module('dashboardApp'));

  // instantiate service
  var employees;
  beforeEach(inject(function (_employees_) {
    employees = _employees_;
  }));

  it('should do something', function () {
    expect(!!employees).toBe(true);
  });

});
