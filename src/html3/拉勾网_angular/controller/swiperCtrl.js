 var app2 = angular.module("app2", []);

 app2.controller("swiperCtrl", function($scope) {
     //model
     $scope.imgs = ["../../img/swiper/lagou1.jpg", "../../img/swiper/lagou2.jpg"];

     //植入JQ文件;
     var swiper = new Swiper('.swiper-container', {
         pagination: '.swiper-pagination',
         paginationClickable: true,
         autoplay: 2500
     });
 });
