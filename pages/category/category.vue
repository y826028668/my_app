<template>
	<view class="categories">
		<!-- 搜索框开始 -->
		<search-input></search-input>
		<!-- 搜索框结束 -->
		
		<!-- 分类区域开始 -->
		<view class="cate_wrap">
			<!-- 左侧分类区域开始 -->
			<scroll-view class="c_left" scroll-y="true" >
				<view 
					class="cate_title"
					:class="i === index ? 'active' : ''"
					v-for="(cate, index) in cates"
					:key="cate.cat_id"
					@click="changeCate(index)"
				>{{cate.cat_name}}</view>
			</scroll-view>
			<!-- 左侧分类区域结束 -->
			
			<!-- 右侧内容区域开始 -->
			<scroll-view class="c_right" scroll-y="true" :scroll-top="scrollTop" @scroll="scroll">
				<view class="cate_content" v-for="child in catesChildren.children" :key="child.cat_id">
					<view class="content_title"><text>/</text>{{child.cat_name}}<text>/</text></view>
					<view class="content_item">
						<navigator class="go" :url="'/pages/goods_list/goods_list?cid=' + c.cat_id" v-for="c in child.children" :key="c.cat_id">
							<image class="img" mode="widthFix" :src="c.cat_icon"></image>
							<view class="text">{{c.cat_name}}</view>
						</navigator>
					</view>
				</view>
			</scroll-view>
			<!-- 右侧内容区域结束 -->
		</view>
		<!-- 分类区域结束 -->
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
				cates: [],
				i: 0,
				scrollTop: 0,
				old: {
						scrollTop: 0
				}
			}
		},
		computed:{
			catesChildren() {
				return this.cates[this.i]
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'cates',
				success: res => {
					const time = Date.now()
					if(time - res.data.time >= 20000) {
						this.getCategoriesData()
					} else {
						this.cates = res.data.data
					}
				},
				fail: err => {
					this.getCategoriesData()
				}
			})
		},
		methods: {
			// 获取分类数据并缓存
			getCategoriesData() {
				const that = this
				this.api({url: 'categories'}).then(res => {
					if(res.meta.msg === '获取成功' && res.meta.status === 200) {
						uni.setStorage({
							key: 'cates',
							data: {
								time: Date.now(),
								data: JSON.parse(JSON.stringify(res.message))
							},
							success: res => {}
						})
						that.cates = JSON.parse(JSON.stringify(res.message))
					}
				})
			},
			changeCate(i) {
				if(i === this.i) return
				this.i = i
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
						this.scrollTop = 0
				})
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			}
		}
	}
</script>

<style lang="scss">
@import '../../styles/category/index.scss';
</style>
