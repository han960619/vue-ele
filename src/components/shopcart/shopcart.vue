<template>
<div>
  <div class="shopcart">
  	<div class="content" @click="toggleList">
  		<div class="content-left">
  			<div class="logo-wrapper">
  				<div class="logo" :class="{'heightlight':totalCount>0}">
  					<span class="cart"></span>
  				</div>
  				<div class="num" v-show="totalCount>0">{{totalCount}}</div>
  			</div>
  			<div class="price" :class="{'heightlight':totalPrice>0}">￥{{totalPrice}}</div>
  			<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
  		</div>
  		<div class="content-right">
            <div class="pay" :class="payClass"  @click.stop.prevent="pay">{{payDesc}}</div>
  		</div>
  	</div>
    <div class="ball-container">
      <transition-group name="drop" tag="div"      
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter">
        <div v-for="ball in balls" :key="ball" v-show="ball.show" class="ball"></div>
      </transition-group>
    </div>
    <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  ￥{{food.price * food.count}}
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
  </div>
  <transition name="fade">
    <div class="list-mask" @click="hideList" v-show="listShow"></div>
  </transition>
</div>
</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from '../../components/cartcontrol/cartcontrol'
	export default {
    data () {
      return {
         balls: [
           {
             show: false
           },
           {
             show: false
           },
           {
             show: false
           },
           {
             show: false
           },
           {
             show: false
           }
         ],
         dropBalls: [],
         fold: true
      }
    },
		props: {
			selectFoods: {
				type: Array,
				default () {
					return [
          {
            count: 0,
            price: 0
          }];
				}
			},
			deliveryPrice: {
 		    	type: Number,
 		    	default: 0
 		    },
      minPrice: {
 		    	type: Number,
 		    	default: 0
 		    }
		},
		computed: {
			totalPrice () {
                 let total = 0;
                 this.selectFoods.forEach((food) => {
                   total += food.price * food.count
                 })
                 return total;
			},
			totalCount () {
				let count = 0;
                 this.selectFoods.forEach((food) => {
                   count +=food.count
                 })
                 return count;
			},
      payDesc () {
        if(this.totalPrice === 0){
          return `￥${this.minPrice}起送`;
        }else if(this.totalPrice<this.minPrice){
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}起送`
        }else{
          return '去结算'
        }
      },
      payClass () {
        if(this.totalPrice<this.minPrice){
          return 'not-enough'
        }else{
          return 'enough'
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) { //如果没有better-scroll的实例则添加
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh(); //refresh计算是否需要滚动
            }
          });
        }
        return show;
      }
		},
    methods: {
      drop (el) {
        for(let i=0; i < this.balls.length; i++){
          let ball = this.balls[i];
          if(!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter (el) {
        let count = this.balls.length;
        while ( count-- ){
          let ball = this.balls[count];
          if(ball.show) {
            let rect  = ball.el.getBoundingClientRect();
            let x = rect.left;
            let y = -rect.top
            console.log(y)
            el.style.transform = `translate3d(-${x}px,${y}px,0)`;
          }
        }
      },
      // 当小球进入
      enter (el) {
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.transform = 'translate3d(0,0,0)';
        })
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift();
        if(ball) {
          ball.show = false;
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty () {
         this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList () {
        this.fold = true;
      },
      pay () {
        console.log(666)
      }
    },
    components: {
      cartcontrol
    }
	};
</script>

<style lang="stylus">
@import "../../../static/common/stylus/mixin"
  .shopcart
    position: fixed
    z-index: 99
    bottom: 0
    left: 0
    width: 100%
    height: 48px
    .content
      background-color: #141d27
      display: flex
      font-size: 0  
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -12px
          padding: 6px
          margin: 0 12px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background-color: #141d27
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            color: #fff
            font-weight: 700
            background-color: rgb(240,20,20)
            box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4)
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background-color: rgb(43,52,60)
            position: relative
            &.heightlight
              background: rgb(0,160,220)
            .cart
              position: absolute
              display: inline-block
              left: 50%
              top: 50%
              margin-top: -12px
              margin-left: -12px
              width: 24px
              height: 24px
              background-image: url('cart.svg')
              background-size: cover;
        .price
          position: relative
          display: inline-block
          vertical-align: top
          margin-top: 11px
          line-height: 24px
          box-sizing: border-box
          padding-right: 12px
          font-size: 14px
          font-weight: 700
          color: rgba(255,255,255,.4)
          border-right: 1px solid rgba(255,255,255,.1)
          &.heightlight
            color #fff
        .desc
          display: inline-block
          vertical-align: top
          font-size: 10px
          line-height: 24px
          margin: 12px 0 0 12px
          font-weight: 200
          color: rgba(255,255,255,.4);
      .content-right
        width: 105px 
        .pay
          color: rgba(255,255,255,.4)
          line-height: 48px
          height: 48px
          font-weight: 700
          font-size: 12px
          text-align: center
          background-color: rgb(43,52,60)
          letter-spacing: 1px
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0,160,220)
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
