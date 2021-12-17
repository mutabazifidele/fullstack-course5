(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

// MenuDataService.$inject = ['$q', '$timeout']
MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;
  var response;
  var allCategories;
  service.getAllCategories = function() {
    response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    })
    .then( function (result) {
      allCategories =  result.data;
      return allCategories;
    }); // end then
    return response;
  }; // end getMatchedMenuItems

  service.getItemsForCategory = function(categoryShortName){
    var menuItemsWithShortName;
    response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category="+categoryShortName)
    })
    .then( function (result) { // result is
      // process result and only keep items that match
      menuItemsWithShortName =  result.data;
      return menuItemsWithShortName;
    }); // end then
    return response;
  };

  service.removeItem = function (itemIndex) {
    menu_items.splice(itemIndex, 1);
  };
}

})();
