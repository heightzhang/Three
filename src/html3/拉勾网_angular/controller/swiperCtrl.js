 var app2 = angular.module("app2", []);

 app2.controller("swiperCtrl", function($scope,$window) {
     //model
     $scope.imgs = ["../../img/swiper/lagou1.jpg", "../../img/swiper/lagou2.jpg"];

     //植入JQ文件;
     var swiper = new Swiper('.swiper-container', {
         pagination: '.swiper-pagination',
         paginationClickable: true,
         autoplay: 2500
/*       ,
         observer:true, //修改swiper自己或子元素时，自动初始化swiper
         observeParents:true//修改swiper的父元素时，自动初始化swiper*/
     });
     //接收listCtrl控制器传递的数据;
     $scope.data = JSON.parse($window.sessionStorage.getItem('data'));
     

     var left = 2;
     angular.forEach($scope.data,function(item,idx){
        item.left = {"left":left +'px'};
        left+=70
        
     })
     console.log($scope.data);

 });
