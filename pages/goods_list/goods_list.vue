<template>
	<view class="goods_list">
		<!-- 搜索框开始 -->
		<search-input></search-input>
		<!-- 搜索框结束 -->
		
		<!-- tab开始 -->
		<u-tabs 
			:list="list" 
			:is-scroll="false"
			:current="current"
			active-color="#f8544c"
			inactive-color="#666666"
			:bold="false"
			bar-width="250"
			bar-height="4"
			@change="tabChange"
		></u-tabs>
		<!-- tab结束 -->
		
		<!-- 列表数据展示开始 -->
		<view class="goods_wrap">
			<view class="goods_item" v-for="goods in newGoodsList" :key="goods.goods_id">
				<navigator class="url" :url="'/pages/goos_detail/goos_detail?goods_id=' + goods.goods_id">
					<view class="item_a">
						<image
							class="item_img"
							mode="widthFix"
							:src="goods.goods_big_logo || 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'"
						></image>
					</view>
					
					<view class="item_right">
						<view class="item_title">{{goods.goods_name}}</view>
						<view class="item_price">￥{{goods.goods_price}}</view>
					</view>
				</navigator>
			</view>
		</view>
		<!-- 列表数据展示结束 -->
		
		<!-- 消息提示开始 -->
		<u-toast ref="uToast" />
		<!-- 消息提示结束 -->
	</view>
</template>

<script>
	import SearchInput from '../../components/searchInput/searchInput'
	export default {
		components:{
			SearchInput
		},
		data() {
			return {
				goodsList: [],
				pagenum: 1,
				pagesize: 5,
				total: 0,
				cid: '',
				query: '',
				list: [{name: '综合'},{name: '销量'},{name: '价格'}],
				current: 0
			}
		},
		onLoad(options) {
			this.cid = options.cid || ''
			this.query = options.query || ''
			this.getGoodsData(this.cid, this.query, this.pagenum)
		},
		computed:{
			newGoodsList() {
				return this.goodsList
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.goodsList = []
			this.pagenum = 1
			this.pagesize = 5
			this.total = 0
			this.getGoodsData(this.cid, this.query, this.pagenum)
		},
		// 上拉加载
		onReachBottom() {
			if(this.goodsList.length === this.total) {
				// 等于时说明已加载所有数据没必要再发送请求了
				this.$refs.uToast.show({
					title: '已加载所有商品',
					icon: false,
					position: 'bottom'
				})
			} else {
				this.pagenum++
				this.getGoodsData(this.cid, this.query, this.pagenum)
			}
		},
		methods: {
			// 获取商品列表数据
			getGoodsData(cid = '', query = '', pagenum, pagesize = 5) {
				this.api({
					url: 'goods/search',
					data: {
						cid,
						query,
						pagenum,
						pagesize
					}
				}).then(res => {
					if(res.meta.msg === '获取成功' && res.meta.status === 200) {
						const arr = JSON.parse(JSON.stringify(res.message.goods))
						this.total = res.message.total
						this.goodsList = this.goodsList.concat(arr)
					}
				})
			},
			// tab切换
			tabChange(i) {
				this.current = i	
			}
		}
	}
</script>

<style lang="scss">
	@import '../../styles/goods_list/index.scss';
</style>
