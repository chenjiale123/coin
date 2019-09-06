<template>
	<view class="content">
		<view class="cj-top">
			<image src="../../static/image/returnhhh@2x.png" mode="" @click="back"></image>
			<text>设置二级密码</text>
		</view>
		<view class="cj-main">
			<view class="cj-in">
				<form>
				
					<text>原二级密码</text>
					<input type="text" value="" placeholder="请输入密码（初次设置不必填写）"  v-model="model.pay_pass" class="old"/>
					<text>新密码</text>
					<input type="text" value="" placeholder="请输入密码" v-model="model.new_pay_pass" class="new"/>
					<text>确认密码</text>
					<input type="text" value="" placeholder="请再次输入密码" v-model="model.check_pay_pass" class="sure"/>
				
					
					<button  v-on:click="doSubmit">确定</button>
				</form>
			</view>
		
		</view>
	</view>
</template>

<script>
		import uniRequest from 'uni-request';
	export default{
			
				
			
		data(){
			return{
				model : {
				       uid: uni.getStorageSync("uid"),
				             token: uni.getStorageSync("token"),
				        pay_pass:'',
				        new_pay_pass:'',
				        check_pay_pass:''
				    }
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
				   	let _this=this
			            uniRequest.post('/api/user/second', _this.model)
			            	.then(function(response) {
			            		console.log(response);
			            uni.showToast({
			            	title:response.data.message,
							duration:3000,
							icon:"none"
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
	.content{
			background:rgba(249,249,249,1);
		}
		.cj-top{
			width:100%;
			height:410upx;
			background:rgba(255,214,102,1);
			overflow: hidden;
			text-align: center;
			position: relative;
		}
		.cj-top>image{
			position: absolute;
			width: 68upx;
			height: 40upx;
			left: 30upx;
			top: 60upx;
		}
		.cj-top>text{
			font-size:38upx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
			display: block;
			
			margin-top: 60upx;
		}
		.cj-center{
			padding: 38upx;
			margin: 0 auto;
			width: 208upx;
			height: auto;
		}
		.cj-center>.cj-txt2{
			display: block;
			font-size:24upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		.cj-center>.cj-txt3{
			font-size:58upx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
		}
		.cj-main{
			width:94%;
			height:588upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 10px 0px rgba(51,51,51,0.05);
			border-radius:10px;
			margin: 0 auto;
			position: relative;
			top: -50upx;
		}
		.way{
			width:100%;
			height:48upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 40px 0px rgba(51,51,51,0.08);
			border-radius:24upx;
			background: url(../../static/image/logotxxx@2x.png) no-repeat;
			background-size: 28upx 24upx;
			background-position: 12upx 12upx;
			font-size:26upx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
			padding-left: 40upx;
		}
		.cj-main text{
			display: block;
			font-size:22upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(153,153,153,1);
			margin-bottom: 20upx;
			margin-top: 30upx;
		}
		.old{
			width:100%;
			height:48upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 40px 0px rgba(51,51,51,0.08);
			border-radius:24upx;
		}
		.old[placeholder]{
			padding-left: 30upx;
			box-sizing: border-box;
		}
		.new{
			width:100%;
			height:48upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 40px 0px rgba(51,51,51,0.08);
			border-radius:24upx;
		}
		.new[placeholder]{
			padding-left: 30upx;
			box-sizing: border-box;
		}
		.sure{
			width:100%;
			height:48upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 40px 0px rgba(51,51,51,0.08);
			border-radius:24upx;
		}
		.sure[placeholder]{
			padding-left: 30upx;
			box-sizing: border-box;
		}
	
		button{
			margin: 0 auto;
			margin-top: 80upx;
			display: block;
			width:280upx;
			height:60upx;
			background:rgba(255,214,102,1);
			box-shadow:0px 4px 6px 0px rgba(255,214,102,0.5);
			border-radius:30upx;
			font-size:32upx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
			text-align: center;
			line-height: 60upx;
		}
		
</style>
