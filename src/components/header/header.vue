<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar" alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
			   <!--  获取数据是一个异步的过程，一开始seller.supports是一个
			   空的数据，所以最好在使用时先判断一下  避免报错-->
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" @click="detailShow=true" v-if="seller.supports">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="detailShow=true">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%" alt="">
		</div>
    <transition name="fade">
		<div v-show="detailShow" class="detail">
			<div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>   
      </div>
      <div class="detail-close" >
        <i class="icon-close" @click="detailShow=false"></i>
      </div>
		</div>
    </transition>
	</div>
</template>

<script>
import star from '../star/star'
 export default{
 	// 获取App.vue传过来的参数。
 	props: {
 		seller: {
 			type: Object
 		}
 	},
 	data () {
 		return {
 		  detailShow:false	
 		}
 	},
 	created () {
 		this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
 	},
  components: {
    star
  }
 };
</script>

  <!-- 经常会在写页面的时候发现两个相邻元素中间会有空隙，
  空隙是由一些空白字体组成，这个时候解决的办法
  可以将最外层容器的font-size设置为0 -->
 <!--  stylus 是很好的CSS预处理工具 提供一些方法，
  可以通过传递参数避免重复写一下样式或者是通过判断来选择样式 -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../../static/common/stylus/mixin"
@import "../../../static/common/stylus/base"
/*@import "../../../static/common/stylus/icon"*/
  .header
     position: relative
     overflow: hidden
     background: rgba(7,17,27,.5);
     color: #fff
     .content-wrapper
        position: relative
        padding: 24px 12px 18px 24px
        font-size: 0
        .avatar
           display: inline-block
           vertical-align: top
           img 
              border-radius: 2px
        .content
           display: inline-block
           margin-left: 16px
           .title
             margin: 2px 0 8px 0
             .brand
                display: inline-block
                width: 30px
                height: 18px
                vertical-align: top;
                bg-image('brand')
                background-size: 30px 18px
             .name
                margin-left: 6px
                font-size: 16px
                line-height: 18px
                font-weight: bold
           .description
             margin-bottom: 10px
             font-size: 12px
             line-height: 12px
           .support
             .icon
                display: inline-block
                width: 12px
                height: 12px
                margin-right: 4px
                background-size: 12px
                vertical-align: top
	         .decrease
	            bg-image('decrease_1')
	         .discount
	            bg-image('discount_1')
	         .guarantee
	            bg-image('guarantee_1')
	         .invoice
	            bg-image('invoice_1')
	         .special
	            bg-image('special_1')
	         .text
	            line-height: 10px
	            font-size: 10px
	    .support-count
	       position: absolute
	       right: 12px
	       bottom: 18px
	       padding: 0 8px
	       height: 24px
	       line-height: 24px
	       border-radius: 14px
	       background-color: rgba(0,0,0,.2)
	       text-align: center
	       display: flex
	       .count
	         font-size: 10px  
	         display: inline-block
	         height: 24px
	         line-height: 24px
	       .icon-keyboard_arrow_right
	         display: inline-block
	         width: 15px
	         height: 24px
	         line-height: 24px
	         background-image: url('keyboard_arrow_right.svg')
	         background-size: 15px 24px;
	         opacity: .7
     .bulletin-wrapper
        position: relative
        height: 28px
        line-height: 28px
        padding: 0 22px 0 12px
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        background: rgba(7,17,27,.2)
        .bulletin-title
           display: inline-block
           vertical-align: top
           width: 22px
           height: 12px
           margin-top: 8px
           bg-image('bulletin')
           background-size: 22px 12px
        .bulletin-text
           vertical-align: top
           font-size: 10px
           margin: 0 4px
        .icon-keyboard_arrow_right
           position: absolute
           right: 6px
           top: 4px
           display: inline-block
           width: 15px
           height: 22px
           line-height: 22px
           background-image:url('keyboard_arrow_right.svg')
           background-size: 15px 22px;
           opacity: .5
     .background 
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: -1
        filter: blur(10px) 
     .detail
        position: fixed
        top: 0
        left: 0
        z-index: 100
        width: 100%
        height: 100%
        overflow: auto
        transition: all .5
        background: rgba(7,17,27,0.8)
        backdrop-filter: blur(10px)
        &.fade-enter-active, &.fade-leave-active
          transition: all .8s
        &.fade-enter,&.fade-leave-active
          opacity: 0
          background: rgba(7,17,27,0)
        .detail-wrapper
          min-height 100%
          width: 100%;
          .detail-main
            margin-top: 64px
            padding-bottom: 64px
            .name
              line-height: 16px
              text-align: center
              font-weight: 700
              font-size: 16px
            .star-wrapper
              margin-top: 18px
              padding: 2px 0
              text-align: center
            .title
              display: flex
              width: 80%
              margin: 28px auto 24px auto
              .line
                flex: 1
                position: relative
                top: -6px
                border-bottom: 2px solid rgba(255,255,255,.2)
              .text
                padding: 0 12px
                font-size: 14px
                line-height: 14px
                font-weight: 700
            .supports
              width: 80%
              margin: 0 auto
              .support-item
                padding: 0 12px
                margin-bottom: 12px
                font-size: 0
                &:last-child
                  margin-bottom: 0
                .icon
                  display: inline-block
                  width: 16px
                  height: 16px
                  vertical-align: top
                  margin-right: 6px
                  background-size: 16px
                  background-repeat: no-repeat
                  &.decrease
                    bg-image('decrease_2')
                  &.discount
                    bg-image('discount_2')
                  &.guarantee
                    bg-image('guarantee_2')
                  &.invoice
                    bg-image('invoice_2')
                  &.special
                    bg-image('special_2')
                .text
                  line-height: 16px
                  font-size: 12px
            .bulletin
              width: 80%
              margin: 0 auto
              .content
                padding: 0 12px
                line-height: 24px
                font-size: 12px

        .detail-close
          position: relative
          width: 32px
          height: 32px
          margin: -64px auto 0 auto
          clear: both
          .icon-close
            width: 32px;
            height: 32px;
            display: block;
            background-image:url('close.svg')
            background-size: cover
            z-index: 9999
</style>
