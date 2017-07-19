Vue.component("xswiper", {
    template: `
		<div class="swiper-container">
	<div class="swiper-wrapper">
		<div class="swiper-slide"><img :src="imgs[0]"></div>
		<div class="swiper-slide"><img :src="imgs[1]"></div>
		<div class="swiper-slide"><img :src="imgs[2]"></div>
	</div>
	<!-- Add Pagination -->
	<div class="swiper-pagination"></div>
</div>
	`,
	data:function(){
		return {
			imgs: ["img/swiper/0.jpg", "img/swiper/1.jpg", "img/swiper/2.jpg"]
		}
	},
    mounted: function() {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay:2500
        });
    }
})
