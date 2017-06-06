<template>
  <div id="app">
   <!-- v.bind 来传递seller数据给header.vue 缩写为： header.vue中需要通过props属性来获取-->
   <v-header :seller="seller"></v-header>
   <div class="tab">
     <div class="tab-item">
       <router-link to="/goods">商品</router-link>
     </div>
     <div class="tab-item">
       <router-link to="/ratings">评论</router-link>
     </div>
     <div class="tab-item">
       <router-link to="/seller">商家</router-link>
     </div>
   </div>

   <!-- router-view   当改变了路由 会刷新这部分的内容 -->
   <router-view :seller="seller"></router-view>    
  </div>
</template>

<script>
 import header from './components/header/header.vue';

 export default {
  data () {
    return {
      seller: {}
    };
  },
  created () {
    this.$http.get('api/seller').then((res) => {
            res = res.data;
            this.seller = res.data;
            console.log(this.seller.avatar);
          });
  },
  components: {
   'v-header': header
  }
 };
</script>

<style lang="stylus" rel="stylesheet/stylus">
/*在写样式的时候，最好把影响布局的样式写在前面，接着写一些宽高等不可被重绘的，接着继续写其它*/
@import "../static/common/stylus/mixin"
@import "../static/common/stylus/base"
 #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(#f2f2f2)
      .tab-item
         flex: 1
         text-align: center
         & > a
            display: block
            font-size: 14px
            color: rgb(77,85,93)
            &.active
              color: rgb(240,20,20)

</style>
