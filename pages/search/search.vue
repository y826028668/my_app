<template>
	<view class="search">
		<view class="top">
			<input ref="input" @input="changeText" v-model="resultText" type="text" placeholder="请输入要搜索商品">
		</view>
		<view class="result_list" v-show="resultData.length === 0">
			<navigator class="item" v-for="res in resultData" :key="res.goods_id">
				{{res.goods_name}}
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: -1,
				resultText: '',
				resultData: []
			}
		},
		methods: {
			changeText() {
				const that = this
				if(!this.resultText.trim()) {
					this.resultData = []
					this.resultText = ''
					return
				}
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					that.api({url: 'goods/qsearch', data: {query: this.resultText}}).then(res => {
						if(res.meta.msg === '获取成功' && res.meta.status === 200) {
							this.resultData = res.message
						}
					})
				}, 500)
			}
		}
	}
</script>


<style lang="scss">
  @import '../../styles/search/index.scss';
</style>
