'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.dashboard
 * @description
 * # dashboard
 * Service in the dashboardApp.
 */
angular.module('dashboardApp')
  .service('dashboardService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var weeklyStats = {billable: [150, 145, 153, 150, 158], bench: [58, 63, 55, 59, 52]};
    var projects = [
      {name: 'PDX', billable: [50, 45, 53, 50, 58], bench: [19, 21, 17, 19, 17], note: 'Most Active project'},
      {name: 'Google', billable: [25, 22, 25, 25, 28], bench: [10, 11, 8, 9, 10], note: 'Most Attractive project'},
      {name: 'Zimbra', billable: [27, 32, 22, 27, 28], bench: [13, 11, 7, 19, 12], note: 'Near Completion'},
      {name: 'CMS', billable: [25, 28, 35, 28, 30], bench: [8, 10, 18, 9, 11], note: 'Just Started...'}
    ];

    this.getWeeklyStats = function () {
      return weeklyStats;
    };

    this.getDailyStats = function () {
      return {
        billable: weeklyStats.billable[weeklyStats.billable.length - 1],
        bench: weeklyStats.bench[weeklyStats.bench.length - 1]
      }
    };

    this.getProjects = function () {
      return projects;
    };

  });
