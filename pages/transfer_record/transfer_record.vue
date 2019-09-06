<template>
	<view class="content">
		<view class="cj-top">
			<image src="../../static/image/returnhhh@2x.png" mode="" @click="back"></image>
			<text>转账记录</text>
		</view>
		<view class="cj-main">
			<view class="list" v-for="(item,index)  in lists">
				<view class="cj-in">
					<view class="shift">

						<view class="cj-left">
							<image src="../../static/image/assets@2x.png" mode=""></image>
							<!-- <input type="text" value="" placeholder="{{item.phone}}" /> -->
							<text class="input">{{item.phone}} </text>
						</view>
						<view class="cj-center">
							<text>{{item.coin}}</text>
							<image src="../../static/image/arrowzzz@2x.png" mode=""></image>
						</view>

						<view class="cj-right">
							<image src="../../static/image/nickname@2x.png" mode=""></image>
							<!-- <input type="text" value="" placeholder="{{item.for_phone}}" /> -->
							<text class="input">{{item.for_phone}} </text>
						</view>
					</view>
					<text>{{item.create_time}}</text>


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

		onShow() {
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

				let _this = this
				uniRequest.post("/api/user/transfer_history", _this.params)
					.then(function(response) {
						console.log(response);
						if (response.data.data.lists.length == 0) {
							_this.loadData = false;
							console.log(_this.loadData)
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

			},
			loadMore: function() {
				this.current = Number(this.current) + 1;
				console.log(this.current)
				this.initList(this.current)


			}
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
		text-align: center;
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
		width: 94%;
		margin: 0 auto;
		height: auto;

		position: relative;
		top: -200upx;
	}

	.list {
		width: 100%;
		height: 272upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10px;
		margin-bottom: 30upx;
	}

	.shift {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: space-between;
	}

	.shift>.cj-left {
		text-align: center;
	}

	.shift>.cj-left>image {
		width: 48upx;
		height: 48upx;
		margin-bottom: 30upx;
	}

	.shift>.cj-left>.input {
		display: block;
		width: 280upx;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24upx;
	}

	.shift>.cj-center>text {
		width: 128upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 214, 102, 1);
		margin-bottom: 50upx;
		display: block;

	}

	.shift>.cj-center>image {
		width: 34upx;
		height: 28upx;
		margin-left: 40upx;

	}

	.shift>.cj-right {
		text-align: center;
	}

	.shift>.cj-right>image {
		width: 48upx;
		height: 48upx;
		margin-bottom: 30upx;
	}

	.shift>.cj-right>.input {
		display: block;
		width: 260upx;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24upx;
	}

	.cj-in>text {

		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		position: relative;
		top: 20upx;
	}
</style>
