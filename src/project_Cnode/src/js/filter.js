;
(function() {
    var filters = angular.module("filters", []);
    filters.filter("htmled", function($sce) {
        return function(input) {
            //input => 需要过滤的数据处理成新的数据
            return $sce.trustAsHtml(input)
        }
    })
})();
