<template>
	<swiper :options="swiperOption" ref="mySwiper">
		<!-- slides  v-fot(打包需要主键）  -->  
		<swiper-slide v-for="i in imgs" :key="i.id"><img :src="i.src" /></swiper-slide>
		<!-- Optional controls -->
		<div class="swiper-pagination" slot="pagination"></div>
	</swiper>
</template>
<script>
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'
	export default {
		data() {
			return {
				imgs: [{
					id: 1,
					src: require("../img/2.jpg")
				}, {
					id: 2,
					src: require("../img/2.jpg")
				}],
				swiperOption: {
					autoplay: 3000
				}
			}
		}
	}
</script>
<style scoped>
	
/*swiper*/

.swiper-container {
    width: 100%;
    height: 200px;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}

.swiper-slide img {
    width: 100%;
    height: 100%;
}

</style>