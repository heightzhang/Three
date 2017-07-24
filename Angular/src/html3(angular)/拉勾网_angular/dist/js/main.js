  var app4 = angular.module("app4", [])
  app.controller("footerCtrl", function($scope) {
      //点击事件
      $scope.link = function() {
          console.log(666);
      };
      $scope.img =['../../img/weui/icon_tabbar.png','../../img/weui/icon_tabbar.png','../../img/weui/icon_tabbar.png']
  });

var app5 = angular.module("app5",[])
app5.controller("headerCtrl", function($scope) {
    //model
    $scope.title = "拉勾网"
})
var app3 = angular.module("app3", []);

app3.controller("listCtrl", function($scope, $http, $rootScope) {

    //遮罩层
    $rootScope.abc = true;

    //查看更多
    $scope.show_hide = true;
    $scope.show = function() {
        $scope.show_hide = false;
         //正在加载
        $scope.doing = true;
    };


    $http({
        method: "POST",
        data: {
            name: "heightzhang"
        },
        url: "http://localhost:8081/",
        headers: {
            'Content-Type': undefined
        }
    }).then(function(data) {

        $scope.html = data.data;

        $rootScope.abc = false;
    }, function(err) {

    });


    //---------------查看更多-----------------------
    var page = 1;
    var num = 7;

    $scope.readMore = function() {
        page++;

        $http({
            method: "GET",
            params: {
                page: page,
                num: num
            },
            url: "http://localhost:8081/",
            headers: {
                'Content-Type': undefined
            }
        }).then(function(data) {
            //data.data
            $scope.html = $scope.html.concat(data.data)  //两个数组的合并;
           
            //正在加载与遮罩层
            $scope.doing = false;
            $rootScope.abc = false;

            //暂无数据与查看更多;
            if (data.data.length < num) {
                $scope.last = true;
                $scope.show_hide = false;
            };

            data.data = null; //性能优化;清除旧数组;

        }, function(err) {
            console.log(err);
        });
    };
});

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
