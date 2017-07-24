<template>
	<div>
		<xheader></xheader>
		<xsearch></xsearch>
		<xswiper></xswiper>
		<xlist></xlist>
		<xfooter></xfooter>
	</div>
</template>

<script>
	//引入组件
	import xheader from "../xheader.vue";
	import xsearch from "../xsearch.vue";
	import xswiper from "../xswiper.vue";
	import xlist from "../xlist.vue"
	import xfooter from "../xfooter.vue"
	//注册组件
	export default {
		components: {
			xheader,
			xsearch,
			xswiper,
			xlist,
			xfooter
		}
	}
</script>

