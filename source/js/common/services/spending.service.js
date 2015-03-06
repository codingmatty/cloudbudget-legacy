angular.module('CloudBudget')
  .factory(
  'SpendingService',
  [
    function() {
      var transactionIds = [];
      var dailySpent = 0;
      var weeklySpent = 0;
      var monthlySpent= 0;

      var monthlySpendable = 2000;

      return {
        getDailySpent: function() {return dailySpent;},
        getWeeklySpent: function() {return weeklySpent;},
        getMonthlySpent: function() {return monthlySpent;},
        
        
        getDailySpendable: function() {
          var today = new Date();
          var lastDayOfThisMonth = (new Date(today.getFullYear(),today.getMonth() + 1,0)).getDate();
          var daysRemaining = lastDayOfThisMonth - today.getDate() + 1;
          return (monthlySpendable - monthlySpent) / daysRemaining;
        },
        getWeeklySpendable: function() {
          var today = new Date();
          var lastDayOfThisMonth = (new Date(today.getFullYear(),today.getMonth() + 1,0)).getDate();
          var begOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1); // Plus 1 to make beg of week Monday
          var weeksRemaining = (lastDayOfThisMonth - begOfWeek.getDate() + 1) / 7;
          return ((monthlySpendable - monthlySpent) + weeklySpent) / weeksRemaining;
        },
        getMonthlySpendable: function() {
          return monthlySpendable;
        },
        
        setMonthlySpendable: function(calculatedSpendable) {
          monthlySpendable = calculatedSpendable;
        },
        
        registerTransaction: function(transaction) {
          if (!transaction.date || transaction.tag != 'count' 
             || transactionIds.indexOf(transaction._id) >= 0) return;
          
          transactionIds.push(transaction._id);
          
          var today = new Date();
          var transactionDate = new Date(transaction.date);

          if (transactionDate.toDateString() == today.toDateString()) {
            dailySpent += transaction.amount;
          }
          if (transactionDate.getMonth() == today.getMonth()) {
            monthlySpent += transaction.amount;
          }
          var begOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1); // Plus 1 to make beg of week Monday
          var endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay()), 0, 0, -1);
          if (transactionDate >= begOfWeek && transactionDate <= endOfWeek) {
            weeklySpent += transaction.amount;
          }   
        },
        
        unregisterTransaction: function(transaction) {
          var transactionIdIdx = transactionIds.indexOf(transaction._id)
          if (!transaction.date || transactionIdIdx < 0) return;
          
          transactionIds.splice(transactionIdIdx, 1);
          
          var today = new Date();
          var transactionDate = new Date(transaction.date);

          if (transactionDate.toDateString() == today.toDateString()) {
            dailySpent -= transaction.amount;
          }
          if (transactionDate.getMonth() == today.getMonth()) {
            monthlySpent -= transaction.amount;
          }
          var begOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1); // Plus 1 to make beg of week Monday
          var endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay()), 0, 0, -1);
          if (transactionDate >= begOfWeek && transactionDate <= endOfWeek) {
            weeklySpent -= transaction.amount;
          }
        }
      };
    }]);