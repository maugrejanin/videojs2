var index = angular.module("index", ['angularMoment', 'ngMaterial', 'ngRoute', 'ngAnimate', 'ngResource', 'ngMask', 'material.components.navBar', 'ngSanitize', 'whimsicalRipple', 'ngMessages', 'swipe', 'scrollToEnd'])
.config(function($mdDateLocaleProvider) {
  $mdDateLocaleProvider.formatDate = function(date) {
    return date ? moment(date).format('DD/MM/YYYY') : '';
  };
})
;
