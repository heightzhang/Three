<template>
	 <div>
        <div class="weui-panel weui-panel_access">
            <div class="weui-panel__hd" @click="langmore()">主题帖</div>
                <div class="weui-panel__bd">
                <a class="weui-media-box weui-media-box_appmsg" v-for ="n in news">
                <xcontentheader :imgUrl="n.author.avatar_url"></xcontentheader> 
                <div class="weui-media-box__bd" :imgUrl ="n.author_id">
                    <h4 class="weui-media-box__title">{{n.title}}</h4>
                    <p class="weui-media-box__desc">
                        <span class="auto">作者:{{n.author.loginname}}</span>
                        <time>{{n.create_at}}</time>
                    </p>
                </div>
                </a>
            </div>
        </div>
        
        <div class="weui-panel__ft">
            <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
                <div class="weui-cell__bd" @click="langmore()">查看更多</div>
                 <span class="weui-cell__ft"></span>
             </a>
        </div>

    </div>
</template>
<script>
	export	default{
		components: {
	        xcontentheader: {
	            props: ["imgUrl"],
	            template: `
	            <div class="weui-media-box__hd"  >
	                <img class="weui-media-box__thumb" :src="imgUrl"@click = "setImg(imgUrl)">
	            </div>
	            `,
	            methods:{
	                setImg(imgUrl){
	                   this.$store.dispatch('setImg',[imgUrl,true])
	                 }
	            }
	        }
	    },
	    methods: {
	        langmore: function() {
					this.$store.dispatch("setNews")
	        }
	    },
	    computed:{
	    	news() {
				return this.$store.state.news
			}
	    },
	    mounted:function() {
	        this.langmore();
	    }
	}
</script>
<style>
	/*xlist*/

.weui-panel__ft {
    margin-bottom: 50px;
}

time {
    position: absolute;
    right: 0;
}

.weui-loadmore {
    margin-bottom: 80px;
}

</style>