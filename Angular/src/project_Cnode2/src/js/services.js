;
(function() {
    var services = angular.module("services", []);
    services.service("tool", function() {
        return {
            abc: function(a, b) {
                return a + b
            }
        }
    });
 /*   services.service('store', function() {
        return {
            store: function() {
                //redux状态管理
                var store = Redux.createStore(function(state, action) {
                    var state = {
                        accesstoken: "ca91d715-2577-4253-885b-4665939c47c5"
                    }
                })
                return store
            }
        }
    })*/
})();
