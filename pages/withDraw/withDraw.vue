<template>
	<view class="content">
		<view class="cj-top">

		</view>
		<view class="cj-main">
			<view class="cj-in">
				<view class="cj-left">
					<image src="../../static/image/team@2x.png" mode=""></image>
					<text>
						已激活团队成员: {{model.active_count}}
					</text>
					<text>团队佣金总收益: {{model.free_coin}}</text>
				</view>
				<view class="cj-right">
					<button @click="resiger">团队注册</button>
				</view>
			</view>
		</view>
		<view class="cj-list" v-for="(item,index)  in team">
			<view class="cj-in">
				<view class="cj-li">
					<view class="cj-left">
						<text>账号: {{item.phone}}</text>
						<text>姓名: {{item.real_name}}</text>
						<text class="etc" v-if="item.status==0" style="color: #FFD666;">账号: 未激活</text>
						                            <text class="etc" v-if="item.status==1" style="color: #FFD666;">账号: 已激活</text>
						<text>PO点: {{item.rate}}</text>
					</view>
					<view class="cj-right">
						  <button v-if="item.status==0" v-on:click="doActive(item.uid,index)" >激活</button>
					
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
					phone: '',
					status: '',
					active_count: 0,
					for_uid: 0
				},
				param: {
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token"),
				},
				team: []
			}
		},

		onShow() {
			this.initData();
		},

		methods: {
			initData: function() {
				let _this = this
				uniRequest.get("/api/user/team?uid="+_this.param.uid+"&token="+_this.param.token)
					.then(function(response) {
						console.log(response);
						if (response.data.status == true) {
							_this.model.vip = response.data.data.member.vip;
							_this.model.phone = response.data.data.member.phone;
							_this.model.active_count = response.data.data.member.active_count;
							_this.model.free_coin = response.data.data.member.free_coin;
							_this.team = response.data.data.team;
						}


					})
					.catch(function(error) {
						console.log(error);
					});

			},
			doActive: function(uid,index) {
				console.log(uid,index);
				// var _this = $(event.currentTarget);
				// var for_uid = item.uid;
				this.model.for_uid = uid;

				let _this = this
				uniRequest.post("/api/user/active", _this.model)
					.then(function(response) {
						console.log(response);
						if (response.data.status == true) {
							uni.showModal({
								title: '提示',
								content: response.data.message,
								success: function(res) {
									item.status = 1
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


			resiger: function() {
				uni.navigateTo({
					url: '/pages/resiger/resiger',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		
		}

	}
</script>

<style>
	.content {
		background: rgba(249, 249, 249, 1);
	}

	.cj-top {
		width: 100%;
		height: 370upx;
		background: rgba(255, 214, 102, 1);
	}

	.cj-main {
		width: 94%;
		height: 240upx;
		margin: 0 auto;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10upx;

		position: relative;
		top: -100upx;
	}

	.cj-in {
		width: 94%;
		margin: 0 auto;
		padding-top: 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.cj-in>.cj-left {
		width: 40%;
		height: auto;

	}

	.cj-in>.cj-left>image {
		width: 144upx;
		height: 30upx;
		margin-bottom: 20upx;
	}

	.cj-in>.cj-left>text {
		display: block;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		margin-bottom: 20upx;
	}

	.cj-in>.cj-right {
		width: 168upx;
		height: auto;
	}

	.cj-in>.cj-right>button {
		margin-top: 100upx;
		width: 168upx;
		height: 48upx;
		background: rgba(255, 214, 102, 1);
		border-radius: 24upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 48upx;
		text-align: center;
	}

	.cj-list {
		width: 94%;
		height: auto;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10px;
		position: relative;
		top: -100upx;
		margin: 0 auto;
		margin-top: 30upx;
	}

	.cj-li {
		width: 100%;
		height: 224upx;
		border-bottom: 2upx dashed rgba(246, 221, 0, 1);
		display: flex;
		justify-content: space-between;
	}

	.cj-li>.cj-left {
		width: 70%;
		height: 100%;
	}

	.cj-li>.cj-left>text {
		display: block;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		margin-bottom: 15upx;
	}

	.cj-li>.cj-right {
		width: 148upx;
		height: 100%;
	}

	.cj-li>.cj-right>button {
		width: 100%;
		height: 60upx;
		background: rgba(255, 214, 102, 1);
		box-shadow: 0px 4px 6px 0px rgba(255, 214, 102, 0.5);
		border-radius: 30upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 60upx;
		text-align: center;
		margin-bottom: 40upx;
	}
</style>
