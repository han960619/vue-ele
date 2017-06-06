<template>
   <div class="cartcontrol">
     <transition name="move">
   	  <div class="cart-descrease" v-show="food.count>0"  @click.stop.prevent="descreaseCart">
   	  </div>
     </transition>
   	  <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
   	  <div class="cart-add" @click.stop.prevent="addCart">
   	  </div>
   </div>
</template>

<script>
 import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      //修改数据goods=>foods=>food的count，映射到原始数据中
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) { //如果没有count属性，则设置为1
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('add', event.target);
        this.$emit('event', event.target);
      },
      descreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

为了增大点击区域，可以加个padding
<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size: 0
  .cart-descrease,.cart-add
    display: inline-block
    width: 24px
    height: 24px
    background-size: cover
  .cart-descrease
    background-image: url(remove.svg)
    &.move-enter-active, &.move-leave-active
      transition: all .2s
      // opacity: 1
      // transform: translate3D(0,0,0) rotate(0)
    &.move-enter,&.move-leave-active
      opacity: 0
      transform: translate3D(24px,0,0) rotate(360deg)
  .cart-count
    display: inline-block
    font-size: 10px
    vertical-align: top
    line-height: 24px
    width: 12px
    padding: 0 6px
    text-align: center
    color: rgb(147,153,159)
  .cart-add
    background-image: url(add.svg);
</style>
