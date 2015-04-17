angular.module('CloudBudget')
  .factory(
  'TimelineService',
  [
    function() {
      var startingDayOfWeek = 1; // Week is Mon - Sun
      var today = new Date();

      function previousDay(date) {
        date = date || today;
        return new Date(date.getFullYear(),
                        date.getMonth(),
                        date.getDate() - 1);
      };
      function nextDay(date) {
        date = date || today;
        return new Date(date.getFullYear(),
                        date.getMonth(),
                        date.getDate() + 1);
      };

      return {
        setStartingDayOfWeek: function(dayOfWeek) {
          startingDayOfWeek = dayOfWeek;
        },
        
        today: today,
        yesterday: previousDay(),
        tomorrow: nextDay(),
        lastWeek: new Date(today.getFullYear(),
                           today.getMonth(),
                           today.getDate() - 7),
        nextWeek: new Date(today.getFullYear(),
                           today.getMonth(),
                           today.getDate() + 7),
        lastMonth: new Date(today.getFullYear(),
                            today.getMonth() - 1),
        nextMonth: new Date(today.getFullYear(),
                            today.getMonth() + 1),

        nextDay: nextDay,
        previousDay: previousDay,
        
        daysLeftInWeek: function(date) {
          date = date || today;
          // Number of days left in the week, inclusive.
          return (7 - (date.getDay() - startingDayOfWeek)) % 7;
        },
        startOfWeek: function(date) {
          date = date || today;
          return new Date(date.getFullYear(), 
                          date.getMonth(), 
                          date.getDate() 
                          - date.getDay() 
                          + startingDayOfWeek);
        },
        endOfWeek: function(date) {
          date = date || today;
          return new Date(date.getFullYear(), 
                          date.getMonth(), 
                          date.getDate() 
                          + (this.daysLeftInWeek(date) - 1));
        },
        daysInWeek: function(date) {
          date = date || today;
          // return array of days for this week
          var days = [];
          var currentDay = this.startOfWeek(date);
          for(var i = 0; i < 7; i++) {
            days.push(currentDay);
            currentDay = nextDay(currentDay);
          }
          return days;
        },

        daysLeftInMonth: function(date) {
          date = date || today;
          // Number of days left in the month, inclusive.
          var lastDayOfMonth = this.endOfMonth(date).getDate();
          return (lastDayOfMonth - date.getDate()) + 1;
        },
        weeksLeftInMonth: function(date) {
          date = date || today;
          return this.daysLeftInMonth(date) / 7;
        },
        startOfMonth: function(date) {
          date = date || today;
          return new Date(date.getFullYear(),
                          date.getMonth(),
                          1);
        },
        endOfMonth: function(date) {
          date = date || today;
          return new Date(date.getFullYear(),
                          date.getMonth() + 1,
                          0);
        },
        daysInMonth: function(date) {
          date = date || today;
          // return array of days for this week
          var days = [];
          var currentDay = this.startOfMonth(date);
          for(var i = 0; i < this.endOfMonth(date).getDate(); i++) {
            days.push(currentDay);
            currentDay = nextDay(currentDay);
          }
          return days;
        },
        
        daysInPeriod: function(startDate, endDate) {
          var days = [];
          var currentDay = startDate;
          while(currentDay.toDateString() != endDate.toDateString()) {
            days.push(currentDay);
            currentDay = nextDay(currentDay);
          }
          days.push(currentDay);
          return days;
        }
      };
    }]);