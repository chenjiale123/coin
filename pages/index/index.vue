<template>
	<view class="content">
		<image src="../../static/image/logo@2x.png" mode="" class="logo"></image>

		<form>


			<input type="text" value="" placeholder="请输入账号" class="phone" v-model="model.phone" />



			<input type="password" value="" placeholder="请输入密码" v-model="model.password" class="pwd" />

			<view class="login">
				<button type="button" v-on:click="doSubmit">
					<image src="../../static/image/forward@2x.png"></image>
				</button>
				<text>登录</text>
			</view>
		</form>
		<image src="../../static/image/bj@2x.png" mode="" class="bj"></image>
	</view>

</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data() {
			return {
				title: 'Hello',
			 model : {
				        phone:'',
				        password:''
				    }
			}
		},
		onLoad() {
          this.initRemember()
		},
		methods: {
 
 
			initRemember: function() {
				var _this=this
				uniRequest.get('/api/index/remember')
				    .then(function (response) {
				      _this.model = response.data.data;
				    })
				    .catch(function (error) {
				        console.log(error);
				    });
			},

			doSubmit: function() {
				var _this=this
				uniRequest.post('/api/index/login',_this.model)
				
				    .then(function (response) {
						  console.log(response);
						 if (response.data.status==true){
							console.log(response.data.data.uid);
							 uni.setStorageSync("uid",response.data.data.uid);
							 uni.setStorageSync("token",response.data.data.token);
							uni.showToast({
							    title: response.data.message,
							    duration: 2000
							});
							uni.switchTab({
								url: '../main/main',
								success: response => {},
								fail: () => {},
								complete: () => {}
							});
						 }else{
							 uni.showToast({
							     title: response.data.message,
							     duration: 2000,
								 icon:"none"
							 });
						 }
				       
				    })
				    .catch(function (error) {
				        console.log(error);
				    });
				
				
				
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
		background: #fff;
		overflow: hidden;
		position: relative;
	}

	.content>.logo {
		display: block;
		width: 240upx;
		height: 204upx;
		margin: 0 auto;
		margin-top: 168upx;
	}

	.content>form {
		display: block;
		width: 90%;
		height: auto;
		margin: 180upx auto 0 auto;
	}

	.phone {
		display: block;
		width: 100%;
		height: 88upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 44rpx;
		position: relative;
		background: url(../../static/image/account@2x.png) no-repeat;
		background-size: 48upx 48upx;
		background-position: 30upx 20rpx;
	}

	.phone[placeholder] {
		/* position: absolute; */
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		/* color: rgba(204, 204, 204, 1); */
		line-height: 48rpx;
		padding-left: 108upx;
		box-sizing: border-box;
		/* left: 108upx; */
	}

	.pwd {
		margin-top: 60upx;
		display: block;
		width: 100%;
		height: 88upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 44rpx;
		position: relative;
		background: url(../../static/image/account@2x.png) no-repeat;
		background-size: 48upx 48upx;
		background-position: 30upx 20rpx;
	}

	.pwd[placeholder] {
		/* position: absolute; */
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		/* color: rgba(204, 204, 204, 1); */
		line-height: 48rpx;
		padding-left: 108upx;
		box-sizing: border-box;
		/* left: 108upx; */
	}

	.login {
		margin-top: 208upx;
		width: 40%;
		height: 60upx;
		float: right;
		line-height: 60rpx;
		clear: both;
	}

	.login>text {
		font-size: 32upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 60upx;
		margin-right: 32upx;
		float: right;
	}

	.login>button {
		/* display: inline-block; */
		float: right;
		width: 108upx;
		height: 60upx;
		background: rgba(255, 214, 102, 1);
		box-shadow: 0px 4px 6px 0px rgba(255, 214, 102, 0.5);
		border-radius: 30upx;

		text-align: center;
		position: relative;
	}

	.login>button>image {
		display: block;
		position: absolute;
		top: 50%;
		margin-top: -20upx;
		left: 50%;
		margin-left: -34upx;
		width: 68upx;
		height: 40upx;


	}

	.bj {
		position: absolute;
		left: 0;
		height: 410upx;
		width: 100upx;
		bottom: 0;
	}
</style>
