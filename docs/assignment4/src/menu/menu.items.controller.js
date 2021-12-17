(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['itemsAndTheirCategory'];
function ItemsController(itemsAndTheirCategory) {
  var thisItems = this;
   thisItems.items = itemsAndTheirCategory.menu_items;
   thisItems.category = itemsAndTheirCategory.category;
}

})();
