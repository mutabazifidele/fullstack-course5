
(function () {
"use strict";

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['userInfo','MyInfoService'];
    function MyInfoController(userInfo, MyInfoService) {
      var $ctrl = this;
      $ctrl.message = '';
      $ctrl.userInfo = userInfo;
      $ctrl.registered = !(Object.entries($ctrl.userInfo).length === 0);
      if(!$ctrl.registered ){
          $ctrl.message = MyInfoService.getSignUpMessage();
      }
      $ctrl.favoriteMenuName = MyInfoService.getCategoryName();
    }

})();
