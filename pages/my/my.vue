<template>
	<view class="content">
		<view class="cj-top">
			<text >等级：VIP{{model.vip}} 佣金点：{{model.vip_rate}}</text>
			<view class="cj-center">
				<text class="cj-txt2" v-if="model.real_name">{{model.real_name}}</text>
				<text class="cj-txt2" v-else>待完善</text>
				<text class="cj-txt3">{{model.phone}}</text>
			</view>

		</view>
		<view class="cj-main">

			<view class="cj-in">
				<image src="../../static/image/setupthe@2x.png" mode=""></image>
				<view @click="identify">
					<view class="cj-left">
						<image src="../../static/image/identity@2x.png" mode=""></image>
						<text>身份认证</text>
					</view>
					<view class="cj-right">
						<image src="../../static/image/more@2x.png" mode=""></image>
					</view>
				</view>
				<view @click="editPwd">
					<view class="cj-left">
						<image src="../../static/image/passwordhhh@2x.png" mode=""></image>
						<text>修改密码</text>
					</view>
					<view class="cj-right">
						<image src="../../static/image/more@2x.png" mode=""></image>
					</view>
				</view>
				<view @click="pwdTwo">
					<view class="cj-left">
						<image src="../../static/image/secondary@2x.png" mode=""></image>
						<text>二级密码</text>
					</view>
					<view class="cj-right">
						<image src="../../static/image/more@2x.png" mode=""></image>
					</view>
				</view>
				<view @click="account">
					<view class="cj-left">
						<image src="../../static/image/switch@2x.png" mode=""></image>
						<text>邀请链接</text>
					</view>
					<view class="cj-right">
						<image src="../../static/image/more@2x.png" mode=""></image>
					</view>
				</view>
				<view @click="message">
					<view class="cj-left">
						<image src="../../static/image/message@2x.png" mode=""></image>
						<text>系统消息</text>
					</view>
					<view class="cj-right">
						<image src="../../static/image/more@2x.png" mode=""></image>
					</view>
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
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token"),
					vip: '',
					vip_rate: '',
					phone: '',
					real_name: ''
				},
				clipboard: this.qiniu + "index/index/sign?channel=" + uni.getStorageSync("uid")
			}
		},

		onShow() {
			this.initInfo()
		},

		methods: {

			identify: function() {
				uni.navigateTo({
					url: '/pages/identify/identify',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			editPwd: function() {
				uni.navigateTo({
					url: '/pages/edit_pwd/edit_pwd',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			pwdTwo: function() {
				uni.navigateTo({
					url: '/pages/set_pwd/set_pwd',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			account: function() {
				uni.setClipboardData({
					data:this.clipboard ,
					success: function(data) {
						console.log(data);
						uni.showToast({
							title: '复制成功'
						});
					},
					fail: function(err) {},
					complete: function(res) {}
				})
				console.log(this.clipboard);
			},
			message: function() {
				uni.navigateTo({
					url: '/pages/message/message',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			initInfo: function() {
				let _this = this
				uniRequest.post('/api/user/index', _this.model)
					.then(function(response) {
						console.log(response);
						if (response.data.data.code == 401) {
							uni.navigateTo({
								url: '/pages/index/index',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}

						if (response.data.status == true) {
							_this.model.vip = response.data.data.vip;
							_this.model.vip_rate = response.data.data.vip_rate;
							_this.model.phone = response.data.data.phone;
							_this.model.real_name = response.data.data.real_name;
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
		padding-top: 30upx;
	}

	.cj-top>text {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		margin-left: 30upx;
		margin-top: 60upx;
	}

	.cj-center {
		padding: 108upx;
		margin: 0 auto;
		width: 208upx;
		height: auto;
		text-align: center;
		position: relative;
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
		margin-left: -40%;
	}

	.cj-main {
		width: 94%;
		margin: 0 auto;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10upx;

		position: relative;
		top: 30upx;
	}

	.cj-main>.cj-in {
		width: 94%;
		margin: 0 auto;
		padding-top: 30upx;
		box-sizing: border-box;
	}

	.cj-in>image {
		width: 72upx;
		height: 30upx;
		display: block;
	}

	.cj-in>view {
		width: 100%;
		height: 68upx;
		margin-top: 30upx;
		display: flex;
		justify-content: space-between;
	}

	.cj-in>view>.cj-left {
		width: 30%;
		height: 100%;

	}

	.cj-in>view>.cj-left>image {
		width: 48upx;
		height: 48upx;
	}

	.cj-in>view>.cj-left>text {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		margin-left: 20upx;
		position: relative;
		top: -12upx;
	}

	.cj-in>view>.cj-right {
		width: 110upx;
		height: 100%;
		text-align: center;
		border-bottom: 2upx dashed rgba(246, 221, 0, 1);

	}

	.cj-in>view>.cj-right>image {
		width: 40upx;
		height: 40upx;

	}
</style>
