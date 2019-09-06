<template>
	<view class="content">
		<view class="cj-top">
			<image src="../../static/image/returnhhh@2x.png" mode="" @click="back"></image>
			<text>提现记录</text>
		</view>
		<view class="cj-main">
			<view class="list" v-for="(item,index)  in lists">
				<view class="cj-in">
					<view class="number">
						<view class="cj-left">
							<view class="logo">
								<image src="../../static/image/logoxxx@2x.png" mode=""></image>
								<text>USDT</text>
							</view>
							<text>手续费：{{item.free_coin}}%</text>
							<text>实际到账：{{item.get_coin}}</text>

						</view>
						<view class="cj-right">
							<text class="txt">提现数量：{{item.usdt_coin}}</text>
							<text v-if="item.status==0">申请中</text>
							<text v-if="item.status==1">提现成功</text>
							<text v-if="item.status==2">审核不通过</text>
						</view>
					</view>
					<text class="address">
						收币地址：{{item.coin_get}}
					</text>
					<text class="time">{{item.create_time}}</text>
				</view>
			</view>
			<text class="more" @click='loadMore' v-if="loadData">点击加载更多</text>
			<text class="more" v-else>没有更多了</text>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {



		data() {
			return {
				params: {
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token"),
					page: 1
				},
				count: 0,
				lists: [], //表格数据
				total: 1, //总页数
				current: 1, //当前页码
				loadData: true
			}
		},

		onLoad() {
			this.initList()
		},

		methods: {
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			initList: function(page) {

				//如果page存设置页数
				if (page != undefined) {
					this.params.page = page;
				}

				var _this = this;
				uniRequest.post('/api/user/withdraw_history', _this.params)
					.then(function(response) {
						console.log(response);
						console.log(response.data.data.lists.length);
						if (response.data.data.lists.length == 0) {
							_this.loadData = false;
							console.log("555");
							return false;
						}
						_this.lists = (response.data.data.lists == undefined) ? _this.lists : _this.lists.concat(response.data.data.lists);
						_this.total = (response.data.data.total == undefined) ? _this.total : response.data.data.total;
						_this.current = (response.data.data.current == undefined) ? _this.current : response.data.data.current;
						_this.count = (response.data.data.count == undefined) ? _this.count : response.data.data.count;
						_this.size = (response.data.data.size == undefined) ? _this.size : response.data.data.size;


					})
					.catch(function(error) {
						console.log(error);
					});
				// this.lists = this.lists.concat(this.lists)

			},
		}

	}
</script>

<style>
	.content {
		background: rgba(249, 249, 249, 1);
			overflow: auto;
	}
	.cj-main{
		text-align: center;
	}
.cj-main>text{
	/* display: block; */
	font-size: 20upx;
	margin: 0 auto;
}
	.cj-in {
		width: 94%;
		margin: 0 auto;
		padding-top: 30upx;
		box-sizing: border-box;
	}

	.cj-top {
		width: 100%;
		height: 410upx;
		background: rgba(255, 214, 102, 1);
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.cj-top>image {
		position: absolute;
		width: 68upx;
		height: 40upx;
		left: 30upx;
		top: 60upx;
	}

	.cj-top>text {
		font-size: 38upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		display: block;

		margin-top: 60upx;
	}

	.cj-main {
		position: relative;
		top: -200upx;
		margin: 0 auto;
		width: 94%;
		height: auto;
	}

	.list {
		width: 100%;
		height: 335upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10px;
		margin-bottom: 20upx;
	}

	.number {
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: auto;
	}

	.number>.cj-left>.logo {
		margin-bottom: 20upx;

	}

	.number>.cj-left>.logo>image {
		width: 56upx;
		height: 48upx;
	}

	.number>.cj-left>.logo>text {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		position: relative;
		top: -10upx;
		left: 10upx;
	}

	.number>.cj-left>text {
		display: block;
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
	}

	.txt {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 214, 102, 1);
		display: block;
	}

	.txt1 {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(249, 50, 81, 1);
		float: right;
		margin-top: 30upx;
	}

	.address {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.time {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-top: 20upx;
	}
</style>
