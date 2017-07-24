  var app4 = angular.module("app4", [])
  app.controller("footerCtrl", function($scope) {
      //点击事件
      $scope.link = function() {
          console.log(666);
      };
      $scope.img =['../../img/weui/icon_tabbar.png','../../img/weui/icon_tabbar.png','../../img/weui/icon_tabbar.png']
  });
