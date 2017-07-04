var app3 = angular.module("app3", []);

app3.controller("listCtrl", function($scope) {
    var promise = new Promise(function(resolve, reject) {
        $.ajax({
            type: 'post',
            data: {
                name: "heightzhang"
            },
            url: "http://localhost:8081/",
            async: true,
            success: function(data) {
                resolve(data)

            }
        });

    });

    promise.then(function(data) {
        var html = data.map(function(item) {
            return `
                                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
                                <div class="weui-media-box__hd">
                                    <img class="weui-media-box__thumb" src="http:${item.company_img}" alt="">
                                </div>
                                <div class="weui-media-box__bd">
                                    <h4 class="weui-media-box__title">${item.company}</h4>
                                    <p class="weui-media-box__desc">${item.description}</p>
                                </div>
                                </a>
                                `
        }).join(" ")

        $(".weui-panel__bd").html(html)

    });


    $('.weui-panel__ft').show;

    $('.weui-loadmore').hide();

    //遮罩层;
    $('#zhezhao').hide();

    //点击页面跳转;
    $('a.weui-media-box').on('click', function() {
        var id = $(this).index() + 1;
        location.href = '1.2拉勾网详情页.html?id=' + id;
    });

    //---------------查看更多-----------------------
    var page = 1;
    var num = 7;
    $('.weui-panel__ft .weui-cell__bd').on('click', function() {

        $('.weui-panel__ft').hide();
        $('.doing').show();

        $('#zhezhao').show();

        page++;
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: 'http://localhost:8081/',
                type: 'get',
                data: {
                    page: page,
                    num: num
                },
                succses: function(data) {
                    resolve(data)
                }
            })
        });
        promise.then(function(data) {
            var html = data.map(function(item) {
                return `
                    <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" src="http:${item.company_img}" alt="">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">${item.company}</h4>
                        <p class="weui-media-box__desc">${item.description}</p>
                    </div>
                    </a>
                    `
            }).join(" ");
            $(".weui-panel__bd").append(html);

        });

        // 点击加载更多动画处理;
        $('.weui-panel__ft').show();
        $('.doing').hide();
        //当数据库返回的数字小于7或者为0的时候,暂无数据出现;
        if (data.length < num) {
            $('.weui-panel__ft').hide();
            $('.doing').hide();
            $('.none').show();
        }
        //查看更多后,遮罩层
        $('#zhezhao').hide();

        //查看更多后,仍然点击页面跳转;
        $('a.weui-media-box').on('click', function() {
            var id = $(this).index() + 1;
            location.href = '2.拉勾网详情页.html?id=' + id;
        })
    });
});
