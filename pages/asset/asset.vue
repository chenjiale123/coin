<template>
	<view class="content">
		<view class="cj-top">
			<image src="../../static/image/returnhhh@2x.png" mode="" @click="back"></image>
			<view class="balance">
				<view class="cj-left">
					<text class="txt">USDT余额</text>
					<text class="txt1">{{model.usdt_balance}}</text>
				</view>
				<view class="cj-right">
					<text class="txt">USDT余额</text>
					<text class="txt1">{{order.usdt_coin}}</text>
				</view>
			</view>
			<view class="state">
				<view class="cj-in">


					<view class="cj-left">
						<view class="erweima">
							<image v-if="model.qrcode" :src="imgUrl+model.qrcode" mode=""></image>
						</view>
						<text v-if="model.qrcode_status==2">正常</text>
						<text v-if="model.qrcode_status==1">生成中</text>
					</view>
					<view class="cj-center">
						<text>本轮编号：{{order.num}}</text>
						<text>剩余额度：0</text>
						<text v-if="order.status==0">本轮状态：可接单</text>
						<text v-if="order.status==1">本轮状态：收款中</text>
						<text v-if="order.status==2">本轮状态：已结束</text>
					</view>
					<view class="cj-right">
						<button v-if="order.status!=1" v-on:click="getOrder">接单US</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cj-import">
			<view class="cj-in">
				<image src="../../static/image/circles.gif" mode=""></image>
				<input type="text" v-if="order.status!=1" v-model="pay.coin" placeholder="请输入支付额度" />
				<button v-on:click="payUS">支付US</button>
				<button v-if="switcher" v-on:click="initReceipt">US当前</button>
				<button v-else v-on:click="initHistory(1)">US历史</button>
			</view>
		</view>
		<view class="cj-main" v-if="switcher">
			<view class="list" v-for="(item,index) in history" :key="index">
				<view class="cj-in">
					<view class="code">
						<view class="cj-left">
							<image src="../../static/image/logoxxx@2x.png" mode=""></image>
							<text>编号：{{item.num}}</text>
						</view>
						<view class="cj-right">
							<text v-if="item.status==2">已入账</text>
							<text v-if="item.status==1">收款中</text>

						</view>

					</view>
					<text>收款总额：{{item.total_coin}}</text>
					<text>US流水汇总：{{item.get_coin}} + {{item.free_coin}}</text>
					<text v-if="item.status==1">提前结束（原始额度：{{item.old_coin}}）</text>
					<text v-else>（原始额度：{{item.old_coin}}）</text>
					<text v-if="item.status==2">返还额度：{{item.back_coin}}</text>
				</view>

			</view>
			<text @click='loadMore' v-if="loadData">加载更多</text>
			<view v-else> <text v-if="current!=1">没有更多了</text></view>
		</view>
		<view class="cj-main" v-else>
			<view class="list" v-for="(item,index) in receipt" :key="index">
				<view class="cj-in">
					<view class="code">
						<view class="cj-left">
							<image src="../../static/image/logoxxx@2x.png" mode=""></image>
							<text>收款流水</text>
						</view>
						<view class="cj-right">
							<text v-if="item.status==2">已入账</text>
							<text v-if="item.status==1">收款中</text>

						</view>

					</view>
				
					<text>收款总额：{{item.get_coin}}</text>
					<text>US流水汇总：{{item.get_coin}} + {{item.free_coin}}</text>
					<text>订单编号：{{item.order_num}}</text>
					
				</view>

			</view>
		<!-- 	<text @click='loadMore' v-if="loadData">加载更多</text>
			<view v-else> <text v-if="current!=1">没有更多了</text></view> -->
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {



		data() {
			return {
				now: false,
				base: {
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token"),
					page: 1
				},
				order: {
					usdt_coin: 0,
					num: '',
					status: 0
				},
				pay: {
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token"),
					coin: ''
				},
				model: {
					usdt_balance: '',
					qrcode: '',
					qrcode_status: ''
				},
				receipt: [],
				switcher: true, //显示当前

				history: [], //是否查看历史
				current: 1,
				loadData: true,
				imgUrl: this.qiniu
			}
		},

		onShow() {
			this.initInfo();
			this.initOrder();
			this.initReceipt();
		},

		methods: {
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			initInfo: function() {
				let _this = this;
				uniRequest.post('/api/user/index', _this.base)
					.then(function(response) {

						if (response.data.code == 401) {
							uni.navigateTo({
								url: '/pages/index/index',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}
						if (response.data.data.qrcode_status != 2) {
							uni.showModal({
								title: '提示',
								content: '您的账号还未生产聚合支付二维码，请耐心等待',
								success: function(res) {
									if (res.confirm) {
										uni.switchTab({
											url:"../my/my"
										})
									} else if (res.cancel) {
										uni.switchTab({
											url:"../my/my"
										})
									}
								}
							});
						}
						if (response.data.status == true) {

							_this.model = response.data.data;
						}


						//账号收款二维码生成中



					})
					.catch(function(error) {
						console.log(error);
					});

			},



			//最近的接单抢单
			initOrder: function() {
				let _this = this;


				uniRequest.post('/api/order/index', _this.base)
					.then(function(response) {
						console.log(response);
						if (response.data.status == true) {
							_this.order = response.data.data != undefined ? response.data.data : _this.order;
						}
					})
					.catch(function(error) {
						console.log(error);
					});



			},

			//收款流水
			initReceipt: function() {
				let _this = this;
				this.switcher = false;
				uniRequest.post('/api/order/receipt', _this.base)
					.then(function(response) {
						console.log(response);
						if (response.data.status == true) {
							_this.receipt = response.data.data;
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},
			initHistory: function(page) {
				this.switcher = true;
				//如果page存设置页数
				if (page != undefined) {
					this.base.page = page;
				}

				var _this = this;
				uniRequest.post('/api/order/history', _this.base)
					.then(function(response) {
						console.log(response);
						if (response.data.data.lists.length == 0) {
							_this.loadData = false;
							return false;
						}
						if (response.data.status == true) {
							if (page != 1) {
								_this.history = (response.data.data.lists == undefined) ? _this.history : _this.history.concat(response.data.data
									.lists);
							} else {
								_this.history = (response.data.data.lists == undefined) ? _this.history : response.data.data.lists;
							}
							_this.current = (response.data.data.current == undefined) ? _this.current : response.data.data.current;
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			loadMore: function() {
				this.current = Number(this.current) + 1;
				this.initHistory(this.current);
			},

			payUS: function() {
				if (this.model.qrcode_status != 2) {
					uni.showModal({
						title: '提示',
						content: '您的账号还未生产聚合支付二维码，请耐心等待',
						success: function(res) {
							uni.navigateTo({
								url: '/pages/my/my',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}
					});
					return false;
				}
				let _this = this;
				uniRequest.post('/api/order/pay', _this.pay)
					.then(function(response) {
						console.log(response);
						if (response.data.status == true) {
							_this.pay.coin = '';
							_this.order.usdt_coin = Number(_this.order.usdt_coin) + Number(response.data.data.usdt_coin);
							_this.model.usdt_balance = Number(_this.model.usdt_balance) - Number(response.data.data.usdt_coin);
						} else {
							uni.showToast({
								title: response.data.message,
								duration: 3000
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},
			getOrder: function() {
				let _this = this;
				uniRequest.post('/api/order/task', _this.base)
					.then(function(response) {
						console.log(response);
						uni.showModal({
							title: '提示',
							content: response.data.message,
							success: function(res) {
								uni.navigateTo({
									url: '/pages/asset/asset',
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							}
						})
					})
					.catch(function(error) {
						console.log(error);
					});
			}

		}

	}
</script>

<style>
	.cj-main>text{
		text-align: center;
		font-size: 20upx;
		display: block;
		margin: 0 auto;
		margin-left:5 %;
		
	}
	.content {
		background: rgba(249, 249, 249, 1);

	}

	.cj-top {
		width: 100%;
		height: 490upx;
		background: rgba(255, 214, 102, 1);
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.cj-top>image {
		position: absolute;
		left: 30upx;
		top: 60upx;
		width: 68upx;
		height: 40upx;
	}

	.cj-top>.balance {
		display: flex;
		justify-content: space-around;
		margin-top: 120upx;
	}

	.cj-top>.balance .txt {
		display: block;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.cj-top>.balance .txt1 {
		display: block;
		font-size: 38upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.list>.cj-in {
		width: 94%;
		margin: 0 auto;
		padding-top: 30upx;
		box-sizing: border-box;
		text-align: center;

	}

	.state>.cj-in {
		width: 94%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}

	.state>.cj-in>.cj-left {
		text-align: center;
	}

	.state>.cj-in>.cj-left>text {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1)
	}

	.state>.cj-in>.cj-left>.erweima {
		width: 138upx;
		height: 138upx;
		border: 3px solid rgba(51, 51, 51, 1);
		border-radius: 10upx;
		text-align: center;

	}

	.state>.cj-in>.cj-left>.erweima>image {
		width: 118upx;
		height: 118upx;
		display: block;
		margin: 0 auto;
		margin-top: 10upx;

	}

	.state>.cj-in>.cj-center {
		text-align: left;
	}

	.state>.cj-in>.cj-center>text {

		display: block;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		margin-bottom: 20upx;
	}

	.state>.cj-in>.cj-right>button {
		width: 128upx;
		height: 60upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4px 6px 0px rgba(255, 214, 102, 0.5);
		border-radius: 30upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		line-height: 60upx;
		position: relative;
		top: 80upx;
	}

	.cj-import {
		width: 94%;
		margin: 0 auto;
		height: 128upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10px;
		position: relative;
		top: -30upx;
	}

	.cj-import>.cj-in {
		display: flex;
		justify-content: space-between;
	}

	.cj-import image {
		display: block;
		width: 44upx;
		height: 44upx;
	}

	.cj-import input {
		display: block;
		width: 290upx;
		height: 60upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 30upx;
		margin-left: 20upx;
	}

	.cj-import button {
		width: 148upx;
		height: 60upx;
		background: rgba(255, 214, 102, 1);
		box-shadow: 0px 4px 6px 0px rgba(255, 214, 102, 0.5);
		border-radius: 30upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 60upx;
		text-align: center;
	}

	.cj-main {
		width: 94%;
		margin: 0 auto;
	}

	.list {
		width: 100%;
		height: 280upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10px;
		margin-bottom: 30upx;
	}

	.list .code {
		display: flex;
		justify-content: space-between;

	}

	.list .code>.cj-left>image {
		width: 56upx;
		height: 48upx;
	}

	.list .code>.cj-left>text {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 214, 102, 1);
		position: relative;
		top: -10upx;
		left: 10upx;
	}

	.list .code>.cj-right>text {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(249, 50, 81, 1);
	}

	.list>.cj-in>text {
		display: block;
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 22px;
		text-align: left;
	}
</style>
