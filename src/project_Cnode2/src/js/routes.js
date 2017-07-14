;
(function() {
    var routes = angular.module("routes", []);
    routes.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        //设置默认路由;
        $urlRouterProvider.when('', '/index/home');

        $stateProvider.state("index", {
                url: "/index",
                templateUrl: "template/index.html"
            })
            .state("index.home", {
                url: "/home",
                templateUrl: "template/home.html"
            })

            //----发现路由--
            .state("index.discover", {
                url: "/discover",
                templateUrl: "template/discover.html"
            })
            .state("index.discover.quanbu",{
                url:"/quanbu",
                templateUrl:"template/discover/xlist-discover.html"
            })





            .state("index.create", {
                url: "/create",
                templateUrl: "template/create.html"
            })

        //进入到detail页面
        .state("detail", {
            url: "/detail/:id",
            templateUrl: "template/detail.html"
        })
    }])
})();
