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
            .state("index.contacts", {
                url: "/contacts",
                templateUrl: "template/contacts.html"
            })
            .state("index.discover", {
                url: "/discover",
                templateUrl: "template/discover.html"
            })

        //进入到detail页面
        .state("detail", {
            url: "/detail/:id",
            templateUrl: "template/detail.html"
        })
    }])
})();
