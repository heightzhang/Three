Vue.component("xgallery",{
	template:`
	<div>
		<div class="weui-gallery" v-show="isShowGallery">
			<span class="weui-gallery__img" :style="{backgroundImage: 'url('+imgUrl+')'}"></span>
			<div class="weui-gallery__opr">
			    <a href="javascript:" class="weui-gallery__del" >
					返回
				</a>
			</div>
		</div>
	</div>
	`,
	computed:{
		isShowGallery(){
			return this.$store.state.isShowGallery
		},
		imgUrl(){
			return this.$store.getters.getImgurl
		}
	}
})