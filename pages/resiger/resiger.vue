<template>
	<view class="content">
		<image src="../../static/image/returnhhh@2x.png" mode="" class="return" v-on:click="back"></image>
		
		<view class="cj-title">
			<text class="cj-txt">注册好友</text>
			<text class="cj-txt1">REGISTERED</text>
		</view>
		<form>
			<input type="text" value="" placeholder="请输入手机号为注册号" class="phone"  v-model="phone" />
				<input type="password" value="" placeholder="登录密码 6-14位" class="pwd" v-model="password" />
					<input type="password" value="" placeholder="确认密码 6-14位" class="pwdTwo"  v-model="repassword" />
						<input type="text" value="" placeholder="请输入昵称" class="name" v-model="real_name" />
						<button v-on:click="doSubmit" >注册</button>
			
		</form>
		<view class="cj-code">
			<view class="ma">
						<image src="../../static/image/dimensional@2x.png" mode=""></image>
			</view>
	
			<text>扫码下载APP</text>
		</view>
			<image src="../../static/image/bj@2x.png" mode="" class="bj"></image>
	</view>
</template>

<script>
		import uniRequest from 'uni-request';
	export default{
			
				
			
		data(){
			return{
				phone:'',
				password:'',
				repassword:'',
				real_name:''
				
			}
		},
			
		onLoad(){
		},
			
		methods:{
			back:function() {
				uni.navigateBack({
					delta: 1
				});
			},
			doSubmit: function() {
				console.log(uni.getStorageSync("uid"));
				uniRequest.post('/api/index/register',{
					  uid: uni.getStorageSync("uid"),
					        token: uni.getStorageSync("token"),
					        phone: this.phone,
					        password: this.password,
					        repassword: this.repassword,
					        real_name: this.real_name
				})
				
				    .then(function (response) {
						  console.log(response);
						 if (response.status==true){
							
							uni.showToast({
							    title: response.data.message,
							    duration: 2000
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
.content>.return{
	margin-left: 30upx;
	margin-top: 60upx;
	width: 68upx;
	height: 40upx;
}
.cj-title{
	width: 495upx;
	height: 80upx;
	margin: 0 auto;
	margin-top: 140upx;
	text-align: center;
	
}
.cj-txt1{
	display: block;
	font-size:80upx;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(51,51,51,1);
	opacity:0.1;
	position: relative;
	top: -80upx;
}
.cj-txt{
		display: block;
	font-size:80upx;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(51,51,51,1);
}
form{
	display: block;

	width: 88%;
	height: 500upx;
	margin: 0 auto;
		margin-top: 60upx;
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
	   background: url(../../static/image/password@2x.png) no-repeat;
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
	.pwdTwo {
		margin-top: 60upx;
		display: block;
	    width: 100%;
	    height: 88upx;
	    background: rgba(255, 255, 255, 1);
	    box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
	    border-radius: 44rpx;
	    position: relative;
	   background: url(../../static/image/password@2x.png) no-repeat;
	    background-size: 48upx 48upx;
	    background-position: 30upx 20rpx;
	}
	.pwdTwo[placeholder] {
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
	.name {
		margin-top: 60upx;
		display: block;
	    width: 100%;
	    height: 88upx;
	    background: rgba(255, 255, 255, 1);
	    box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
	    border-radius: 44rpx;
	    position: relative;
	   background: url(../../static/image/nickname@2x.png) no-repeat;
	    background-size: 48upx 48upx;
	    background-position: 30upx 20rpx;
	}
	.name[placeholder] {
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
	button{
		width:280upx;
		height:60upx;
		background:rgba(255,214,102,1);
		box-shadow:0px 4px 6px 0px rgba(255,204,64,0.5);
		border-radius:30upx;
		display: block;
		margin: 60upx auto;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		text-align: center;
		line-height: 60upx;
	}
	.bj{
	    position: absolute;
	    left: 0;
	    height: 410upx;
	    width: 100upx;
	    bottom: 0;
	}
	.cj-code{
		width:180upx;
		height:200upx;
		
		margin: 0 auto;
		margin-top: 180upx;
		text-align: center;
	}
	.ma{
		width:180upx;
		height:180upx;
		border:3px solid rgba(51,51,51,1);
		border-radius:10upx;
			text-align: center;
			line-height: 180upx;
	}
	.ma>image{
		width:160upx;
		height:160upx;
		display: block;
		margin: 0 auto;
		margin-top: 10upx;
	
	}
	.cj-code>text{
		font-size:26upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	
</style>
