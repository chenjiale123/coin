<template>
	<view class="content">
		<view class="cj-top">
			<view class="cj-first">
				<image src="../../static/image/returnhhh@2x.png" mode="" @click="back"></image>
				<text class="cj-title">USDT转账</text>
				<text class="cj-mom" @click="record">转账记录</text>
			</view>
		</view>
		<view class="cj-main">
			<view class="cj-in">
				<view class="shift">

					<view class="cj-left">
						<image src="../../static/image/assets@2x.png" mode=""></image>
						<input type="text" v-model="model.coin" value="" placeholder="请输入数量" />
					</view>
					<image src="../../static/image/arrowzzz@2x.png" mode=""></image>
					<view class="cj-right">
						<image src="../../static/image/nickname@2x.png" mode=""></image>
						<input type="text" value="" v-model="model.phone" placeholder="请输入对方账号" />
					</view>
				</view>
				<input type="password" value="" v-model="model.pay_pass" placeholder="请输入二级密码" />
				<button v-on:click="doSubmit">确认转账</button>


			</view>
		</view>
		<view class="money">
			<view class="cj-in">
				<view class="cj-left">
					<image src="../../static/image/logoxxx@2x.png" mode=""></image>
					<text>US钱包</text>
				</view>
				<view class="cj-right">
					<text>{{model.usdt_balance}}</text>

				</view>
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
					coin: 0,
					usdt_balance: 0,
					phone: '',
					pay_pass: '',
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token")
					
				},
				params: {
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token")
				}
			}
		},

		onLoad() {
			this.initData()
		},

		methods: {
			record:function(){
				uni.navigateTo({
					url: '/pages/transfer_record/transfer_record',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			initData: function() {
				let _this = this
				uniRequest.get('/api/user/transfer?uid='+_this.params.uid+'&token='+_this.params.token)
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
							_this.model.pay_pass = '';
						}



					})
					.catch(function(error) {
						console.log(error);
					});
			},
			  doSubmit: function() {
				  let _this = this
				   _this.model.token = uni.getStorageSync("token");
				   console.log(  _this.model);
			                if (this.model.pay_pass == '') {
			                   uni.showToast({
			                   	title:"支付密码不能为空",
								duration:3000,
								icon:'none'
			                   })
			                    return;
			                }
			              uniRequest.post('/api/user/transfer', _this.model)
			              	.then(function(response) {
			              		console.log(response);
								if(response.data.status == true){
									uni.showModal({
										title: '提示',
										content: response.data.message,
										success: function(res) {
											uni.navigateTo({
												url: '/pages/transfer_record/transfer_record',
												success: res => {},
												fail: () => {},
												complete: () => {}
											});
										}
									});
								}else{
									uni.showToast({
										title:response.data.message,
										duration:3000,
										icon:"none"
									})
								}
			              
			              		
			              
			              
			              
			              	})
			              	.catch(function(error) {
			              		console.log(error);
			              	});
			            }
		}

	}
</script>

<style>
	.content {
		background: rgba(249, 249, 249, 1);
	}

	.cj-top {
		width: 100%;
		height: 410upx;
		background: rgba(255, 214, 102, 1);
		overflow: hidden;
	}

	.cj-first {
		width: 94%;
		display: flex;
		justify-content: space-between;
		margin: 60upx auto;
	}

	.cj-first>image {
		width: 68upx;
		height: 40upx;
	}

	.cj-first>.cj-title {
		font-size: 38upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.cj-first>.cj-mom {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);

	}

	.cj-main {
		width: 94%;
		margin: 0 auto;
		height: 494upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10px;
		position: relative;
		top: -200upx;
	}

	.shift>.cj-in {
		width: 94%;
		margin: 0 auto;
		padding-top: 30upx;
		box-sizing: border-box;
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

	.shift>.cj-left>input {
		display: block;
		width: 280upx;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24upx;
	}

	.shift>image {
		width: 34upx;
		height: 28upx;
		position: relative;
		top: 88upx;
	}

	.shift>.cj-right {
		text-align: center;
	}

	.shift>.cj-right>image {
		width: 48upx;
		height: 48upx;
		margin-bottom: 30upx;
	}

	.shift>.cj-right>input {
		display: block;
		width: 280upx;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24upx;
	}

	.cj-in>input {
		margin-top: 40upx;
		display: block;
		width: 100%;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24px;
		padding-left: 60upx;
		box-sizing: border-box;
	}

	button {
		display: block;
		width: 280upx;
		height: 60upx;
		background: rgba(255, 214, 102, 1);
		box-shadow: 0px 4px 6px 0px rgba(255, 214, 102, 0.5);
		border-radius: 30upx;
		margin: 0 auto;
		margin-top: 60upx;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 60upx;
		text-align: center;
	}

	.money {
		width: 94%;
		margin: 0 auto;
		height: 108upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10px;
		position: relative;
		top: -170upx;
	}

	.money>.cj-in {
		width: 94%;
		margin: 0 auto;
		padding-top: 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.money>.cj-in>.cj-left>image {
		width: 56upx;
		height: 48upx;
	}

	.money>.cj-in>.cj-left>text {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 214, 102, 1);
		position: relative;
		top: -10upx;
		left: 10upx;

	}

	.money>.cj-in>.cj-right>text {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}
</style>
