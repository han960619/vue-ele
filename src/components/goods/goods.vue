<template>
<div class="goods">
   <div class="menu-wrapper" ref="menu-wrapper">
   	  <ul>
   	  	<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)" ref="menuList">
   	  		<span class="text border-1px">
               <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
   	  		</span>
        </li>
   	  </ul>
   </div>	
   <div class="foods-wrapper" ref="foods-wrapper">
   	  <ul>
   	  	<li v-for="item in goods" class="food-list" ref="foodList">
   	  		<h2 class="title">{{item.name}}</h2>
   	  		<ul>
   	  			<li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)"> 
   	  				<div class="icon">
   	  				  <img :src="food.icon" width="57px" height="57px">
   	  				</div>
   	  				<div class="content">
   	  					<h2 class="name">{{food.name}}</h2>
   	  					<p class="desc">{{food.description}}</p>
   	  					<div class="extra">
   	  						<span class="count">月售{{food.sellCount}}份</span>
   	  						<span>好评率{{food.rating}}%</span>
   	  					</div>
   	  					<div class="price">
   	  						<span class="now">￥{{food.price}}</span>
   	  						<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
   	  					</div>
                <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @event="getEvent"></cartcontrol>
                </div>
   	  				</div>
   	  			</li>
   	  		</ul>
   	  	</li>
   	  </ul>
   </div>
    <!-- 将配送费，起送费传递给购物车 -->
   <shopcart ref="shopcart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :select-foods="selectFoods"></shopcart>
   <food :food = "selectedFood" ref="food"></food>
</div>
</template>

<script>
import shopcart from '../../components/shopcart/shopcart'
import BScroll from 'better-scroll';
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import food from '../../components/food/food'
 export default{
 	props: {
 		seller: {
 			type: Object
 		}
 	},
 	data () {
 		return {
 			goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
 		}
 	},
  computed: {
    currentIndex() {
      for(let i=0; i<this.listHeight.length ;i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if(!height2 || this.scrollY >= height1 && this.scrollY < height2) {
          return i;
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count){
            foods.push(food);
          }
        })
      })
      return foods
    }
  },
 	created () {
 	this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('api/goods').then((res) => {
            res = res.data;
            this.goods = res.data;
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight();
            });
          });
  },
  methods: {
    _drop (target) {
      this.$refs.shopcart.drop(target)
    },
    _initScroll() {
       //取得一个dom  在dom中先绑定ref="food-wrapper
        this.meunScroll = new BScroll(this.$refs['menu-wrapper'], {
               click: true
           });
        this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {
          click: true,
         probeType:3   //检测实时滚动的位置
        });
        //监听 foods栏事件
        this.foodsScroll.on('scroll' , (pos) =>{
          //触发滑动，就获取到当前的高度y
           this.scrollY =Math.abs(Math.round(pos.y))
           let menuList= this.$refs.menuList;
           let el = menuList[this.currentIndex];
           this.meunScroll.scrollToElement(el,300);
        });
    },
    _calculateHeight() {
        let foodList= this.$refs.foodList;
        let height=0;
        this.listHeight.push(height);
        foodList.forEach((list) => {
          //获取到每个list的高度
          height += list.clientHeight;
          this.listHeight.push(height);
        })
    },
    selectMenu (index, event) {
      if(!event._constructed){
        return;
      }
      let foodList= this.$refs.foodList;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el,300);
    },
    getEvent(el) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(el);
        });
    },
    selectFood (food ,event)  {
      if(!event._constructed){
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food
  }
 };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../static/common/stylus/mixin"
  .goods
     position: absolute
     display: flex
     width: 100%
     top: 174px
     bottom: 46px
     overflow: hidden
     .menu-wrapper
        flex: 0 0 80px
        width: 80px
        background: #f3f5f7
        .menu-item
          	display: table
          	width: 56px
          	height: 54px
          	line-height: 14px
          	padding: 0 12px
          	.text
          	   font-size: 12px
          	   display: table-cell
          	   width: 56px
          	   vertical-align: middle
          	   border-1px(rgba(7,17,27,.1))
          	.icon
               display: inline-block
               width: 14px
               height: 14px
               margin-right:2px
               background-size: 14px
               vertical-align: top
          .current
            position: relative
            z-index: 10
            background: #fff
            margin-top: -1px
            .text
               border-1px(rgba(255,255,255,1))
               font-weight: 700
	        .decrease
	            bg-image('decrease_3')
	        .discount
	            bg-image('discount_3')
	        .guarantee
	            bg-image('guarantee_3')
	        .invoice
	            bg-image('invoice_3')
	        .special
	            bg-image('special_3')
     .foods-wrapper
        flex: 1
	    .title
          padding-left: 14px
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 10px
          color: rgb(147,153,159)
          background-color: #f3f5f7
        .food-item
          display: flex
          padding: 18px 0
          margin: 0 18px
          border-1px(rgba(7,17,27,.1))
          &:last-child
            border-none()
          .icon
            width: 57px
            height: 57px
            margin-right: 10px
          .content
            flex: 1
            .name
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7,17,27)
              font-weight: 700
            .desc,.extra 
              margin-bottom: 8px
              line-height: 13px
              font-size: 10px
              color: rgb(147,153,159)
            .extra
              .count
                margin-right: 12px
            .price  
              line-height: 24px
              font-size: 0
              .now 
                margin-right: 8px
                font-size: 14px
                color: rgb(240,20,20)
                font-weight: 700
              .old
                font-size: 10px
                text-decoration: line-through
                font-weight: 700
                color: rgb(147,153,159)
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 18px
</style>
