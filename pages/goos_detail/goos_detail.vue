<template>
	<view class="goods_detail">
		<!-- 轮播图开始 -->
		<view class="wrap">
			<u-swiper 
				:list="goodsData.pics"
				name="pics_mid"
				height="525"
				mode="dot"
				border-radius="0"
				img-mode="widthFix"
				@click="clickSwiperImg"
			></u-swiper>
			<!-- 轮播图结束 -->
			
			<!-- 商品名称开始 -->
			<view class="goods_price">￥{{goodsData.goods_price}}</view>
			<view class="goods_name_wrap">
				<view class="goods_name">{{goodsData.goods_name}}</view>
				<view class="goods_collect">
					<u-icon :name="collectIcon" :class="collectIcon !== 'star' ? 'active' : ''" size="40" @click="collectGoods"></u-icon>
					<view class="collect_text">收藏</view>
				</view>
			</view>
			<!-- 商品名称结束 -->
			
			<!-- 商品图文详情开始 -->
			<view class="goods_info">
				<view class="info_title">图文详情</view>
				<view class="info_content">
					<rich-text :nodes="goodsData.goods_introduce"></rich-text>
				</view>
			</view>
			<!-- 商品图文详情结束 -->
			
			<!-- 底部工具栏开始 -->
			<view class="b_tool">
				<view class="service">
					<u-icon name="kefu-ermai" color="#999999" size="36"></u-icon>
					<view class="text">客服</view>
					<button open-type="contact"></button>
				</view>
				<view class="share">
					<u-icon name="share" color="#999999" size="36"></u-icon>
					<view class="text">分享</view>
					<button open-type="share"></button>
				</view>
				<navigator open-type="switchTab" url="/pages/cart/cart" class="cart">
					<u-icon name="shopping-cart" color="#999999" size="36"></u-icon>
					<view class="text">购物车</view>
				</navigator>
				<view class="add_cart" @click="addCart">加入购物车</view>
				<view class="buy_now">立即购买</view>
			</view>
			<!-- 底部工具栏结束 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_id: '',
				goodsData: {},
				collect: [],
				collectIcon: 'star'
			}
		},
		onLoad(options) {
			this.goods_id = options.goods_id
			this.getGoodsDetailData(this.goods_id)
			this.collect = uni.getStorageSync('collect') || []
		},
		onShow() {
			// 判断是否收藏商品
			const f = this.collect.some(e => {
				return e.goods_id+'' === this.goods_id+''
			})
			if(f) this.collectIcon = 'star-fill'
		},
		methods: {
			// 获取商品详情数据
			getGoodsDetailData(goods_id) {
				this.api({
					url: 'goods/detail',
					data: {goods_id}
				}).then(res => {
					if(res.meta.msg === '获取成功' && res.meta.status === 200) {
						this.goodsData = {
							goods_id: res.message.goods_id,
							pics: res.message.pics,
							goods_price: res.message.goods_price,
							goods_name: res.message.goods_name,
							goods_introduce: res.message.goods_introduce.replace(/\.webp/g, '.jpg')
						}
					}
				})
			},
			// 点击轮播图预览
			clickSwiperImg(i) {
				const urlsArr = this.goodsData.pics.map((e) => {
					return e.pics_mid
				})
				uni.previewImage({
					current: i,
					urls: urlsArr,
					indicator: "default"
				})
			},
			// 加入购物车
			addCart(){
				const that = this
				const copyGoodsData = JSON.parse(JSON.stringify(this.goodsData))
				const cart = uni.getStorageSync('cart') || []
				let index = -1
				if(cart.length !== 0) {
					cart.forEach((e, i) => {
						if(e.goods_id === this.goodsData.goods_id) index = i
					})
				}
				if(index === -1) {
					copyGoodsData.num = 1
					copyGoodsData.checked = false
					cart.push(copyGoodsData)
				} else {
					cart[index].num++
				}
				uni.setStorageSync('cart', cart)
				wx.showToast({
					title: '添加成功',
					icon: 'success',
					mask: true
				})
			},
			// 收藏/取消收藏商品
			collectGoods() {
				let collect = uni.getStorageSync('collect') || []
				let icon = ''
				if(this.collectIcon === 'star') {
					collect.push(this.goodsData)
					icon = 'star-fill'
					uni.showToast({
						title: '收藏成功',
						icon: 'success',
						mask: true
					})
				} else {
					collect = collect.filter(e => {
						return e.goods_id+'' !== this.goods_id+''
					})
					icon = 'star'
					uni.showToast({
						title: '取消成功',
						icon: 'success',
						mask: true
					})
				}
				this.collectIcon = icon
				uni.setStorageSync('collect',collect)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../styles/goos_detail/index.scss';
</style>
