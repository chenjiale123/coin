<template>
	<view class="content">
		<view class="cj-top">
			<view class="cj-top">
				<image src="../../static/image/returnhhh@2x.png" mode="" @click="back"></image>
				<text>身份认证</text>
			</view>




		</view>
		<view class="cj-main">
			<view class="cj-in">
			

					<text>真实姓名:</text>
					<input type="text" value="" placeholder="请输入您的真实姓名" v-model="model.real_name" class="name" />
					<text>预留手机:</text>
					<input type="text" value="" placeholder="请输入预留手机号" v-model="model.phone" class="phone" />
					<text>证件号码:</text>
					<input type="text" value="" placeholder="输入证件号码" v-model="model.id_card" class="card" />
					<text>收币地址:</text>
					<input type="text" value="" placeholder="填写USDT收币地址" v-model="model.coin_get" class="address" />
					<text>发币地址:</text>
					<input type="text" value="" placeholder="填写USDT发币地址" v-model="model.coin_send" class="address1" />
					<text style="color: #F93251;">二级密码</text>
					<input type="text" value="" placeholder="如还未设置二级密码，则不用填写" v-model="model.pay_pass" class="pwd2" />

					<view class="upload">
						<view class="cj-left">
							<view value="" class="positive"   >
								<image  :src="imgUrl+model.face_src" :data-src="qiniu+model.face_src"></image>
							</view>
							<button @click="upload"  :disabled="disabled">上传正面</button>
						</view>
						<view class="cj-right">
							<view value="" class="opptive">
									<image :src="imgUrl+model.back_src" :data-src="qiniu+model.back_src"></image>
							</view>
							<button  :disabled="dis"  @click="upload1">上传反面</button>
						</view>
					</view>
					<text style="color: #F93251; font-size: 20upx;"> 请点击上传身份证正反面，用于生成聚合码</text>
					<button @click="doSubmit">保存</button>
				
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
					real_name: '',
					phone: "",
					id_card: '',
					coin_get: '',
					coin_send: "",
					
					face_src:'',
					back_src:'',
			pay_pass: '',
				},
				
					disabled:false,
					dis:false,
				params: {
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token"),
				},
				imgUrl:this.qiniu
			}
		},

		onLoad() {
			this.initInfo()
		},

		methods: {
			doSubmit: function() {
				 let _this = this;
				 	uniRequest.post('/api/user/info', {
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token"),
					real_name: _this.model.real_name,
					phone: _this.model.phone,
					id_card:_this.model.id_card ,
					coin_get: _this.model.coin_get,
					coin_send: _this.model.coin_send,
					
					face_src:_this.model.face_src,
					back_src:_this.model.back_src,
			pay_pass: _this.model.pay_pass,
				})
				 		.then(function(response) {
							console.log(response);
				          uni.showToast({
				          	title:response.data.message,
							 duration: 2000,
							 icon:"none"
				          })
				 		})
				 		.catch(function(error) {
				 			console.log(error);
				 		});
				 
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			upload: function() {
				var _this=this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res);
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: _this.qiniu+'api/upload/image',
							filePath: tempFilePaths[0],
							name: 'file',
							
							success: function(uploadFileRes) {
								console.log(uploadFileRes);
								var json= eval('(' + uploadFileRes.data + ')')
								_this.model.face_src=json.data.path
								console.log(json.data.path)
								_this.disabled=true
							}
						});


					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			upload1: function() {
				var _this=this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res);
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: _this.qiniu+'api/upload/image',
							filePath: tempFilePaths[0],
							name: 'file',
							
							success: function(uploadFileRes) {
								console.log(uploadFileRes);
								var json1= eval('(' + uploadFileRes.data + ')')
								_this.model.back_src=json1.data.path
								console.log(json1.data.path)
								_this.dis=true
							}
						});
			
			
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			initInfo: function() {
				let _this = this;
				uniRequest.get('/api/user/info?uid='+ _this.params.uid+'&token='+ _this.params.token)
					.then(function(response) {
						console.log(response);
						_this.model = response.data.data;
						_this.model.pay_pass = '';
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
		text-align: center;
		position: relative;
	}

	.cj-top>image {
		position: absolute;
		width: 68upx;
		height: 40upx;
		left: 30upx;
		top: 60upx;
	}

	.cj-top>text {
		font-size: 38upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		display: block;

		margin-top: 60upx;
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
		height: 1150upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10px;
		margin: 0 auto;
		position: relative;
		top: -250upx;
	}

	.cj-main text {
		display: block;
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);

		margin-top: 30upx;
	}

	.name {
		width: 100%;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24upx;
	}

	.name[placeholder] {
		padding-left: 30upx;
		box-sizing: border-box;
	}

	.card {
		width: 100%;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24upx;
	}

	.card[placeholder] {
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

	.phone {
		width: 100%;
		height: 48upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40px 0px rgba(51, 51, 51, 0.08);
		border-radius: 24upx;
	}

	.phone[placeholder] {
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

	.upload {
		margin-top: 40upx;
		display: flex;
		justify-content: space-between;
	}

	.upload .positive {
		display: block;
		width: 300upx;
		height: 200upx;
		background: url(../../static/image/positive@2x.png);
		background-size: contain;
	}

	.upload .opptive {
		display: block;
		width: 300upx;
		height: 200upx;
		background: url(../../static/image/reverse@2x.png);
		background-size: contain;
	}
		.upload image{
			width: 100%;
			height: 100%;
		}


	.cj-in>button {
		margin: 0 auto;
		margin-top: 40upx;
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
	.upload button{
		width: 200upx;
		height: 40upx;
		margin: 0 auto;
		display: block;
		background: rgba(255, 214, 102, 1);
		box-shadow: 0px 4px 6px 0px rgba(255, 214, 102, 0.5);
		border-radius: 20upx;
		font-size: 20upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		line-height: 40upx;
		margin-top: 10upx;
	}
</style>
