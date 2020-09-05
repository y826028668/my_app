<template>
	<view class="user">
		<!-- 用户信息开始 -->
		<view class="login">
			<button
				class="login_btn"
				open-type="getUserInfo" 
				@getuserinfo="getuserinfo"
				type="default"
				plain
				v-if="isShow"
			>登录</button>
			<view class="user_info" v-if="!isShow">
				<view class="bg">
					<image mode="aspectFill" class="img" :src="userInfo.avatarUrl"></image>
				</view>
				<view class="avatar">
					<image mode="widthFix" class="img" :src="userInfo.avatarUrl"></image>
				</view>
				<view class="user_name">{{userInfo.nickName}}</view>
			</view>
			
			<view class="user_content" v-if="!isShow">
				<navigator url="/pages/collect/collect?index=0" class="collect_shops">
					<view>0</view>
					收藏店铺
				</navigator>
				<navigator url="/pages/collect/collect?index=1" class="collect_goods">
					<view>{{collect.length || 0}}</view>
					收藏商品
				</navigator>
				<navigator url="/pages/collect/collect?index=2" class="attention">
					<view>0</view>
					关注商品
				</navigator>
				<navigator url="/pages/collect/collect?index=3" class="footprint">
					<view>0</view>
					我的足迹
				</navigator>
			</view>
		</view>
		<!-- 用户信息结束 -->
		
		<!-- 我的订单开始 -->
		<view class="user_order">
			<navigator url="/pages/order/order?type=1" class="all_orders">
				<i class="iconfont icon-dingdan"></i>
				<view class="text">全部订单</view>
			</navigator>
			<navigator url="/pages/order/order?type=2" class="obligation">
				<i class="iconfont icon-fukuantongzhi"></i>
				<view class="text">待付款</view>
			</navigator>
			<navigator url="/pages/order/order?type=3" class="wait_receive">
				<i class="iconfont icon-icon-test"></i>
				<view class="text">待收货</view>
			</navigator>
			<navigator url="/pages/order/order?type=4" class="return">
				<i class="iconfont icon-zy_daifukuan"></i>
				<view class="text">退款/退货</view>
			</navigator>
		</view>
		<!-- 我的订单结束 -->
		
		<!-- 用户可操作菜单开始 -->
		<view class="user_menu">
			<view class="user_address">收货地址管理</view>
			<view class="kefu">
				联系客服
				<button open-type="contact"></button>
			</view>
			<view class="feedback" @click="gotoFeedback">
				意见反馈
				<button open-type="feedback"></button>
			</view>
			<view class="about">关于我们</view>
			<view class="recommend">
				推荐小程序给他人
				<button open-type="share"></button>
			</view>
		</view>
		<!-- 用户可操作菜单结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				isShow: true,
				collect: 0
			}
		},
		onShow() {
			// 从缓存获取用户信息
			const u = uni.getStorageSync('userInfo') || {}
			if(u.nickName) {
				this.userInfo = u
				this.isShow = false
			}
			// 获取收藏商品
			let c = uni.getStorageSync('collect')
			this.collect = c
		},
		methods: {
			// 获取用户信息并缓存
			getuserinfo(e) {
				if(e.detail.userInfo.nickName) {
					this.isShow = false
					this.userInfo = e.detail.userInfo
					uni.setStorageSync('userInfo', e.detail.userInfo)
				}
			},
			// 跳转到意见反馈
			gotoFeedback() {
				uni.navigateTo({
					url: '/pages/feedback/feedback'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../styles/user/index.scss';
</style>

