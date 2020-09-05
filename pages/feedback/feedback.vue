<template>
	<view class="feedback">
		<view class="type">
			<view class="title">问题种类</view>
			<view class="type_item">
				<text>功能建议</text>
				<text>购买方面问题</text>
				<text>性能问题</text>
				<text>商品、商家投诉</text>
				<text>其他</text>
			</view>
			<view class="content">
				<textarea class="text" v-model="text" maxlength="200" placeholder="请描述您的问题" />
				<text class="max_length">{{text.length}}/200</text>
			</view>
			<img-upload :imgArr="imgArray" loading url="xxx(上传图片的url)" @result="resultUrl" @delImg="delImg"></img-upload>
			<button class="submit" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	import ImgUpload from '@/components/poiuy-uImgUpload/imgUpload.vue';
	export default {
		components: {
			ImgUpload
		},
		data() {
			return {
				text: ""
			}
		},
		methods: {
			submit() {
				uni.switchTab({
					url: '/pages/user/user'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../styles/feedback/index.scss';
</style>
