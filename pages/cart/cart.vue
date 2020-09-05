<template>
	<view class="cart">
		<!-- 收货地址开始 -->
		<view class="address-btn">
			<u-button v-if="!userAddress.userName" type="success" :open-type="openType" size="medium" plain @click="getAddress">获取收货地址</u-button>
			<view class="user_info" v-else>
				<view class="user_name">收货人：{{userAddress.userName}}</view>
				<view class="user_phone">联系方式：{{userAddress.telNumber}}</view>
				<view class="user_address_info">地址：{{userDetailAddress}}</view>
			</view>
		</view>
		<!-- 收货地址结束 -->
		
		<!-- 商品数据开始 -->
		<view class="goods_wrap">
			<view class="title">购物车</view>
			<view class="goods_list">
				<view class="cartIsNull" v-if="cartData.length === 0">
					<image mode="widthFix" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599115338650&di=1a3473894ccd3b6685082b7451e47074&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fe1b1467beea0a9c7d6a56b32bac6d7e5dcd914f7c3e6-YTwUd6_fw658"></image>
				</view>
				<view class="goods_item" v-for="(cart, index) in cartData" :key="cart.goods_id">
					<checkbox-group class="select_group" @change="selectChange(index)">
						<checkbox :checked="cart.checked" :value="index" />
					</checkbox-group>
					<view class="img_wrap">
						<image mode="widthFix" :src="cart.pics[0].pics_mid || 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'"></image>
					</view>
					<view class="right_content">
						<view class="goods_title">{{cart.goods_name}}</view>
						<view class="price_info">
							<text class="price">￥{{cart.goods_price}}</text>
							<view class="goods_number">
								<text class="minus" @click="changeNum('-', index)">-</text>
								<text class="num">{{cart.num}}</text>
								<text class="plus" @click="changeNum('+', index)">+</text>
								<u-icon class="delete" @click="clickDelete(index)" size="36" name="trash" color="#999999"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="payment" v-if="cartData.length !== 0">
				<checkbox-group class="select_group" @change="selectAllChange">
					<label class="select_all"><checkbox :checked="checkedAll" />全选</label>
				</checkbox-group>
				<view class="total">
					<view class="tt">合计：<text class="t">￥{{totalPrice}}</text></view>
					<view class="yunfei">包含运费</view>
				</view>
				<view class="clearing" @click="clearing">结算({{totalNum}})</view>
			</view>
		</view>
		<!-- 商品数据结束 -->
		
		<!-- 删除商品模态框开始 -->
		<u-modal 
			v-model="show"
			show-cancel-button
			show-confirm-button
			:title-style="{color: '#333'}"
			:content-style="{textAlign: 'center', padding: '30rpx 0'}"
			@confirm="deleteGoods"
		>是否删除该商品？</u-modal>
		<!-- 删除商品模态框结束 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { getSetting, chooseAddress, openSetting } from "../../utils/index.js"
	export default {
		data() {
			return {
				userAddress: {},
				cartData: [],
				index: '',
				checkedAll: false,
				show: false
			}
		},
		onShow() {
			// 从缓存中或取用户的通信地址数据
			const address = uni.getStorageSync('address')
			if(address) this.userAddress = address
			
			// 从缓存中获取添加至购物车的商品数据
			const cart = uni.getStorageSync('cart')
			if(cart) this.cartData = cart
		},
		onHide() {
			// 当页面隐藏时，缓存当前数据的状态
			this.storeCartData()
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
				this.cartData.forEach(e => {
					if(e.checked) n = n+e.goods_price*e.num
				})
				return n
			},
			// 选中商品数量合计
			totalNum() {
				let n = 0
				this.cartData.forEach(e => {
					if(e.checked) n += e.num
				})
				return n
			}
		},
		methods: {
			// 获取收货地址
			async getAddress() {
				try{
					// 获取权限状态
					const res1 = await getSetting()
					const scopeAddress = res1.authSetting['scope.address']
					// 判断权限情况
					// 点击了取消后再次点击后先打开权限控制页面让用户自行选择是否给与权限，成功后再次获取用户地址信息
					if(scopeAddress === false) await openSetting()
					const address = await chooseAddress()
					uni.setStorageSync('address', address)
				}catch(err) {
					console.log(err)
				}
			},
			// 商品数量修改
			changeNum(symbol, index){
				if(symbol === '-') {
					if(this.cartData[index].num === 1) return
					this.cartData[index].num--
				} else {
					this.cartData[index].num++
				}
			},
			// 选中单个商品
			selectChange(index) {
				this.cartData[index].checked = this.cartData[index].checked ? false : true
				const f = this.cartData.every(e => {
					return e.checked === true
				})
				this.checkedAll = false
				if(f) this.selectAllChange(f)
			},
			// 选中所有商品
			selectAllChange(n){// 功能：为true时，选中所有，为false时取消所有
				this.checkedAll = !this.checkedAll
				this.cartData.forEach(e => {
					e.checked = this.checkedAll
				})
			},
			// 缓存购物车数据
			storeCartData() {
				const that = this
				uni.setStorage({
					key: 'cart',
					data: that.cartData,
					success: res => {
						console.log('缓存数据')
					}
				})
			},
			// 删除某个商品
			deleteGoods() {
				const i = this.index
				this.cartData[i].checked = false
				if(typeof(i) === 'number') this.cartData.splice(i, 1)
				this.storeCartData()
			},
			// 传递index
			clickDelete(index) {
				this.show = true
				this.index = index
			},
			clearing() {
				// 至少选中一个商品才可以继续支付
				const y = this.cartData.some(e => e.checked === true)
				if(!y) {
					this.$refs.uToast.show({
						title: '请您至少选中一项商品',
						type: 'default',
					})
				} else if(!this.userAddress.userName){
					this.$refs.uToast.show({
						title: '请您获取收货地址',
						type: 'default',
					})
				} else {
					uni.navigateTo({
						url: '/pages/pay/pay'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../../styles/cart/index.scss';
</style>
