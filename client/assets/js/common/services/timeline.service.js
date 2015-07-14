(function (angular) {
  var TimelineService = function () {
    var TimelineService = this;

    var startingDayOfWeek = 1; // Week is Mon - Sun
    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    TimelineService.setStartingDayOfWeek = function (dayOfWeek) {
      startingDayOfWeek = dayOfWeek;
    };

    TimelineService.today = today;

    TimelineService.nextDay = function (date) {
      date = date || today;
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    };
    TimelineService.previousDay = function (date) {
      date = date || today;
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    };

    TimelineService.yesterday = TimelineService.previousDay();
    TimelineService.tomorrow = TimelineService.nextDay();
    TimelineService.lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    TimelineService.nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    TimelineService.lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);
    TimelineService.nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);

    TimelineService.daysLeftInWeek = function (date) {
      date = date || today;
      // Number of days left in the week, inclusive.
      return (7 - (date.getDay() - startingDayOfWeek)) % 7;
    };
    TimelineService.startOfWeek = function (date) {
      date = date || today;
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + startingDayOfWeek);
    };
    TimelineService.endOfWeek = function (date) {
      date = date || today;
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + (this.daysLeftInWeek(date) - 1));
    };
    TimelineService.daysInWeek = function (date) {
      date = date || today;
      // return array of days for this week
      var days = [];
      var currentDay = this.startOfWeek(date);
      for (var i = 0; i < 7; i++) {
        days.push(currentDay);
        currentDay = TimelineService.nextDay(currentDay);
      }
      return days;
    };

    TimelineService.daysLeftInMonth = function (date) {
      date = date || today;
      // Number of days left in the month, inclusive.
      var lastDayOfMonth = this.endOfMonth(date).getDate();
      return (lastDayOfMonth - date.getDate()) + 1;
    };
    TimelineService.weeksLeftInMonth = function (date) {
      date = date || today;
      return this.daysLeftInMonth(date) / 7;
    };
    TimelineService.startOfMonth = function (date) {
      date = date || today;
      return new Date(date.getFullYear(), date.getMonth(), 1);
    };
    TimelineService.endOfMonth = function (date) {
      date = date || today;
      return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    };
    TimelineService.daysInMonth = function (date) {
      date = date || today;
      // return array of days for this week
      var days = [];
      var currentDay = this.startOfMonth(date);
      for (var i = 0; i < this.endOfMonth(date).getDate(); i++) {
        days.push(currentDay);
        currentDay = TimelineService.nextDay(currentDay);
      }
      return days;
    };

    TimelineService.daysInPeriod = function (startDate, endDate) {
      var days = [];
      var currentDay = startDate;
      while (currentDay.toDateString() != endDate.toDateString()) {
        days.push(currentDay);
        currentDay = TimelineService.nextDay(currentDay);
      }
      days.push(currentDay);
      return days;
    };
  };

  angular.module('CloudBudget').service('TimelineService', [TimelineService]);
})(window.angular);