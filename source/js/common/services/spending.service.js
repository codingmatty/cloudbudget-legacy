angular.module('CloudBudget')
.factory(
  'SpendingService',
  [
   function() {
     var dailyAmount = 0;
     var weeklyAmount = 0;
     var monthlyAmount = 0;
     return {
       getDailyAmount: function() {return dailyAmount;},
       getWeeklyAmount: function() {return weeklyAmount;},
       getMonthlyAmount: function() {return monthlyAmount;},
       registerTransaction: function(transaction) {
         if (!transaction.date) return;
         
         var today = new Date();
         var transactionDate = new Date(transaction.date);
         
         if (transactionDate.toDateString() == today.toDateString()) {
           dailyAmount += transaction.amount;
         }
         if (transactionDate.getMonth() == today.getMonth()) {
           monthlyAmount += transaction.amount;
         }
         var begOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
         var endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay()), 0, 0, -1);
         if (transactionDate >= begOfWeek && transactionDate <= endOfWeek) {
           weeklyAmount += transaction.amount;
         }   
       }
     };
   }]);