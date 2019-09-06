<template>
	<view class="content">
		<view class="cj-top">
			<view class="cj-first">
				<view class="cj-left">
					<image src="../../static/image/nicknamebbb@2x.png" mode=""></image>
					<text class="cj-txt" v-if="model.real_name">{{model.real_name}}</text>
					<text class="cj-txt" v-else>待完善</text>
					<text class="cj-txt1">{{model.phone}}</text>
				</view>
				<view class="cj-right">
					<image src="../../static/image/refresh@2x.png" mode=""></image>
				</view>

			</view>
			<view class="cj-center">
				<text class="cj-txt2">余额钱包（USDT）</text>
				<text class="cj-txt3">{{model.usdt_balance}}</text>
			</view>
		</view>

		<view class="cj-main">
			<view class="cj-left">
				<image src="../../static/image/topup@2x.png" mode="" @click="charge"></image>
				<image src="../../static/image/transfer@2x.png" mode="" @click="transfer"></image>
			</view>
			<image src="../../static/image/pay@2x.png" mode="" @click="pay"></image>
			<view class="cj-right">
				<image src="../../static/image/withdrawal@2x.png" mode="" @click="withdraw"></image>
				<image src="../../static/image/service@2x.png" mode="" @click="service"></image>
			</view>

		</view>
		<view class="new">
			<view class="cj-in1">
				<text class="title">{{title}}</text>
				<text>{{content}}</text>
			</view>

		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {



		data() {
			return {
				model: {
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token"),
					vip: '',
					qrcode_status: '',
					phone: '',
					real_name: '',
					usdt_balance: '',
					status: ''
				},
				content: '',
				title: '',
					
				parma:{
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token")
				}

			}
		},

		onShow() {
			this.initVip()
			this.initInfo()
			this.initMsg()
		},

		methods: {
			initMsg: function() {
				var _this = this
				uniRequest.post('/api/index/msg', _this.model)
					.then(function(response) {

						if (response.data.status == true) {
							_this.title = response.data.data.title,
								_this.content = response.data.data.content
						}
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			initVip: function() {


				uniRequest.post('/api/index/init', {
						uid: uni.getStorageSync("uid"),
						token: uni.getStorageSync("token")
					})
					.then(function(response) {
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});


			},

			initInfo: function() {
				let _this = this;
				uniRequest.post('/api/user/index', {
						uid: uni.getStorageSync("uid"),
						token: uni.getStorageSync("token"),
						vip: '',
						qrcode_status: '',
						phone: '',
						real_name: '',
						usdt_balance: '',
						status: ''
					})
					.then(function(response) {
						console.log(response);
						if (response.data.code == 401) {
							uni.navigateTo({
								url: '/pages/index/index',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}

						if (response.data.status == true) {

							_this.model = response.data.data;
						}



					})
					.catch(function(error) {
						console.log(error);
					});

			},

			pay: function() {
				var _this = this
				if (_this.model.qrcode_status == 0) {
					uni.showModal({
						title: '提示',
						content: '您的账号还未生产聚合支付二维码，请先完善资料',
						success: function(res) {
							uni.navigateTo({
								url: '/pages/identify/identify',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}
					});
				} else if (_this.model.status == 0) {
					uni.showModal({
						title: '提示',
						content: '您的账号尚未激活，请先使用{$Think.config.recharge.activate}USDT进行激活',
						success: function(res) {
							uni.navigateTo({
								url: '/pages/identify/identify',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}
					});


				} else {
					uni.navigateTo({
						url: '/pages/asset/asset',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}

			},

			charge: function() {
				var _this = this
				if (_this.model.status == 0) {
					uni.showModal({
						title: '提示',
						content: "您的账号尚未激活，请先使用5USDT进行激活",
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/pay/pay',
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					uni.navigateTo({
						url: '/pages/pay/pay',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}

			},

			transfer: function() {
				uni.navigateTo({
					url: '/pages/transfer/transfer',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			withdraw: function() {
				uni.navigateTo({
					url: '/pages/recharge/recharge',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			service: function() {
				var _this=this
			
				uniRequest.post('/api/index/service',_this.parma)
					.then(function(response) {
				
						if (response.data.status == true) {
						uni.showModal({
							title: '客服',
							content:response.data.data.info ,
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						}
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
		
			}

		}

	}
</script>

<style>
	.cj-in1{
		width: 94%;
		margin: 0 auto;
		padding-top: 30upx;
		box-sizing: border-box;
		text-align: center;
	}
	.new {
		width: 94%;
		margin: 0 auto;
		padding: 10upx 0;
		/* height: 128upx; */
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10px;
		position: relative;
	}

	.new .title {
		display: block;
		font-weight: bold;
	}

	.new text {
		font-size: 20upx
	}

	.content {
		background: rgba(249, 249, 249, 1);
		overflow: auto;
	}

	.cj-top {
		width: 100%;
		height: 410upx;
		background: rgba(255, 214, 102, 1);
	}

	.cj-first {
		width: 94%;
		display: flex;
		/* margin-top: 60upx; */
		padding-top: 60upx;
		box-sizing: border-box;
		justify-content: space-between;
		margin: 0 auto;
	}

	.cj-left {
		width: 50%;
		height: 40upx;
	}

	.cj-left>image {
		width: 40upx;
		height: 40upx;
	}

	.cj-left>.cj-txt {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);

	}

	.cj-left>.cj-txt1 {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.cj-right>image {
		width: 40upx;
		height: 40upx;
	}

	.cj-center {
		padding: 108upx;
		margin: 0 auto;
		width: 208upx;
		height: auto;
	}

	.cj-center>.cj-txt2 {
		display: block;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.cj-center>.cj-txt3 {
		font-size: 58upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.cj-main {
		width: 94%;
		margin: 0 auto;
		margin-top: 20upx;
		height: auto;
		display: flex;


		box-sizing: border-box;
		justify-content: space-between;
		position: relative;
	}

	.cj-main>.cj-left {
		width: 248upx;
		height: auto;
	}

	.cj-main>.cj-left>image {
		width: 248upx;
		height: 248upx;
	}

	.cj-main>.cj-right {
		width: 248upx;
		height: auto;
	}

	.cj-main>.cj-right>image {
		width: 248upx;
		height: 248upx;
	}

	.cj-main>image {
		position: absolute;
		width: 340upx;
		height: 340upx;
		top: 78upx;
		left: 50%;
		margin-left: -170upx;
	}
</style>
