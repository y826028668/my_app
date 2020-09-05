<template>
	<view class="pay">
		<!-- 收货地址开始 -->
		<view class="address">
			<view class="user_name">
				<text class="name">收货人：{{userAddress.userName}}</text>
				<text class="phone">{{userAddress.telNumber}}</text>
			</view>
			<view class="detail_address">{{userDetailAddress}}</view>
			<u-line color="info" border-style="dashed" />
		</view>
		<!-- 收货地址结束 -->
		
		<!-- 订单列表开始 -->
		<view class="goods_list" >
			<view class="goods_item" v-for="data in dataList" :key="data.goods_id">
				<view class="img_wrap">
					<image mode="widthFix" class="img" :src="data.pics[0].pics_mid || 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'"></image>
				</view>
				<view class="goods_title">{{data.goods_name}}</view>
				<view class="goods_price">
					<view>￥{{data.goods_price}}</view>
					<view>x{{data.num}}</view>
				</view>
			</view>
		</view>
		<!-- 订单列表结束 -->
		
		<!-- 配送方式开始 -->
		<view class="distribution_mode">
			<view class="fangshi">
				<view class="ps">
					<text class="ps1">配送方式</text>
					<text class="ps2">普通快递 免运费</text>
				</view>
				<view class="msg">
					<text class="msg1">买家留言</text>
					<input class="msg2" type="text" placeholder="买家留言">
				</view>
			</view>
			<view class="jine">
				<view class="goods_jine">
					<text class="goods_je">商品金额</text>
					<text class="goods_price">111</text>
				</view>
				<view class="yunfei">
					<text class="yunfei">运费</text>
					<text class="baoyou">商家包邮</text>
				</view>
				<view class="total">合计：<text class="total_price">￥{{totalPrice}}</text></view>
			</view>
		</view>
		<!-- 配送方式结束 -->
		
		<!-- 提交订单开始 -->
		<view class="submit_order">
			<view class="heji">合计：<text class="zong">￥{{totalPrice}}</text></view>
			<view class="submit">提交订单</view>
		</view>
		<!-- 提交订单结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userAddress: {},
				checkedDartData: []
			}
		},
		onLoad() {
			this.userAddress = uni.getStorageSync('address')
		},
		onShow() {
			// 从缓存中或取用户的通信地址数据
			const address = uni.getStorageSync('address')
			if(address) this.userAddress = address
			
			// 从缓存中获取添加至购物车的商品数据
			const cart = uni.getStorageSync('cart')
			this.checkedDartData = cart.filter(e => e.checked === true)
		},
		computed:{
			// 用户详细地址
			userDetailAddress() {
				const { provinceName,cityName,countyName,detailInfo } = this.userAddress
				return provinceName + cityName + countyName + detailInfo
			},
			// 选中商品价格合计
			totalPrice() {
				let n = 0
				this.checkedDartData.forEach(e => {
					if(e.checked) n = n+e.goods_price*e.num
				})
				return n
			},
			dataList() {
				return this.checkedDartData
			}
			// // 选中商品数量合计
			// totalNum() {
			// 	let n = 0
			// 	this.cartData.forEach(e => {
			// 		if(e.checked) n += e.num
			// 	})
			// 	return n
			// }
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	@import '../../styles/pay/index.scss';
</style>
