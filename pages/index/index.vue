<template>
	<view class="home">
		<!-- 搜索开始 -->
		<search-input></search-input>
		<!-- 搜索结束 -->
		<!-- 轮播图开始 -->
		<view class="wrap">
			<u-swiper 
				:list="swiperList"
				name="image_src"
				mode="dot"
				height="340"
				border-radius=0
				@click="gotoUrl"
			></u-swiper>
		</view>
		<!-- 轮播图结束 -->
		<!-- 分类导航开始 -->
		<view class="cate_wrap">
			<navigator class="cate_item" open-type="switchTab" url="/pages/category/category" v-for="item in cateList" :key="item.name">
				<image class="cate_item_img" :src="item.image_src"></image>
			</navigator>
		</view>
		<!-- 分类导航结束 -->
		<!-- 楼层展示开始 -->
		<view class="floor_wrap">
			<view class="floor_item" 
				v-for="floor in floorList" 
				:key="floor.floor_title.name"
			>
				<view class="title">
					<image :src="floor.floor_title.image_src"></image>
				</view>
				<view class="content">
					<navigator
						class="floor_item_a"
						:url="'/pages/goods_list/goods_list?query=' + fitem.navigator_url" 
						v-for="fitem in floor.product_list"
						:key="fitem.image_src"
					>
						<image class="floor_item_img" :src="fitem.image_src"></image>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 楼层展示结束 -->
	</view>
</template>

<script>
	import SearchInput from '../../components/searchInput/searchInput';
	export default {
		components:{
			SearchInput
		},
		data() {
			return {
				swiperList: [],//轮播图数组
				cateList: [],//分类导航数组
				floorList: []//楼层数组
			}
		},
		onShow() {
			this.getSwiperData()
			this.getCateData()
			this.getFloorData()
		},
		methods: {
			// 轮播图点击跳转到商品详情页
			gotoUrl(index) {
				uni.navigateTo({
					url: '/pages/goos_detail/goos_detail?goods_id=' + this.swiperList[index].goods_id
				})
			},
			// 获取轮播图数据
			getSwiperData() {
				this.api({url: 'home/swiperdata'}).then(res => {
					if(res.meta.msg === '获取成功' && res.meta.status === 200) {
						this.swiperList = res.message
					}
				})
			},
			// 获取分类导航数据
			getCateData() {
				this.api({url: 'home/catitems'}).then(res => {
					if(res.meta.msg === '获取成功' && res.meta.status === 200) {
						this.cateList = res.message
					}
				})
			},
			// 获取楼层数据
			getFloorData() {
				this.api({url: 'home/floordata'}).then(res => {
					if(res.meta.msg === '获取成功' && res.meta.status === 200) {
						res.message.forEach(e => {
							e.product_list.forEach(e => {
								e.navigator_url = e.navigator_url.substring(24)
							})
						})
						this.floorList = res.message
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../styles/home/index.scss";
</style>
