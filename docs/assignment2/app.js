(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController )
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService );

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController (ShoppingListCheckOffService) {
    // Capture the toBuy constroller object instance
    var toBuy = this;

    // Get the list of items that the user hasn't bought, from the service.
    toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

    // If the list is empty, show an error message.
    toBuy.showError = ShoppingListCheckOffService.showError(toBuy.toBuyItems);

    // Add the item to the list of bought items
    toBuy.addToTheListOfBoughtItems = function(index){
      ShoppingListCheckOffService.addToTheListOfBoughtItems(index);
    }
  }
// Controller for the bought items
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function  AlreadyBoughtController(ShoppingListCheckOffService){
    var alreadyBought = this;
    alreadyBought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    alreadyBought.showError = ShoppingListCheckOffService.showError(alreadyBought.boughtItems);
  }

  function ShoppingListCheckOffService(){
    var service = this;
    var toBuyItems = [
        {
          name: 'Beans',
          quantity: '10kg'
        },
        {
          name: 'Potatoes',
          quantity: '2kg'
        },
        {
          name: 'Meat',
          quantity:'5kg'
        },
        {
          name: 'rice',
          quantity: '10kg'
        },
        {
          name: 'Sweet potatoes',
          quantity: '20kg'
        }
    ];
    var alreadBoughtItems = [];
    service.addToTheListOfBoughtItems = function(index) {
      alreadBoughtItems.push(toBuyItems[index]); // Add bought items to the alreadBoughtItems.
      toBuyItems.splice(index,1); // Remove it from the list of toBuyItems.
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return alreadBoughtItems;
    };
    service.showError = function(list){
      return function(){
        if(list.length == 0){
          return true;
        }else{
          return false;
        }
      }

    }
  }

})();
