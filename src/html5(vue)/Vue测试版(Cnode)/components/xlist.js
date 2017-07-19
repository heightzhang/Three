Vue.component("xlist", {
    template: `
	<div>
		<div class="weui-panel weui-panel_access">
			<div class="weui-panel__hd" @click="langmore()">主题帖</div>
				<div class="weui-panel__bd">
		   		<a class="weui-media-box weui-media-box_appmsg" v-for ="n in news">
		        <div class="weui-media-box__hd">
		            <img class="weui-media-box__thumb" :src="n.author.avatar_url" alt="">
		        </div>
		        <div class="weui-media-box__bd" :id ="n.author_id">
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
	`,
    methods: {
        langmore: function() {
            //ES6写法;
            this.$http.get("https://cnodejs.org/api/v1//topics", {
                params: {
                    tab: "ask",
                    limit: 10
                }
            }).then((data) => {
                this.news = this.news.concat(data.body.data)
                console.log(this.news)
            }, (err) => {
                console.log(err)
            });
        }
    },
    mounted: function() {
    	this.langmore();

    },
    data: function() {
        return {
            news: []
        }
    }
})
