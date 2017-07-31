#VUE概述

*目录*

[TOC]

#生命周期
```JS
<script>
    new Vue({
        el:"#demo",
        data:{
            name:"Hello"
        },
        template:`
            <div>
                <p>{{name}}</p>
                <input v-model="name" />
            </div>
        `,
        beforeCreate:function(){
            console.log("创建之前")
            console.log(this.$el)//undefined
            console.log(this.$data)//undefined
        },
        // created 读取数据
        created:function(){
            console.log("创建之后")
            console.log(this.$el)//undefined
            console.log(this.$data)//有
        },
        //beforeCompile  
        beforeMount:function(){
            console.log("挂载之前")
            console.log(this.$el)//有
            console.log(this.$data)//有
            console.log(document.querySelector("#demo"))//只有节点,无数据
        },
        //ready
        mounted:function(){
            console.log("挂载之后")
            console.log(this.$el)//有
            console.log(this.$data)//有
        },
        beforeUpdate:function(){
            console.log("更新之前")
            console.log(this.$el)//有
            console.log(this.$data)//有
            console.log(document.querySelector("body"))
        },
        updated:function(){
            console.log("更新之后")
            console.log(this.$el)//有
            console.log(this.$data)//有
            console.log(document.querySelector("body"))
        }
    })
</script>
```


#指令
##内置指令
```HTML
    <!--1.v-text/ng-bind  -->
    <p v-text="name"></p>

    <!-- 2.v-html/ng-bind-html -->
    <p v-html="html"></p>

    <!-- 3.v-if/ng-if -->
    <p v-if="bool">v-if 真</p>

    <!-- 4.v-else !bool / ng-hide -->
    <p v-else>v-else 假</p>

    <!-- 5.v-show/ng-show -->
    <p v-show="bool">v-show 真</p>

    <!-- 6.v-for/ng-repeat -->
    <ul>
        <li v-for="a in arr" track-by="$index" id="{{$index}}">{{a}}</li>
    </ul>

    <!-- 7.v-on:click/ng-click -->
    <button v-on:click="ok()">ok1</button>
    <button @click="ok()">ok2(简写)</button>

    <!-- 8.v-bind:class && v-bind:style /ng-class&&ng-style -->
    <p v-bind:class="{blue:bool}">class类名1</p>
    <p :class="{blue:bool}">class类名2(简写)</p>

    <!-- 9.v-model -->
    <input type="range" v-model="size" />
    <p v-bind:style="{fontSize:size + 'px'}">字体大小</p>
    <p :style="{fontSize:size + 'px'}">字体大小2(简写)</p>

    <!-- 10 给id起名字,注意:1)'name'是字符串,name是变量; 2): 冒号可以省略{{}}(表达式) -->
    <p :id="'name'+name" class="yellow">属性值</p>

```
##自定义指令
```JS
// 指令的简单写法 vue 2.0 // 这里将会被 `bind` 和 `update` 调用
Vue.directive('color', function(ele, attr) {
    //1.获取指令中的属性值;
    ele.style.color = attr.expression
    console.log(attr)

    //2.获取非标准属性的属性值;
    var skill = ele.getAttribute("skill")
    console.log(skill);
});
```


#过滤器
##内置过滤器
- **VUE1.0版本**
```HTML
<div id="demo">
        <p style="color: red;">1.currency</p>
        <p>{{num|currency "￥" 5}}</p>
        <p style="color: red;">2.lowercase</p>
        <p>{{name|lowercase}}</p>
        <p style="color: red;">3.uppercase</p>
        <p>{{name|uppercase}}</p>
        <p style="color: red;">4.pluralize(复数) 特有</p>
        <p>{{date}}{{date|pluralize 'st' 'nd' 'rd' 'th'}}</p>
        <p style="color: red;">5.json</p>
        <p>{{obj|json 10}}</p>
        <p style="color: red;">6.debounce(延迟器) 特有</p>
        <button @click="ok()|debounce 2000">ok</button>
        <p style="color: red;">7.capitalize(首字母大写) 特有</p>
        <p>{{name|capitalize}}</p>
        <p style="color: red;">8.orderBy</p>
        <ul>
            <li v-for="arr in arrs|orderBy 'age' -1">{{arr.name}} {{arr.age}}</li>
        </ul>
        <p style="color: red;">9.filterBy</p>
        <input v-model="search" />
        <ul>
            <li v-for="arr in arrs|filterBy search in 'name'">{{arr.name}} {{arr.age}}</li>
        </ul>
        <p style="color: red;">9.limitBy</p>
        <input v-model="search" />
        <ul>
            <li v-for="arr in arrs|limitBy 2 1">{{arr.name}} {{arr.age}}</li>
        </ul>
        <p>{{name|limitBy 2 2}}</p>
    </div>
```
- **VUE2.0版本(无内置过滤器)**

