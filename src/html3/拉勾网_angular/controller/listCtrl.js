var app3 = angular.module("app3", []);

app3.controller("listCtrl", function($scope, $http, $rootScope,$window) {

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
