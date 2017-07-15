;
(function(){
	var services = angular.module("services",[]);
	services.service("tool",function(){
		return{
			abc:function(a,b){
				return a+b
			}
		}
		
	});
})();