<template>
   <transition name="move">
	<div v-show="showFlag" class="food" ref="food">
	  <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide"></div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>	
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">
              加入购物车
            </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
        	<h1 class="title">商品评价</h1>
        </div>
      </div>  
	</div>
   </transition>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import split from '../../components/split/split'
import ratingselect from '../../components/ratingselect/ratingselect'
export default {
   props: {
   	  food: {
   	  	type: Object
   	  }
   },
   components: {
   	  cartcontrol,
   	  split,
   	  ratingselect
   },
   data () {
      return {
      	showFlag : false
      }
   },
   methods :{
   	 show() {
   	 	this.showFlag = true;
   	 	this.$nextTick(() => {
   	 	   if(!this.scroll){
   	 	   	  this.scroll = new BScroll(this.$refs.food, {
   	 	   	  	click: true
              })
            } else {
              this.scroll.refresh();
            }
    	})  
   	 },
   	 hide() {
   	 	this.showFlag = false;
   	 },
   	 addFirst (event) {
       if (!event._constructed) {
          return;
        }
        console.log(event.target)
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
   	 }
   }
}	
</script>

<style lang="stylus">
  .food 
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index:30
    width: 100%
    background: #fff
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 15px
        left: 10px
        display: block
        padding: 6px
        width: 10px
        height: 10px
        background-image: url(arrow_lift.svg)
        background-size: 12px
        background-position: 4px
        background-repeat: no-repeat
        background-color: rgba(0,0,0,.4)
        border-radius: 50%
    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        line-height: 24px
        font-size: 0
        .now
          margin-right: 8px
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          font-weight: 700
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 18px
        bottom: 18px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        &.fade-enter-active,  &.fade-leave-active
          transition: all 0.3s
        &.fade-enter, &.fade-leave-active
          opacity: 0
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)

     
</style>
