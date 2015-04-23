angular.module('CloudBudget')
  .factory(
  'SpendingService',
  [ 'TimelineService',
   function(TimelineService) {
     var tl = TimelineService;
     var today = tl.today;
     var transactions = new Map();

     var dailySpent = 0;
     var weeklySpent = 0;
     var monthlySpent = 0;

     function calculateDailySpent(date) {
       date = date || today;
       if (transactions.has(date.toDateString())) {
         return transactions.get(date.toDateString()).reduce(function(spentInDay, currentTransaction) {
           if (currentTransaction.tag == 'count')
             return spentInDay + currentTransaction.amount;
           else
             return spentInDay;
         }, 0);
       } else {
         return 0;
       }
     };
     function calculateWeeklySpent(date) {
       date = date || today;
       return tl.daysInWeek(date).reduce(function(spentInWeek, currentDate) {
         return spentInWeek + calculateDailySpent(currentDate);
       }, 0);
     };
     function calculateMonthlySpent(date) {
       date = date || today;
       return tl.daysInMonth(date).reduce(function(spentInMonth, currentDate) {
         return spentInMonth + calculateDailySpent(currentDate);
       }, 0);
     };
     function calculatePeriodSpent(startDate, endDate) {
       return tl.daysInPeriod(startDate, endDate).reduce(function(spentInPeriod, currentDate) {
         return spentInPeriod + calculateDailySpent(currentDate);
       }, 0);
     };

     var dailySpendable = 0;
     var weeklySpendable = 0;
     var monthlySpendable = 2000;

     function calculateDailySpendable(date) {
       date = date || today;
       var daysRemaining = tl.daysLeftInMonth(date);
       return (monthlySpendable - (calculateMonthlySpent(date) -  calculateDailySpent(date))) / daysRemaining;
     };
     function calculateWeeklySpendable(date) {
       date = date || today;
       var weeksRemaining = tl.weeksLeftInMonth(date);
       if (date.getMonth() != tl.endOfWeek(date).getMonth()
           || date.getMonth() != tl.startOfWeek(date).getMonth()) {
         // This date is the last week of month.
         // || This date is the first week of month
         var daysRemainingLastMonth = tl.daysLeftInMonth(tl.startOfWeek(date));
         var dailySpendableAtBegOfWeekForLastMonth = (monthlySpendable - (calculateMonthlySpent(tl.startOfWeek(date)) -  calculatePeriodSpent(tl.startOfWeek(date), tl.endOfMonth(tl.startOfWeek(date))))) / daysRemainingLastMonth;
         var firstDayOfNextMonth = tl.startOfMonth(tl.endOfWeek(date));
         var daysRemainingNextMonth = tl.daysLeftInMonth(firstDayOfNextMonth);
         var dailySpendableAtBegOfNextMonth = (monthlySpendable - (calculateMonthlySpent(firstDayOfNextMonth) - calculatePeriodSpent(firstDayOfNextMonth, tl.endOfWeek(date)))) / daysRemainingNextMonth;
         return ((dailySpendableAtBegOfWeekForLastMonth * tl.daysLeftInMonth(tl.startOfWeek(date))) + (dailySpendableAtBegOfNextMonth * tl.daysLeftInWeek(firstDayOfNextMonth)));
       }

       var daysRemaining = tl.daysLeftInMonth(tl.startOfWeek(date));
       return ((monthlySpendable - (calculateMonthlySpent(date) -  calculateWeeklySpent(date))) / daysRemaining) * 7;
     };
     //     function calculateMonthlySpendable(date) {
     //       date = date || today;
     //       return monthlySpendable;
     //     };

     function recalculateSpent(date) {
       date = date || today;
       dailySpent = calculateDailySpent(date);
       weeklySpent = calculateWeeklySpent(date);
     };
     function recalculateSpendable(date) {
       date = date || today;
       monthlySpent = calculateMonthlySpent(date);
       dailySpendable = calculateDailySpendable(date);
       weeklySpendable = calculateWeeklySpendable(date);
     };

     // Init()
     recalculateSpent();
     recalculateSpendable();

     return {
       setMonthlySpendable: function(calculatedSpendable) {
         monthlySpendable = calculatedSpendable;
         recalculateSpendable();
       },

       getDailySpent: function() {return dailySpent; },
       getWeeklySpent: function() {return weeklySpent; },
       getMonthlySpent: function() {return monthlySpent; },

       getDailySpendable: function() { return dailySpendable; },
       getWeeklySpendable: function() { return weeklySpendable; },
       getMonthlySpendable: function() { return monthlySpendable; },

       registerTransaction: function(transaction) {
         var transactionDate = new Date(transaction.date);
         if (!transactions.has(transactionDate.toDateString()))
           transactions.set(transactionDate.toDateString(), []);
         if (!transactions.get(transactionDate.toDateString()).some(function(savedTransaction) {
           return savedTransaction._id == transaction._id;
         })) {
           transactions.get(transactionDate.toDateString()).push(transaction);
         }
         
         recalculateSpent();
         recalculateSpendable();
       },

       unregisterTransaction: function(transaction) {
         var transactionDateStr = (new Date(transaction.date)).toDateString();
         if (!transactions.has(transactionDateStr)) return;
         var transactionIndex = -1;
         transactionArray = transactions.get(transactionDateStr);
         transactionArray.some(function(currentTransaction, index) {
           if (transaction._id == currentTransaction._id) {
             transactionIndex = index;
             return true;
           }
           return false;
         });
         if (transactionIndex >= 0) {
           transactionArray.splice(transactionIndex, 1);
         }

         recalculateSpent();
         recalculateSpendable();
       }
     };
   }]);