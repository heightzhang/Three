//测试
console.log("abc")
//----------------引入UI框架-----------------------
import "weui";
//引入字体图标
import './static/iconfont.css'

//--------------引入JS文件部分--------
// --引入Vue
import Vue from "vue";
//引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//引入VUEX
import Vuex from 'vuex';
Vue.use(Vuex);

//引入封装转换后的swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

//引入axios请求
import axios from "axios";
Vue.prototype.$ajax = axios;

//---------------new VUE 构造器的设置;
//1引入主路由页面;
import home from "./components/routers/home.vue";

var router = new VueRouter({
    routes: [{
        path: '/index',
        component: home
    }, {
        path: '/detail',
        component: {
            template: `
							<div>
								详情页
							</div>
						`
        }
    }, {
        path: '/',
        redirect: '/index'
    }]
});
//2新建一个状态管理
var store = new Vuex.Store({
    state: { //全局数据的集中栈
        search: '',
        imgUrl: null,
        isShowGallery: null,
        title: "Cnode",
        news: []
    },
    getters: {
        getSearch(state) {
            //处理数据 类似过滤器的作用;
            return state.search
        },
        getImgurl(state) {
            return state.imgUrl
        },
        getBool(state) {
            return state.isShowGallery
        }

    },
    //分发状态 接收改变后的值 后 赋值给state.search;
    mutations: {
        setSearch: function(state, data) {
            state.search = data
        },
        setTitle: function(state, data) {
            state.title = data
            console.log(data)
        },
        setImg: function(state, data) {
            state.imgUrl = data[0];
            state.isShowGallery = data[1];
        },
        setNews: function(state, data) {
            axios.get('https://cnodejs.org/api/v1//topics', {
                    params: {
                        tab: "ask",
                        limit: 10
                    }
                })
                .then(function(response) {
                    state.news = state.news.concat(response.data.data)
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

    },
    //action触发
    actions: {
        setSearch(context, data) {
            context.commit('setSearch', data);
            context.commit('setTitle', data)
        },
        setImg(context, data) {
            context.commit("setImg", data)
        },
        setNews(context, data) {
            context.commit('setNews')
        }
    }
});
//最后一步 实例化构造器
new Vue({
    el: "#demo",
    template: `<router-view></router-view>`,
    router,
    store
});
