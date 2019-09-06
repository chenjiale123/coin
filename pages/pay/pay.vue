<template>
	<view class="content">
		<view class="cj-top">
			<view class="cj-first">
				<image src="../../static/image/returnhhh@2x.png" mode="" @click="back"></image>
				<text class="cj-title">充值</text>
				<text class="cj-mom" @click="record">充值记录</text>
			</view>
			<view class="cj-center">
				<text class="cj-txt2">余额钱包（USDT）</text>
				<text class="cj-txt3">{{balance.usdt_balance}}</text>
			</view>



		</view>
		<view class="cj-main">
			<view class="cj-in">
				<view class="jihuo">
					<view class="cj-left">
						<text v-if="balance.status==0">账户状态:未激活</text>
						<text v-else>账户状态:已激活</text>
					</view>
					<view class="cj-right">
						<button v-if="balance.status==0" v-on:click="activate">激活账户</button>
					</view>
				</view>

				<form>
					<view class="area">


						<view class="cj-left">
							<text>请输入充值的US数</text>
							<input v-model="params.pay_usdt" type="text" value="" placeholder="请输入数量" class="num" />
							<text>密码</text>
							<input type="password" v-model="params.pay_pass" value="" placeholder="请输入密码" class="pwd" />

						</view>
						<view class="cj-right">
							<text>支付方式</text>
							<select class="way">
								<option value="USDT">USDT</option>
							</select>
							<text class="tishi" style="color: color:#F93251;">USDT支付方式为ERC2.0</text>
							<text class="ma" style="margin-top: 73upx;">附加码：{{params.append_num}}</text>
						</view>
					</view>
					<text class="txt">备注</text>
					<textarea value="" v-model="params.remark" placeholder="想要说点什么..." class="beizhu" />
					<button class="pay" v-on:click="doSubmit" >充值</button>
				</form>
			</view>
		</view>
		<view class="cj-final" v-if="recharge!==null">
			<view class="cj-in">
				<view class="list">
					<view class="cj-left">
						<text>
                            需要支付 {{recharge.pay_usdt}}USDT                      
                        </text>
						<text>到账金额：{{recharge.get_usdt}}</text>
						<text style="color:#FFD666 ;margin-top: 30upx;">充值地址：</text>
						<text style="color:#FFD666 ;" @click="copy">
                            {{recharge.coin_pay}}
                        </text>
						<text style="margin-top: 30upx;">{{recharge.create_time}}</text>
					</view>
					<view class="cj-right">
						  <text v-if="recharge.status==0">待审核</text>
						                    <text v-if="recharge.status==1">已完成</text>
						                    <text v-if="recharge.status==2">撤销</text>
						<view class="code">
							<text>充值二维码</text>
							<view class="erweima">
								<image  :src="imgUrl+recharge.coin_qrcode" mode=""></image>
							</view>
						</view>
					</view>
				
				</view>
				<text>{{recharge.remark}}</text>
				<text v-if="recharge.status==0" @click="cancel($event,recharge)" style="text-align: center;">撤销</text>
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
				    },
					balance :{
					        usdt_balance: '',
					        status: ''
					    },
						params : {
						   uid: uni.getStorageSync("uid"),
						   token: uni.getStorageSync("token"),
						        append_num: Math.ceil(Math.random() * 1000000),
						        pay_usdt: '',
						        pay_pass: '',
						        remark: ''
						    },
							recharge : {},
							imgUrl:this.qiniu,
							attr:""
			}
		},
			
		onLoad(){
			   this.lastRecharge();
			            this.initInfo();
		},
			
		methods:{
				
			copy:function(){
				uni.setClipboardData({
					data:this.recharge.coin_pay ,
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
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			lastRecharge:function () {
			              let _this=this
			              uniRequest.post('/api/capital/index', _this.model)
			              	.then(function(response) {
			              		console.log(response.data);
								
			              	_this.recharge = response.data.data
			       
			              	              
			              
			              	})
			              	.catch(function(error) {
			              		console.log(error);
			              	});
			            },
			     cancel: function(event, item) {
			                this.model.id = item.id;

			let _this=this
			uniRequest.post('/api/capital/recharge_cancel', _this.model)
				.then(function(response) {
					console.log(response);
				   if (response.data.status == true) {
				                       uni.showModal({
				                       	title: '提示',
				                       content: response.data.message,
				                       	success: function(res) {
				                        _this.lastRecharge(); 
				                     }
				                       			           			});
				                    }else{
										uni.showToast({
											title:res.data.message,
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
			           let _this=this
			           uniRequest.post('/api/capital/recharge', _this.params)
			           	.then(function(response) {
			           		console.log(response);
			           		if(response.data.status==true){
			           			uni.showModal({
			           				title: '提示',
			           				content: response.data.message,
			           				success: function(res) {
			           					uni.navigateTo({
			           						url: '/pages/pay/pay',
			           						success: res => {},
			           						fail: () => {},
			           						complete: () => {}
			           					});
			           				}
			           			});
			           		}else{
								if(response.data.code==202){
									uni.showModal({
										title: '提示',
										content: response.data.message,
										success: function(res) {
											uni.navigateTo({
												url: '/pages/set_pwd/set_pwd',
												success: res => {},
												fail: () => {},
												complete: () => {}
											});
										}
									});
								}
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
			
			
			
			
			activate:function () {
			            let _this=this
			            uniRequest.post('/api/capital/activate', _this.model)
			            	.then(function(response) {
			            		console.log(response);
								if(response.data.status==true){
									uni.showModal({
										title: '提示',
										content: response.data.message,
										success: function(res) {
											uni.navigateTo({
												url: '/pages/pay/pay',
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
			            },
			
			initInfo: function() {
					 let _this=this
							uniRequest.get('/api/user/index?uid='+_this.params.uid+'&token='+_this.params.token)
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
					 	                                     _this.balance = response.data.data;
					 	                                 } 
					 
					 	})
					 	.catch(function(error) {
					 		console.log(error);
					 	});
					 
				 },
				
			record:function(){
				uni.navigateTo({
					url: '/pages/pay_record/pay_record',
					success: res => {},
					fail: () => {},
					complete: () => {}
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
	}
	.cj-first{
		width: 94%;
		display: flex;
		justify-content: space-between;
		margin: 60upx auto;
	}
	.cj-first>image{
		width: 68upx;
		height: 40upx;
	}
	.cj-first>.cj-title{
		font-size:38upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.cj-first>.cj-mom{
		font-size:26upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);

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
		width: 94%;
		height:632upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 10px 0px rgba(51,51,51,0.05);
		border-radius:10px;
		margin: 0 auto;
		position: relative;
		top: -80upx;
	}
	.cj-in{
		width: 94%;
		margin: 0 auto;
		padding-top: 30upx;
		box-sizing: border-box;
	}
	.jihuo{
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 50upx;
		border-bottom: 1px dashed #FFD666;
	}
	.jihuo>.cj-left>text{
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.jihuo>.cj-right>button{
		width:128upx;
		height:48upx;
		border:1px solid rgba(249,50,81,1);
		border-radius:24upx;
		font-size:22upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(249,50,81,1);
		line-height: 48upx;
		text-align: center;
	}
	form{
		width: 100%;
		height: 300upx;
		display: block;
		padding-top: 30upx;
		box-sizing: border-box;
	}
	.area{
		width: 100%;;
		height: 220upx;
		display: flex;
		justify-content: space-between;
	}
	.area>.cj-left>text{
		display: block;
		font-size:22upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
		.area>.cj-left>.num{
			display: block;
			width:280upx;
			height:48upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 40px 0px rgba(51,51,51,0.08);
			border-radius:24upx;
			margin-bottom: 50upx;
		}
		.area>.cj-left>.num[placeholder]{
			font-size:26upx;
			font-family:PingFang SC;
			font-weight:500;
			padding-left: 14upx;
			box-sizing: border-box;
			/* color:rgba(204,204,204,1); */
		}
		.area>.cj-left>.pwd{
			display: block;
			width:280upx;
			height:48upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 40px 0px rgba(51,51,51,0.08);
			border-radius:24upx;
			margin-bottom: 50upx;
		}
		.area>.cj-left>.pwd[placeholder]{
			font-size:26upx;
			font-family:PingFang SC;
			font-weight:500;
			padding-left: 14upx;
			box-sizing: border-box;
			/* color:rgba(204,204,204,1); */
		}
		.area>.cj-right>text{
			display: block;
			font-size:22upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(153,153,153,1);
		}
		.area>.cj-right>.way{
			width:280upx;
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
		.txt{
			display: block;
			font-size:22upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(153,153,153,1);
		}
		.beizhu{
			display: block;
			width:100%;
			height:98upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 40px 0px rgba(51,51,51,0.08);
			border-radius:24upx;
		}
		.beizhu[placeholder]{
			font-size:26upx;
			font-family:PingFang SC;
			font-weight:500;
			padding-left: 14upx;
			box-sizing: border-box;
			/* color:rgba(204,204,204,1); */
		}
		.pay{
			width:280upx;
			height:60upx;
			background:rgba(255,214,102,1);
			box-shadow:0px 4px 6px 0px rgba(255,214,102,0.5);
			border-radius:30upx;
			display: block;
			margin: 0 auto;
			margin-top:60upx ;
			font-size:32upx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
			text-align: center;
			line-height: 60upx;
		}
		.cj-final{
			width: 94%;
			height:392upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 10px 0px rgba(51,51,51,0.05);
			border-radius:10px;
			margin: 0 auto;
			position: relative;
			top: -50upx;

		}
		.list{
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 255upx;
		}
		.list>.cj-left{
			width: 70%;
			height: 100%;
			
		}
		.list>.cj-right{
			width: 20%;
				height: 100%;
		}
		.list>.cj-left>text{
			display: block;
			font-size:22upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			word-wrap:break-word;
		}
		.list>.cj-right>text{
			display: block;
			font-size:22upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(249,50,81,1);
			margin-bottom: 50upx;
		}
		.list>.cj-right>.code{
			width:128upx;
			height:138upx;
		}
		.list>.cj-right>.code>text{
			display: block;
			font-size:22upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		.list>.cj-right>.code>.erweima{
			width:118upx;
			height:118upx;
			border:3px solid rgba(51,51,51,1);
			border-radius:10upx;
		}
		.list>.cj-right>.code>.erweima>image{
			width:98upx;
			height:98upx;
			display: block;
			margin: 10upx auto 0 auto;
		}
		.cj-in>text{
			display: block;
			margin-top: 20upx;
			font-size:22upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
</style>
