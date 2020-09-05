<template>
	<view class="search-input">
		<navigator class="search-content" url="/pages/search/search">
			<u-icon class="search" name="search"></u-icon>
			搜索
		</navigator>
	</view>
</template>

<script>
</script>

<style lang="scss">
.search-input{
	background: var(--themeColor);
	padding: 15rpx;
	text-align: center;
	.search-content{
		background: #fff;
		border-radius: 10rpx;
		padding: 15rpx;
		color: #999999;
		.search{
			margin-right: 6rpx;
		}
	}
}
</style>
