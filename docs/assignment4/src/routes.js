(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/menu/templates/home.template.html'
    })

    // Premade list page
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/menu/templates/categories.template.html'
      ,controller: 'CategoriesController as categoriesList'
      ,resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('items', {
      url: '/items/{short_name}'
      ,templateUrl: 'src/menu/templates/items.template.html'
      ,controller: "ItemsController as itemsList"
      ,resolve: {
        itemsAndTheirCategory: ['$stateParams','MenuDataService', function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.short_name);
        }]
      }
    })
  }
})();
