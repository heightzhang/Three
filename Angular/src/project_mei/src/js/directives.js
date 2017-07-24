(function() {
    var directives = angular.module("directives", []);
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
                scope.imgs = ["img/swiper/1.jpg", "img/swiper/1.jpg"];
            }
        }

    }]);
    //xlist
    directives.directive("xlist", [function() {
        return {
            templateUrl: "directive/xlist.html"
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
                scope.del =function(){
                	console.log(666)
                	scope.isShowGallery = false;
                }
            }
        }
    }]);

    //脚本组件
    directives.directive("xfooter", [function() {
        return {
            templateUrl: "directive/xfooter.html",
            //高亮切换
            link: function(scope, ele, attr) {
                scope.tab = 0;
                scope.changeTab = function(tab) {
                    scope.tab = tab;
                };
            }
        }
    }]);

})();
