(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {
  //TODO: use $inject property to protect your code from minification
  $scope.lunchList = "";
  $scope.message = "";
  $scope.checkLunch = function(){
    //1. split the lunch list in indidivual lunch items(using split)
    var numberOfLunchItems = getNumberOfLunchItems($scope.lunchList);
    //2. Decide which message to display depending of the numbe
        //2.1 Lunch is empty(0): "Please enter data first"
        if($scope.lunchList == ""){
          $scope.message = "Please enter data first";
        //2.2 #items <= 3: Enjoy
        }else if(numberOfLunchItems <= 3) {
          $scope.message = "Enjoy";
        }else {
        //2.3 #items > 3: "Too much"
          $scope.message = "Too much";
        }
      };
});

  function getNumberOfLunchItems(lunchInput){
    return lunchInput.split(",").length;
  }
})();
