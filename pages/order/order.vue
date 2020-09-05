<template>
	<view class="user_order">
		<u-tabs-swiper 
			ref="tabs" 
			:list="list" 
			:is-scroll="false"
			active-color="#f8544c"
			inactive-color="#666666"
			bar-width="187.5"
			bar-height="4"
			:bold="false"
			:current="current"
			@change="changeIndex"
		></u-tabs-swiper>
		<swiper class="swiper" :duration="300" :current="swiperCurrent" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="i in 4" :key="i">
				<scroll-view class="scroll-view" scroll-y>
					<view class="item" v-for="item in currentOrder" :key="item.id">
						<view class="num">
							<text>订单编号</text>
							<text>{{item.num}}</text>
						</view>
						<view class="price">
							<text>订单价格</text>
							<text class="qian">￥{{item.price}}</text>
						</view>
						<view class="date">
							<text>订单日期</text>
							<text class="riqi">{{item.date}}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{name: '全部'},
					{name: '待付款'},
					{name: '待发货'},
					{name: '退款/退货'},
				],
				current: 0,
				swiperCurrent: 0,
				type: '',
				orderAll: [
					{
						id: 1,
						num: 'AAAA202009040001',
						price: 1355,
						date: '2020/9/1 9:23:12',
						f: 0,
						s: 0
					},
					{
						id: 2,
						num: 'AAAA202009040002',
						price: 985,
						date: '2020/10/4 12:34:37',
						f: 1,
						s: 1
					},
					{
						id: 3,
						num: 'AAAA202009040003',
						price: 2300,
						date: '2020/6/25 11:40:03',
						f: 0,
						s: 0
					},
					{
						id: 4,
						num: 'AAAA202009040004',
						price: 1500,
						date: '2020/1/30 12:34:37',
						f: 1,
						s: 1
					},
					{
						id: 5,
						num: 'AAAA202009040005',
						price: 870,
						date: '2020/3/29 9:23:12',
						f: 1,
						s: 0
					},
					{
						id: 6,
						num: 'AAAA202009040006',
						price: 652,
						date: '2020/7/18 12:34:37',
						f: 0,
						s: 0
					},
					{
						id: 7,
						num: 'AAAA202009040007',
						price: 253,
						date: '2020/5/22 8:35:15',
						f: 1,
						s: 1
					},
					{
						id: 8,
						num: 'AAAA202009040008',
						price: 286,
						date: '2020/12/25 8:56:37',
						f: 0,
						s: 0
					},
					{
						id: 9,
						num: 'AAAA202009040009',
						price: 380,
						date: '2020/11/18 13:16:17',
						f: 1,
						s: 0
					},
					{
						id: 10,
						num: 'AAAA2020090400010',
						price: 1585,
						date: '2020/1/12 15:37:17',
						f: 1,
						s: 0
					},
					{
						id: 11,
						num: 'AAAA2020090400011',
						price: 2468,
						date: '2020/9/25 18:06:02',
						f: 0,
						s: 0
					},
					{
						id: 12,
						num: 'AAAA2020090400012',
						price: 76,
						date: '2020/8/27 15:25:57',
						f: 1,
						s: 0
					},
					{
						id: 13,
						num: 'AAAA2020090400013',
						price: 976,
						date: '2020/6/11 20:23:12',
						f: 0,
						s: 0
					},
					{
						id: 14,
						num: 'AAAA2020090400014',
						price: 642,
						date: '2020/5/23 12:34:37',
						f: 1,
						s: 0
					},
					{
						id: 15,
						num: 'AAAA2020090400015',
						price: 3346,
						date: '2020/5/12 9:23:12',
						f: 0,
						s: 0
					},
					{
						id: 16,
						num: 'AAAA2020090400016',
						price: 7652,
						date: '2020/12/3 12:34:37',
						f: 0,
						s: 0
					}
				]
			}
		},
		onLoad() {
			
		},
		onShow() {
			// 获取点击的tab参数
			const c = this.$scope.options.type
			this.current = c - 1
			this.swiperCurrent = c - 1
		},
		computed:{
			currentOrder() {
				const c = this.current
				let arr = []
				if(c === 0) {
					arr = this.orderAll
				} else if(c === 1) {
					arr = this.orderAll.filter(e => {
						return e.f === 0
					})
				} else if(c === 2) {
					arr = this.orderAll.filter(e => {
						return e.s === 0
					})
				} else {
					arr = this.orderAll
				}
				return arr
			}
		},
		methods: {
			// tab点击同步swiper索引
			changeIndex(i) {
				this.current = i
				this.swiperCurrent = i
			},
			// swiper滑动同步tab索引
			animationfinish(i) {
				this.current = i.detail.current
				this.swiperCurrent = i.detail.current
			}
		}
	}
</script>

<style lang="scss">
	@import '../../styles/order/index.scss';
</style>