##自定义过滤器
```JS
<script>
        Vue.filter("ed",function(input){
            return input + "ed";
        });
        new Vue({
            el:"#demo",
            template:`
            <p>{{name|ed}}</p>
            `,
            data:{
                name:"heightzhang"
            }
        })
</script>
```

#组件
##DEMO 完整的组件模版(prop,filters,directives,components)
```JS
Vue.component('xheader', {
            props:["message"], //主组件向子组件传递数据; 
            template: `
                <div style="border:1px solid green">
                    <p v-color="'red'">{{name|ed}}</p>
                    <button @click="ok()">ok</button>
                    <p v-if="message=='1'">1</p>
                </div>
            `,
            data: function() { 注意://组件中的data 必须是一个函数;
                return {
                    name: "第一个组件"
                }
            },
            methods: {  //组件中的方法;
                ok: function() {
                    console.log("ok")
                }
            }, 
            filters: { //组件中的过滤器
                ed: function(input) {
                    return input + "ed";
                }
            },
            directives: { //组件中的的指令
                color: function(el, binding, vnode) {
                    console.log(el)
                    el.style.color = binding.value
                }
            },
            mounted:function(){ //组件中的JS逻辑
                console.log(this.message)  //桥梁props ,接收message;
            },
            components: { 组件中的嵌套;
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
        })
```

#通信
##父组件向子组件(props)
```JS
<script>
//----------子组件
        Vue.component('xheader', {
            props: ["message"], //接收父组件的非标准属性
            template: `
                <div style="border:1px solid green">
                    <p>{{message}}</p>  //打印出来 =>变量name =>laoyao 
                </div>
            `,
            data: function() {
                return {
                    name: "第一个组件"
                }
            }
        })
//---------父组件-----------
        new Vue({
            el: "#demo",
            data: {
                name: "laoyao"
            },
            computed: {
                named: function() {
                    this.ok()
                    return this.name + "ed"
                }
            },
            template: `
                <div>
                    <input v-model="name" />
                    <xheader :message="name"></xheader> //父组件的非标准属性(传递变量name)
                    <p>{{named}}</p>
                </div>
            `,
            methods: {
                ok: function() {
                    console.log("ok")
                }
            }
        })
    </script>
```
##子组件向父组件 / 兄弟组件之间
###VUEX
**DEMO(子组件xlist向xgallery传递数据)**<br><br>
**index中心**
```JS
<script>
// 新建一个状态管理:
var store = new Vuex.Store({
    state:{  //全局数据的集中栈
        imgUrl:null,
        isShowGallery:null,
    },
    getters:{   //处理state中的数据 类似过滤器的作用;
        getImgurl(state){
            return state.imgUrl
        },
        getBool(state){
            return state.isShowGallery
        }

    },
    //分发状态 改变state.imgUrl原先的值
    mutations:{
        setImg:function(state,data){
            state.imgUrl = data[0];
            state.isShowGallery=data[1];
        }
    },
    //action触发
    actions:{
        setImg(context,data){
            context.commit("setImg",data)
        }
    }
});

var vue = new Vue({
    el: "#demo",
    template: `
        <div>
            <xlist></xlist>
            <xgallery></xgallery>
        </div>
        `,
        store//第一步将Soter注入构造器中;  这个一定要写
})
</script>
```
**上传数据部分**
```JS
<xlist>
    methods:{
        setImg(imgUrl){
           this.$store.dispatch('setImg',[imgUrl,true])
         }
    }
</xlist>
```
**接收数据部分**
```JS
<xgallery>
    computed:{
            isShowGallery(){
                return this.$store.getters.getBool
            },
            imgUrl(){
                return this.$store.getters.getImgurl
            }
    }
 //  数据显示 => {{imgUrl}}  / {{isShowGallery}}
</xgallery>
```

