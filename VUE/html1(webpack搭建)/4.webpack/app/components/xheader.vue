<template>
	<div>
		<header>
			{{title}}
		</header>
	</div>
</template>
<script>
	export default {
		computed:{
			title(){
				//暴力获取状态
				return this.$store.state.title
			}
		}
	}
</script>

<!-- 封闭样式 -->
<style scoped> 
	header {
	    background-color: green;
	    color: #fff;
	    height: 50px;
	    line-height: 50px;
	    text-align: center;
	    position: fixed;
	    width: 100%;
	    top: 0;
	    left: 0;
	    z-index: 10;
	}
</style>