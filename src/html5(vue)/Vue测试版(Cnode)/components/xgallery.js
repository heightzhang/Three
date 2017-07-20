Vue.component("xgallery",{
	template:`
	<div>
		<div class="weui-gallery" v-show="isShowGallery" :class="{'weui-gallery2':bool===true}">
			<span class="weui-gallery__img" :style="{backgroundImage: 'url('+imgUrl+')'}"></span>
			<div class="weui-gallery__opr" @click=tui()>
			    <a href="javascript:" class="weui-gallery__del" >
					返回
				</a>
			</div>
		</div>
	</div>
	`,
	data:function(){
		return{
			bool:false
		}
	},
	computed:{
		isShowGallery(){
			return this.$store.getters.getBool
		},
		imgUrl(){
			return this.$store.getters.getImgurl
		}
	},
	methods:{
		animation:function(){
			this.bool =true
			
		},
		tui:function(){
			// this.bool =true //动画效果的实现;?bug;
			this.$store.state.isShowGallery = false
		}
	}
})