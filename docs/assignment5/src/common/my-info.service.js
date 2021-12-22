(function () {
"use strict";

angular.module('common')
.service('MyInfoService', MyInfoService );


MyInfoService.$inject = ['$http', 'ApiPath'];
function MyInfoService($http, ApiPath) {
  var service = this;
  service.userInfo = {};
  var signUpMessage = '';
  var submitMessage = '';
  var response;
  var favoriteMenuItem = '';
  // ----------------submit -------------------------------------------------
  service.submit = function (favoriteMenu) {
    var config = {};
    if (favoriteMenu) {
      config.params = {'category': favoriteMenu };
    }

    return $http.get(ApiPath + '/menu_items.json', config);
  };

  service.saveUserInfo = function(_userInfo){
  service.userInfo.firstname = _userInfo.firstname;
  service.userInfo.lastname = _userInfo.lastname;
  service.userInfo.email = _userInfo.email;
  service.userInfo.phone = _userInfo.phone;
  service.userInfo.favoriteMenu = _userInfo.favoriteMenu;
};


// ----------------getUserInfo -------------------------------------------------
  service.getUserInfo = function () {
    // check whether the user already have registered.
    if(Object.entries(service.userInfo).length === 0){
       signUpMessage = "Not Signed Up Yet. Sign up Now!";
    }
    return  service.userInfo;
  };

// ----------------getSignUpMessage -------------------------------------------------
  service.getSignUpMessage = function(){
    return signUpMessage;
  };

  service.getSubmitMessage = function(){
    return submitMessage;
  };

  service.setCategoryName = function(menuItem){
      favoriteMenuItem = menuItem;
  };
  service.getCategoryName = function(){
    if(favoriteMenuItem){
      return  favoriteMenuItem;
    };
  }

}

})();
