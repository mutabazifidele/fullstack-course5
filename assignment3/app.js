(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController )
  .service('MenuSearchService', MenuSearchService )
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective)
  ;

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
     scope: {
      menu: '<myMenu',
       onRemove: '&onRemove' // Meaning that scope used for executing this method, needs to be the parent scope. Reference binding.
    //                 //The argument needs to come from the directive template.
     }
  };
  return ddo;
}

// The controller
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";
  menu.items = "";
  menu.getMatchedMenuItems = function(){
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

    promise.then(function (response) {
      menu.items = response.data.menu_items;
      // console.log("response.data: ", response.data);
      // console.log("response.data.menu_items: " , response.data.menu_items);
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };

  menu.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}
// The MenuSearchService

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var response;
  var menu_items;
  service.getMatchedMenuItems = function (searchTerm) {
    response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then( function (result) { // result is
      // process result and only keep items that match
      menu_items =  result.data.menu_items;
      menu_items = menu_items.filter(item=>{
          if (item.description.indexOf(searchTerm) !== -1){
            return true;
          }else{
            return false;
          }
      }); // End foundItems
      result.data.menu_items = menu_items;
      return result;
    }); // end then
    return response;
  }; // end getMatchedMenuItems
  service.removeItem = function (itemIndex) {
    menu_items.splice(itemIndex, 1);
  };

}

})();
