<template>
	<view class="collect">
		<u-tabs 
			:list="list" 
			:is-scroll="false" 
			:current="current" 
			:bold="false"
			active-color="#f8544c"
			:bar-width="187.5"
			:bar-height="4"
			@change="change"
		></u-tabs>
		<view class="collect_list">
			<view class="item" v-for="item in showData" :key="item.goods_id">
				<navigator class="item_a" :url="'/pages/goos_detail/goos_detail?goods_id=' + item.goods_id">
					<view class="img_wrap">
						<image class="img" :src="item.pics[0].pics_mid || 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'" mode="widthFix"></image>
					</view>
					<view class="content">
						<view class="title">{{item.goods_name}}</view>
						<view class="price">￥{{item.goods_price}}</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				collect: [],
				showData: '',
				list:[
					{name: '商品收藏'},
					{name: '品牌收藏'},
					{name: '店铺收藏'},
					{name: '浏览足迹'}
				]
			}
		},
		onLoad(o) {
			this.current = +o.index
		},
		onShow() {
			this.collect = uni.getStorageSync('collect') || []
			this.changeIndex(this.current)
		},
		methods: {
			change(i){
				this.current = i
				this.changeIndex(i)
			},
			changeIndex(i) {
				let data = ''
				switch(i){
					case 0:
						data = this.collect
						break
					case 1:
						data = this.collect
						break
					case 2:
						data = this.collect
						break
					case 3:
						data = this.collect
						break
				}
				this.showData = data
			}
		}
	}
</script>

<style lang="scss">
  @import '../../styles/collect/index.scss';
</style>
