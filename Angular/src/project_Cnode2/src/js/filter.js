;
(function() {
    var filters = angular.module("filters", []);
    filters.filter("htmled", function($sce) {
        return function(input) {
            //input => 需要过滤的数据处理成新的数据
            return $sce.trustAsHtml(input)
        }
    });
    filters.filter("timeGo", function($filter) {
        return function(input) {

            var timed = Date.parse(input)
            var now = Date.now();
            var between = Math.floor((now - timed) / 1000);
            //计算剩余的时间 天 时 分 秒 
            var secLeft = between % 60; // 为了65秒进成5秒;  显示 01分:05秒;
            var minLeft = Math.floor(between / 60) % 60; //为了65分进成5分
            var hourLeft = Math.floor(between / 60 / 60) % 24; //为了25小时进成1小时;
            var day = Math.floor(between / 60 / 60 / 24);

            // 输出结果
            var res = day + '天' + hourLeft + '小时' + minLeft + '分' + secLeft + '秒前';

            //处理结果后输出
            if (day > 30) {
                return "1个月前"
            };
            if (day >= 1 && day < 30) {
                return day + '天前'
            };
            if (day < 1) {
                if (hourLeft < 1) {
                    if (minLeft==0) {
                        return '刚刚'
                    }
                    return minLeft + '分钟前'
                }
                return hourLeft + '小时前'
            };

        }
    })
})();
