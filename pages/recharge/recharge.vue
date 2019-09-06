<template>
	<view class="content">
		<view class="cj-top">
			<view class="cj-first">
				<image src="../../static/image/returnhhh@2x.png" mode="" @click="back"></image>
				<text class="cj-title">提现</text>
				<text class="cj-mom" @click="record">提现记录</text>
			</view>
			<view class="cj-center">
				<text class="cj-txt2">余额钱包（USDT）</text>
				<text class="cj-txt3">{{model.usdt_balance}}</text>
			</view>



		</view>
		<view class="cj-main">
			<view class="cj-in">
				<form>
					<select class="way">
						<option value="USDT">USDT</option>
					</select>
					<text>提现数量</text>
					<input type="number" v-model="model.usdt_coin" placeholder="最低 500 USDT" v-on:change="setValue()" class="num" />
					<text>实际到账</text>
					<input type="text" value="" placeholder="0.000000" class="accout" v-model="model.get_coin" readonly="readonly" />
					<text>矿工费</text>
					<input type="text" value="" v-model="model.free_coin" placeholder="0" class="address" readonly="readonly" />
					<text>收币地址</text>
					<input type="text" value="" placeholder="接收地址" class="address1" v-model="model.coin_get" readonly="readonly" />
					<text>二级密码</text>
					<input type="password" value="" placeholder="输入二级密码" class="pwd2" v-model="model.pay_pass" />

					<button v-on:click="doSubmit">提现</button>
				</form>
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
					usdt_coin: 0,
					get_coin: 0,
					coin_get: '',
					pay_pass: '',
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token"),
				},
				params: {
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token"),
				}
			}
		},

		onLoad() {
			this.initInfo()
		},

		methods: {
			setValue: function() {
				//console.log('11111');
				//console.log(this.model);
				this.model.get_coin = this.model.usdt_coin;

				//console.log(this.model);
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			initInfo: function() {
				let _this = this
				uniRequest.get('/api/user/withdraw?uid='+_this.params.uid+'&token='+_this.params.token)
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
							_this.model.free_coin = 0.00;
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
			},
			doSubmit: function() {
				console.log(this.model);
				if (this.model.usdt_coin < 200) {
					uni.showToast({
						title: '请输入合法金额',
						duration: 3000,
						icon: "none"
					})
					return;
				}
				if (this.model.pay_pass == '') {
					uni.showToast({
						title: '支付密码不能为空',
						duration: 3000,
						icon: "none"
					})
					return;
				}
				let _this = this
				_this.model.token = uni.getStorageSync("token");
				uniRequest.post('/api/user/withdraw', _this.model)
					.then(function(response) {
						console.log(response);
						if (response.data.status == true) {
							uni.showModal({
								title: '提示',
								content: response.data.message,
								success: function(res) {
									uni.navigateTo({
										url: '/pages/recharge_record/recharge_record',
										success: res => {},
										fail: () => {},
										complete: () => {}
									});
								}
							});
						} else {
							uni.showToast({
								title: response.data.message,
								duration: 3000,
								icon: "none"
							})
						}



					})
					.catch(function(error) {
						console.log(error);
					});

			},
			record:function(){
				uni.navigateTo({
					url: '/pages/recharge_record/recharge_record',
					success: res => {},
					fail: () => {},
					complete: () => {}
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

	.cj-center {
		padding: 38upx;
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
		height: 888upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10px;
		margin: 0 auto;
		position: relative;
		top: -50upx;
	}

	.way {
		width: 100%;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24upx;
		background: url(../../static/image/logotxxx@2x.png) no-repeat;
		background-size: 28upx 24upx;
		background-position: 12upx 12upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		padding-left: 40upx;
	}

	.cj-main text {
		display: block;
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-bottom: 20upx;
		margin-top: 30upx;
	}

	.num {
		width: 100%;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24upx;
	}

	.num[placeholder] {
		padding-left: 30upx;
		box-sizing: border-box;
	}

	.pwd2 {
		width: 100%;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24upx;
	}

	.pwd2[placeholder] {
		padding-left: 30upx;
		box-sizing: border-box;
	}

	.address {
		width: 100%;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24upx;
	}

	.address[placeholder] {
		padding-left: 30upx;
		box-sizing: border-box;
	}

	.address1 {
		width: 100%;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24upx;
	}

	.address1[placeholder] {
		padding-left: 30upx;
		box-sizing: border-box;
	}

	.accout {
		width: 100%;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24upx;
	}

	.accout[placeholder] {
		padding-left: 30upx;
		box-sizing: border-box;
	}

	button {
		margin: 0 auto;
		margin-top: 80upx;
		display: block;
		width: 280upx;
		height: 60upx;
		background: rgba(255, 214, 102, 1);
		box-shadow: 0px 4px 6px 0px rgba(255, 214, 102, 0.5);
		border-radius: 30upx;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		line-height: 60upx;
	}
</style>