#路由
##标准写法
```JS
<script>
        //1.1定义但是没注册
        var page1 = {
            template: `
                <div>第一页</div>
            `
        }

        var page2 = {
            template: `
                <div>第二页</div>
            `
        }
        //1.2注册;
        var router = new VueRouter({
            routes: [{
                    path: '/index',
                    component: page1
                }, {
                    path: '/home',
                    component: page2
                },
                { 
                    path: '/', redirect: 'index'   //2重定向
                }]  
        })
        new Vue({
            el:"#app",
            router,// （缩写）相当于 routes: routes
            template:`
                <router-view></router-view>
            `
        })
        //3.路由传参数;
    </script>
```
##嵌套路由(三层)
```JS
<script>
    var router = new VueRouter({
        routes: [{
                path: '/index',
                component: {
                    template: `
                        <div>
                            这是index的页面
                            <a href="#/index/a">a</a>
                            <a href="#/index/b">b</a>
                            <router-view></router-view>
                        </div>
                    `
                },
                children: [{
                    //子路由没有/
                    path: 'a',
                    component: {
                        template: `
                            <div>
                                <p>a</p>
                                <a href="#/index/a/aa">aa</a>
                                <a href="#/index/a/bb">bb</a>
                                <router-view></router-view>
                            </div>
                        `
                    },
                    children: [{
                        path: 'aa',
                        component: {
                            template: "<p>aa</p>"
                        }
                    }, {
                        path: 'bb',
                        component: {
                            template: "<p>bb</p>"
                        }
                    }]
                }, {
                    //子路由没有/
                    path: 'b',
                    component: {
                        template: "<p>b</p>"
                    }
                }]
            }, {
                path: '/detail',
                component: {
                    template: `
                        <div>
                            这是detail的页面
                        </div>
                    `
                }
            }, {
                path: '/',
                redirect: '/index'
            }]
            // （缩写）相当于 routes: routes
        });
        new Vue({
        el: "#demo",
        template: `
            <div>
                <a href="#/index">index</a>
                <a href="#/detail">detail</a>
                <router-view></router-view>
            </div>
        `,
        router,
        mounted() {
            console.log(this)
        }
    })
</script>
```
#补充:
##定义全局属性与方法
```JS
/*
    // 一个页面用一个构造器即可;不建议用多个构造器;  
    //可以将构造器理解为一个组件;组件最大;  组件与组件之间的通信 ; 
     var(全局属性) => angular中的$rootScope
     var  test(全局方法) => angular中的server;
*/
    var exchange = 1;
    var test = function(log){
        console.log(log)
    }
    //构造器 组件的一种呈现
    new Vue({
        //element节点 querySelector
        el:"#demo",
        //HTML CSS
        template:`
        <div>
            <p>{{name}} {{exchange}}</p>
            <button @click="test('abc')">Ok</button>
        </div>`,
        //需要绑定的数据 $scope
        data:{
            name:"Hello",
            exchange
        },
        methods:{
            test
        }
    })
```

##如何获取$index索引值?
**DEMO**
```HTML
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <div id="demo">
            <p v-for="(arr,index) in arrs" track-by="$index" :id="index">{{arr}}</p>
        </div>
    </body>
    <script src="../js/vue2.js"></script>
    <script>
        //构造器
        new Vue({
            //element节点 querySelector
            el:"#demo",
            //需要绑定的数据 $scope
            data:{
                name:"Hello World",
                arrs:["a","b","c","a","d"]
            }
        })
    </script>
</html>
```
##表单控件
**DEMO**
```HTML
<html>

<head>
    <meta charset="UTF-8">
    <title></title>
</head>

<body>
    <!-- 双向数据绑定而已; -->
    <div id="demo">
        <p style="color: red;">Radio</p>
        A:
        <input type="radio" value="A" v-model="radio" /> B:
        <input type="radio" value="B" v-model="radio" /> C:
        <input type="radio" value="C" v-model="radio" />
        <p>{{radio}}</p>
        <p style="color: red;">CheckBox</p>
        A:
        <input type="checkbox" value="A" v-model="checkbox" /> B:
        <input type="checkbox" value="B" v-model="checkbox" /> C:
        <input type="checkbox" value="C" v-model="checkbox" />
        <p>{{checkbox}}</p>
    </div>
</body>
<script src="../js/vue.js"></script>
<script>
//构造器
new Vue({
    //element节点 querySelector
    el: "#demo",
    //需要绑定的数据 $scope
    data: {
        radio: "B",
        name: "Hello World",
        checkbox: ["A", "C"]
    }
})
</script>

</html>
```
##render(高级玩法:可用来替换remplate)
```JS
<script>
new Vue({
    el: "#demo",
    data: {
        name: "laoyao"
    },
    //template: "<div>{{name}}</div>",
    render: function(createElement) {
        return createElement(
            //标签
            'div', // tag name 标签名称
            {
                attrs: {
                    id: 'foo'
                },
            }, // 子组件中的阵列
            [createElement(
                'p',
                {
                    style:{
                        color: 'red',
                    }
                }
            ),["Hello"]]
        )
    },
})
</script>
```
##过渡效果
内置的组件transition<br>
[参考： 过渡：进入，离开和列表](https://cn.vuejs.org/v2/guide/transitions.html)