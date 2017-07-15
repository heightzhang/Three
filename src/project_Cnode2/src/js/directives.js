(function() {
    var directives = angular.module("directives", []);

    // ---------------------  一 / 首页 -------------------------------
    // 头部组件
    directives.directive("xheader", [function() {
        return {
            templateUrl: "directive/xheader.html"
        }
    }]);

    // 中间部分 置入home路由;
    //搜索框
    directives.directive("xsearch", [function() {
        return { //search的html
            templateUrl: "directive/xsearch.html",

            //搜索点击切换
            link: function(scope, ele, attr) {
                scope.isShowSearchBar = false;
                scope.changeSearchBar = function() {
                    scope.isShowSearchBar = true;
                }

                //过滤 ng-model
                //点击 叉 清空
                scope.empty = function() {
                    scope.match = '';
                }
            }
        }
    }]);
    //Swiper
    directives.directive("xswiper", [function() {
        return {
            templateUrl: "directive/xswiper.html",

            //控制器:轮播图自动播放;
            link: function(scope, ele, attr) {
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplay: 2500
                });
                //图片
                scope.imgs = ["img/swiper/0.jpg", "img/swiper/1.jpg", "img/swiper/2.jpg"];
            }
        }

    }]);
    //xlist
    directives.directive("xlist", ['$http', '$window', 'tool', "$filter", function($http, $window, tool, $filter) {
        return {
            templateUrl: "directive/xlist.html",

            link: function(scope, ele, attr) {
                scope.page = 0;
                scope.news = [];
                //加载更多的显示与隐藏
                scope.show = true;
                //暂无数据的显示与隐藏
                scope.none = false;
                //查看更多事件
                scope.langmore = function() {
                    //当加载到第三页的时候,无法点击,暂无数据的出现
                    if (scope.page == 3) {
                        scope.none = true;
                        return;
                    }
                    scope.page++
                        //ajax请求 
                        $http({
                            method: "get",
                            url: "https://cnodejs.org/api/v1/topics",
                            params: {
                                tab: attr.theme,
                                limit: 10,
                                page: scope.page
                            }
                        }).then(function(data) {
                            console.log(data)
                            scope.news = scope.news.concat(data.data.data);
                            scope.show = false;

                            //时间距离
                            /*
                            问题1:
                            scope.originalText = 'hello';
                            scope.filteredText = $filter('limitTo:3,3')(scope.originalText);
                            console.log(scope.filteredText)*/
                        });
                };
                scope.langmore();

                //跳转传递id;
                scope.setId = function(id) {
                    $window.location.href = "#!/detail/" + id
                }

            }
        }
    }]);

    //单页面Web应用切换(路由)

    //图片预览
    directives.directive("xgallery", [function() {
        return {
            templateUrl: "directive/xgallery.html",
            link: function(scope, ele, attr) {
                scope.isShowGallery = false;

                //点击显示预览图
                scope.changeGallery = function(imgs) {
                    scope.isShowGallery = true;
                    //设置预览图的路径
                    scope.galleryImg = imgs
                };
                //点击返回预览图
                scope.del = function() {
                    scope.isShowGallery = false;
                }
            }
        }
    }]);

    //脚本组件
    directives.directive("xfooter", ["$rootScope", function($rootScope) {
        return {
            replace: true,
            templateUrl: "directive/xfooter.html",
            //高亮切换
            link: function(scope, ele, attr) {
                //存储之前的高亮;
                $rootScope.tab ? $rootScope.tab : $rootScope.tab = 0;
                scope.changeTab = function(tab) {
                    $rootScope.tab = tab;
                };
            }
        }
    }]);

    // -----------------------------二 \  发现页面 -------------------------------------------------
    //xlistdiscover
    directives.directive("xlistdiscover", ['$http', '$window', "$location", "$rootScope", function($http, $window, $location, $rootScope) {
        return {
            templateUrl: "directive/discover/xlist-discover.html",

            link: function(scope, ele, attr) {
                //初始化
                scope.page = 0;
                scope.news = [];
                //保持高亮
                $rootScope.heightline ? $rootScope.heightline : $rootScope.heightline = '';

                //查看更多事件
                scope.langmore = function() {
                    //加载更多的显示与隐藏
                    scope.show = true;
                    //暂无数据的显示与隐藏
                    scope.none = false;
                    //当加载到第三页的时候,无法点击,暂无数据的出现
                    if (scope.page == 3) {
                        scope.none = true;
                        scope.abc = { "display": "none" }
                        return;
                    }
                    scope.page++
                        //ajax请求 
                        $http({
                            method: "get",
                            url: "https://cnodejs.org/api/v1/topics",
                            params: {
                                page: scope.page
                            }
                        }).then(function(data) {
                            console.log(data)
                            scope.news = scope.news.concat(data.data.data);
                            scope.show = false;
                        });
                };
                scope.langmore();

                //跳转传递id;
                scope.setId = function(id) {
                    $window.location.href = "#!/detail/" + id
                };

                //----不同主题的分类,点击输出theme;
                scope.dian = function(e) {

                    //加载更多的显示与隐藏
                    scope.show = true;
                    //暂无数据的显示与隐藏
                    scope.none = false;
                    scope.theme = e.target.name
                    scope.news = [];
                    $http({
                        method: "get",
                        url: "https://cnodejs.org/api/v1/topics",
                        params: {
                            tab: scope.theme
                        }
                    }).then(function(data) {
                        scope.news = scope.news.concat(data.data.data);
                        scope.show = false;
                    });

                    //高亮切换
                    $rootScope.heightline = e.target.name;
                };

                //导航条滚动效果
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    slidesPerView: 3,
                    paginationClickable: true,
                    spaceBetween: 30,
                    freeMode: true
                });
            }
        }
    }]);


    //-----------------------三 \ 详情页面-------
    directives.directive('xdetail', ['$state', '$http', function($state, $http) {
        return {
            templateUrl: "directive/xdetail.html",
            link: function(scope, ele, attr) {
                scope.id = $state.params.id
                $http({
                    method: "get",
                    url: "https://cnodejs.org/api/v1/topic/" + scope.id
                }).then(function(data) {
                    scope.detail = data.data.data;
                    scope.html = scope.detail.content;
                })

            }
        }
    }]);
    //返回跳转;
    directives.directive('xreturn', ["$window", "$rootScope", "$location", function($window, $rootScope, $location) {
        return {
            templateUrl: "directive/detail/xreturn.html",
            link: function(scope, ele, attr) {
                //点击返回原来的页面;
                scope.return = function() {
                    $window.history.back();
                }
            }
        }
    }]);


    //----------------------四 \ -发布帖子页面--------------------
    

})();
