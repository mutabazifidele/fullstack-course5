
(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

 SignUpController.$inject = ['MyInfoService'];
function SignUpController(MyInfoService) {
  var $ctrl = this;
   $ctrl.confirmationMessage = '';
   $ctrl.user = {
      firstname: '',
      lastname : '',
      email: '',
      phone: '',
      favoriteMenu: ''
   }

   $ctrl.submit = function(){

     var submitPromise = MyInfoService.submit($ctrl.user.favoriteMenu);
       $ctrl.confirmationMessage = '';
       $ctrl.noSuchItemMessage= '';
      submitPromise
        .then(function(result){
          if (result.data.menu_items.length !== 0) {
            MyInfoService.saveUserInfo($ctrl.user);
            $ctrl.confirmationMessage = 'You data have been succesfully registered for our future newsletter';
            MyInfoService.setCategoryName(result.data.category.name);
          }else{
            $ctrl.noSuchItemMessage = 'No such menu item exists';
          }
        })
   }
}

})();
