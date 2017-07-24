<template>
	<div :class="{'weui-search-bar_focusing':isShowSearchBar}" class="weui-search-bar" id="search_bar">
	<form class="weui-search-bar__form">
		<div class="weui-search-bar__box">
			<i class="weui-icon-search"></i>
			<input v-model="searchTitle" @keyup = "doSearch()" type="search" class="weui-search-bar__input" id="search_input" placeholder="搜索" />
			<a v-focuss="{fn:clearSearchTitle}" href="javascript:" class="weui-icon-clear" id="search_clear"></a>
		</div>
		<label @click="changeSearchBar()" for="search_input" class="weui-search-bar__label" id="search_text">
            <i class="weui-icon-search"></i>
            <span>搜索</span>
        </label>
	</form>
	<a href="javascript:" @click="isShowSearchBar=false" class="weui-search-bar__cancel-btn" id="search_cancel">取消</a>
</div>
</template>
<script>
	export default{
		data: function() {
			return {
				searchTitle: "",
				isShowSearchBar:false,
				arg: "wscats"
			}
		},
		//自定义指令
		directives: {
			//让输入框聚焦的指令
			focuss: {
				bind: function(el, binding, vnode) {
					el.addEventListener("click", function() {
						binding.value.fn();		
						document.getElementById("search_input").focus();
					})
				}
			}

		},
		//自定义方法
		methods: {
			//封装清空输入框的方法
			clearSearchTitle: function() {
				this.searchTitle = "";
			},
			changeSearchBar: function(){
				this.isShowSearchBar = true
			},
			doSearch:function(){ // 上传组件中的数据给state;
				// this.$store.state.search = this.searchTitle	//1)暴力修改状态的方式;
				// this.$store.commit("setSearch",this.searchTitle) // 2)提交修改触发mutations;
				this.$store.dispatch('setSearch',this.searchTitle)//3)提交修改触发action;
			}
		}
	}
</script>
<style scoped>
	/*搜索框样式*/
	.weui-search-bar {
  	  margin-top: 50px;
	}
</style>