// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//配置elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false


//resource 配置
import VueResource from 'vue-resource'
Vue.use(VueResource);

Vue.use(ElementUI);


/******************拦截器设置请参考这部分(开始)******************/
Vue.http.interceptors.push((request, next)  =>{
  //登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
  let TOKEN=localStorage.getItem('fsbToken');
  if(TOKEN){
    //如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN,后台根据headers中的TOKEN判断是否放行
    request.headers.set('fsbToken',TOKEN);
  }
  next((response) => {
    return response;
  });
});
/******************拦截器设置请参考这部分(结束)******************/



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
