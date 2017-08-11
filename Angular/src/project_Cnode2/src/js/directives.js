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
    directives.directive("xfooter", ["$rootScope", "$window", function($rootScope, $window) {
        return {
            replace: true,
            templateUrl: "directive/xfooter.html",
            //高亮切换
            link: function(scope, ele, attr) {
                //存储之前的高亮;
                $rootScope.tab ? $rootScope.tab : $rootScope.tab = 0;
                scope.changeTab = function(tab) {
                    $rootScope.tab = tab;

                    //发布页面的选择性跳转
                    if (tab === 3) {
                        scope.storage = $window.localStorage.getItem('accesstoken')
                        if (scope.storage) {
                            $window.location.href = "indexTest.html#!/create"
                        } else {
                            $window.location.href = "indexTest.html#!/index/login";
                        }
                    }
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
    directives.directive('xdetail', ['$state', '$http', '$location', function($state, $http, $location) {
        return {
            templateUrl: "directive/xdetail.html",
            link: function(scope, ele, attr) {
                scope.id = $state.params.id
                scope.init = function(){
                    $http({
                            method: "get",
                            url: "https://cnodejs.org/api/v1/topic/" + scope.id
                        }).then(function(data) {
                            scope.detail = data.data.data;
                            scope.html = scope.detail.content;
                            //主题收藏
                            scope.top = scope.detail.tab
                            //初始化评论信息列表
                            scope.reply = data.data.data.replies
                        }) 
                }
                scope.init();
                    //默认红心状态;
                $http({
                    method: 'post',
                    url: 'https://cnodejs.org/api/v1/topic_collect/collect',
                    data: {
                        accesstoken: store.getState().accesstoken,
                        topic_id: $location.$$url.split('/')[2]
                    },
                    headers: {
                        'Content-Type': "application/json;charset=UTF-8"
                    }
                }).then(function(data) {
                    console.log(data.data.success)
                    if (data.data.success) {
                        scope.state = false
                    } else {
                        scope.state = true
                    }
                }, function(err) {
                    console.log(err.data.error_msg) //打印错误信息

                });

                //更改收藏红心选中的状态 -----------------
                scope.change = function() {
                    if (scope.state) {
                        scope.state = false
                        $http({
                            method: 'post',
                            url: 'https://cnodejs.org/api/v1/topic_collect/de_collect',
                            data: {
                                accesstoken: store.getState().accesstoken,
                                topic_id: $location.$$url.split('/')[2]
                            },
                            headers: {
                                'Content-Type': "application/json;charset=UTF-8"
                            }
                        }).then(function(data) {
                            console.log(data.data)
                        }, function(err) {
                            console.log(err.data.error_msg) //打印错误信息

                        });

                    } else {
                        scope.state = true
                        console.log(store.getState().accesstoken)
                        $http({
                            method: 'post',
                            url: 'https://cnodejs.org/api/v1/topic_collect/collect',
                            data: {
                                accesstoken: store.getState().accesstoken,
                                topic_id: $location.$$url.split('/')[2]
                            },
                            headers: {
                                'Content-Type': "application/json;charset=UTF-8"
                            }
                        }).then(function(data) {
                            console.log(data.data)
                        }, function(err) {
                            console.log(err.data.error_msg) //打印错误信息

                        });

                    }

                }

                //新增评论功能;
                scope.value = '说点什么吧'
                scope.comment = function() {
                    let topic_id = $location.$$url.split('/')[2];

                    $http({
                        method: 'post',
                        url: 'https://cnodejs.org/api/v1/topic/'+topic_id+'/replies',
                        data: {
                            accesstoken: store.getState().accesstoken,
                            content:scope.value
                        },
                        headers: {
                            'Content-Type': "application/json;charset=UTF-8"
                        }
                    }).then(function(data) {
                            scope.init();
                    }, function(err) {
                        console.log(err.data.error_msg) //打印错误信息

                    });
                }

                //评论的字体长度设置;
                scope.length = 0;
                scope.len =function(value){
                    scope.length = value.length
                }

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
    directives.directive('xcreate', ['$http', function($http) {
        return {
            templateUrl: "directive/create/xcreate.html",
            link: function(scope, ele, attr) {
                scope.ak = "ca91d715-2577-4253-885b-4665939c47c5";

                scope.publish = function() {
                    $http({
                        method: 'post',
                        url: 'https://cnodejs.org/api/v1/topics ',
                        data: {
                            accesstoken: scope.ak,
                            title: scope.title,
                            tab: 'dev',
                            content: scope.content
                        },
                        headers: {
                            'Content-Type': "application/json;charset=UTF-8"
                        }
                    }).then(function(data) {
                        console.log('成功')
                        alert('成功')
                    }, function(err) {
                        console.log(err.data.error_msg) //打印错误信息
                        alert(err.data.error_msg)
                    });
                }
            }
        }
    }]);

    //---------------------五 注册登录页面---------------------------
    directives.directive("xlogin", ["$window", "$http", "$rootScope", function($window, $http, $rootScope) {
        return {
            templateUrl: "directive/login/xlogin.html",
            link: function(scope, ele, arrt) {
                //初始化 默认用户名
                scope.msg = "ca91d715-2577-4253-885b-4665939c47c5"
                scope.cha_show = true;
                //初始化高亮
                $rootScope.tab = 4

                //input值改变的时候触发
                angular.element(document.querySelector("#AccessToken")).on('input', function() {
                    if (scope.msg) { //true执行下面的事件
                        scope.cha_show = true;
                    } else {
                        scope.cha_show = false;
                    }
                    scope.$apply();
                });

                scope.empty = function() {
                    scope.msg = '';
                    scope.cha_show = false;
                };

                //跳转页面
                scope.tiao = function(params) {
                    if (params === 1) {
                        $rootScope.tab = 0
                        $window.location.href = "indexTest.html#!/index/home"
                    } else {
                        $http({
                            method: 'POST',
                            url: 'https://cnodejs.org/api/v1/accesstoken',
                            data: {
                                accesstoken: scope.msg
                            },
                            headers: {
                                'Content-Type': "application/json;charset=UTF-8"
                            }
                        }).then(function(data) {
                            console.log(data.data)
                                //存储验证通过后获得的信息;
                            $window.localStorage.setItem("accesstoken", JSON.stringify([data.data]));
                            //跳转用户详情页面 || 重新登录(登录出错)
                            if (data.data.success) {
                                $window.location.href = "indexTest.html#!/index/mine"
                            } else {
                                alert("登录出错")
                            };
                        }, function(err) {
                            alert("登录出错")
                            console.log(err) //打印错误信息
                        });
                    }
                };

                //如果有用户名 默认跳转用户页面;
                scope.storage = $window.localStorage.getItem('accesstoken')
                if (scope.storage) {
                    $window.location.href = "indexTest.html#!/index/mine"
                };

            }
        }
    }]);
    //--------------------六 /  用户信息页面 ---------------------------------
    directives.directive("xmine", ["$window", "$http", "$rootScope", function($window, $http, $rootScope) {
        return {
            templateUrl: "directive/mine/xmine.html",
            link: function(scope, ele, attr) {
                //初始化高亮;
                $rootScope.show = 0;
                scope.storage = $window.localStorage.getItem('accesstoken');
                scope.loginname = JSON.parse(scope.storage)[0].loginname;
                //初始化用户信息页面;
                $http({
                    method: "GET",
                    url: "https://cnodejs.org/api/v1/user/" + scope.loginname
                }).then(function(data) {
                    scope.data = data.data.data;
                    scope.img = scope.data.avatar_url;
                    scope.loginname = scope.data.loginname;
                    scope.email = scope.data.githubUsername + "@github.com"
                    scope.create_time = scope.data.create_at;
                    scope.score = scope.data.score;
                    //列表样式 xmine-list; 最近回复
                    scope.replay = data.data.data.recent_replies
                }, function(err) {
                    console.log(err);
                });
                scope.info = function(id) {
                    scope.id = id
                    $window.location.href = "#!/detail/" + scope.id
                }
            }
        }
    }]);

    directives.directive("xminelist", ["$rootScope", "$window", "$http", function($rootScope, $window, $http) {
        return {
            templateUrl: "directive/mine/xmine_list.html",
            link: function(scope, ele, attr) {
                //获取login_name
                scope.storage = $window.localStorage.getItem('accesstoken');
                scope.loginname = JSON.parse(scope.storage)[0].loginname;

                // 注销事件
                scope.logout = function() {
                    $window.localStorage.removeItem('accesstoken');
                    $window.location.href = "#!/index/login"
                };

                // tab标签切换
                scope.tab = function(page) {
                    $rootScope.show = page;

                    //话题收藏;
                    if ($rootScope.show === 2) {
                        $http({
                            method: "GET",
                            url: "https://cnodejs.org/api/v1/topic_collect/" + scope.loginname
                        }).then(function(data) {
                            scope.data = data.data.data
                            scope.info = function(id) {
                                $window.location.href = "#!/detail/" + id
                            }
                            console.log(scope.data)
                        }, function(err) {
                            console.log(err);
                        });
                    }
                    //最新发布
                    if ($rootScope.show === 1) {
                        $http({
                            method: "GET",
                            url: "https://cnodejs.org/api/v1/user/" + scope.loginname
                        }).then(function(data) {
                            scope.publish = data.data.data.recent_topics
                        }, function(err) {
                            console.log(err);
                        });
                    }
                };

            }
        }
    }]);

})();
