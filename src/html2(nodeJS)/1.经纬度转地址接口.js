function adress(lng,lat){
	// 百度地图API功能
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.331398,39.897445);
	map.centerAndZoom(point,12);
	var geoc = new BMap.Geocoder();    

	map.addEventListener("click", function(e){        
		var pt = h{
			lng: lng,
			lat: lat
		};
		//console.log(pt);=> 为经纬度;
		geoc.getLocation(pt, function(rs){
			var addComp = rs.addressComponents;
			alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);//=>alert为地址名;
		});        
	});	
}

