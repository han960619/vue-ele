// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import App from './App';
import axios from 'axios';
import VueRouter from 'Vue-Router';
import goods from './components/goods/goods';
import seller from './components/seller/seller';
import ratings from './components/ratings/ratings';

Vue.use(VueRouter);
// 时候如果在其它的组件中，是无法使用 axios 命令的。
// 但如果将 axios 改写为 Vue 的原型属性，就能解决这个问题
Vue.prototype.$http = axios;

const routes = [
  {path: '/goods', component: goods},
  {path: '/seller', component: seller},
  {path: '/ratings', component: ratings}
];

const router = new VueRouter({
	routes: routes,
	// 修改路由link 被点击后添加的类名  默认为 router-link-active
	// 便于自己编写样式。
	linkActiveClass: 'active'
});
// push 导航 即进入时自动指向该路由
router.push({ path: '/goods' });
/* eslint-disable no-new */
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
