Vue.component("xfooter",{
	template:`
<div>
	<div class="weui-tab">
		<div class="weui-tab__panel">
		</div>
		<div class="weui-tabbar">
			<a href="#!/index/home" class="weui-tabbar__item" ng-class="{'weui-bar__item_on':tab==0}" ng-click="changeTab(0)">
				<i class="iconfont icon-shouye"></i>
				<p class="weui-tabbar__label">首页</p>
			</a>
			<a href="#!/index/discover" class="weui-tabbar__item" ng-class="{'weui-bar__item_on':tab==1}" ng-click="changeTab(1)">
				<i class="iconfont icon-faxian"></i>
				<p class="weui-tabbar__label">发现</p>
			</a>
			<a class="weui-tabbar__item" ng-class="{'weui-bar__item_on':tab==3}" ng-click="changeTab(3)">
				<i class="iconfont icon-fabu"></i>
				<p class="weui-tabbar__label">发布</p>
			</a>
			<a href="#!/index/login" class="weui-tabbar__item" ng-class="{'weui-bar__item_on':tab==4}" ng-click="changeTab(4)">
				<i class="iconfont icon-wode"></i>
				<p class="weui-tabbar__label">我</p>
			</a>
		</div>
	</div>
</div>
	`
})