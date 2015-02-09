'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmployeesEditCtrl
 * @description
 * # EmployeesEditCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('EmployeesEditCtrl', function ($scope,$state, $stateParams, employeesService, projectsService, organizationsService) {
        employeesService.getEmployee($stateParams.empId)
            .success (function (data){
            $scope.employee = data;
            $scope.newEmp = JSON.parse(JSON.stringify($scope.employee));
            $scope.newSkills = $scope.newEmp.skills;
            $scope.newProjects = $scope.newEmp.projects;
            $scope.addOrg = organizationsService.getOrganizationByName($scope.organizations, $scope.newEmp.organization);
        })
            .error (function (error){
            console.log (error.msg);});

        projectsService.getAllProjects()
            .success (function (data){
            $scope.projects = data;
            $scope.addProject = $scope.projects[0];
            //$scope.$apply();
        })
            .error (function (error){
            console.log (error.msg);});

        organizationsService.getAllOrganizations()
            .success (function (data){
            $scope.organizations = data;
            $scope.addOrg = organizationsService.getOrganizationByName($scope.organizations, $scope.newEmp.organization);
            //$scope.$apply();
        })
            .error (function (error){
            console.log (error.msg);});

        $scope.skills = ['Javascript', 'Java', 'C++', 'Python', 'NodeJs', 'MongoDB', 'Agile', 'Automation', 'Scripting'];
        $scope.addSkill = 'Javascript';


        $scope.updateEmployee = function(newEmp) {
            newEmp = newEmp || {};
            if (!newEmp.name) {
                alert('Add Name');
                return;
            }
            $scope.newEmp = {};
            newEmp.billable = newEmp.billable || false;
            newEmp.organization = $scope.addOrg.name;
            employeesService.updateEmployee(newEmp);
            $state.transitionTo('employees.view', {empId: newEmp._id});

        };

        $scope.cancelUpdate = function() {
            $scope.newEmp = JSON.parse(JSON.stringify($scope.employee));
            $scope.addOrg = organizationsService.getOrganizationByName($scope.organizations, $scope.newEmp.organization);
            $scope.newSkills = $scope.newEmp.skills;
            $scope.newProjects = $scope.newEmp.projects;
        };

  });
