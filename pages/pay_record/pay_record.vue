<template>
	<view class="content">
		<view class="cj-top">
			<image src="../../static/image/returnhhh@2x.png" mode="" @click="back()"></image>
			<text>充值记录</text>
		</view>
		<view class="cj-final"  v-for="(item,index)  in lists">
			<view class="cj-in">
				<view class="list">
					<view class="cj-left">
						<text style="font-size:28upx;display: block;margin-bottom: 30upx;font-weight: bold;">USDT充值</text>
						<text>
							充值{{item.pay_usdt}}USDT
						</text>
						<text>
							需要支付{{item.pay_usdt}}USDT
						</text>
						<text>附加码：{{item.append_num}}</text>
						<text>支付方式：USDT转币</text>
						<text style="color:#FFD666 ;margin-top: 30upx;">充值地址：</text>
						<text style="color:#FFD666 ;" @click="copy(item.coin_pay)">
							{{item.coin_pay}}
						</text>
						<text style="margin-top: 30upx;">{{item.create_time}}</text>
						<text> {{item.remark}}</text>
					</view>
					<view class="cj-right">
						<text v-if="item.status==0">待审核</text>
						<text v-if="item.status==1">已完成 </text>
						<text v-if="item.status==2">撤销 </text>
						<view class="code">
						
							<view class="erweima">
								<image :src="imgUrl+item.coin_qrcode" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<text v-if="item.status==0" @click="cancel($event,item,index)" style="text-align: center; font-size: 20upx;margin-top: 70upx;">撤销</text>
			</view>

	
		</view>
	<text class="more" @click='loadMore' v-if="loadData">点击加载更多</text>
		<text class="more" v-else>没有更多了</text>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {



		data() {
			return {
				params: {
					uid: uni.getStorageSync("uid"),
					token: uni.getStorageSync("token"),
					page: 1
				},
				count: 0,
				lists: [], //表格数据
				total: 1, //总页数
				current: 1, //当前页码
				loadData: true,
				imgUrl:this.qiniu
			}
		},

		onLoad() {
			this.initList()
		},

		methods: {
			copy:function(e){
				uni.setClipboardData({
					data:e ,
					success: function(data) {
						console.log(data);
						uni.showToast({
							title: '复制成功'
						});
					},
					fail: function(err) {},
					complete: function(res) {}
				})
				console.log(e);
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			initList: function(page) {

				//如果page存设置页数
				if (page != undefined) {
					this.params.page = page;
				}

				var _this = this;
				uniRequest.post('/api/capital/recharge_record', _this.params)
					.then(function(response) {
						console.log(response);
						if (response.data.data.lists.length == 0) {
							_this.loadData = false;
							console.log("555");
							return false;
						}
						console.log(_this.loadData);
						_this.lists = (response.data.data.lists == undefined) ? _this.lists : _this.lists.concat(response.data.data.lists);
						_this.total = (response.data.data.total == undefined) ? _this.total : response.data.data.total;
						_this.current = (response.data.data.current == undefined) ? _this.current : response.data.data.current;
						_this.count = (response.data.data.count == undefined) ? _this.count : response.data.data.count;
						_this.size = (response.data.data.size == undefined) ? _this.size : response.data.data.size;


					})
					.catch(function(error) {
						console.log(error);
					});

			},
			cancel: function(event, item) {
				this.model.id = item.id;

				let _this = this
				uniRequest.post('/api/capital/recharge_cancel', _this.model)
					.then(function(response) {
						console.log(response);
						if (response.data.status == true) {
							uni.showModal({
								title: '提示',
								content: response.data.message,
								success: function(res) {
									item.status = 2
								}
							});
						} else {
							uni.showToast({
								title: res.data.message,
								duration: 3000,
								icon: "none"
							})
						}



					})
					.catch(function(error) {
						console.log(error);
					});
			},
			loadMore: function() {
				this.current = Number(this.current) + 1;
				this.initList(this.current);
			}

		}

	}
</script>

<style>
	.content>.more{
		display: block;
		position: absolute;
		bottom: 00upx;
		left: 40%;
		font-size: 20upx;
		z-index: 999;
		
	}
	.content {
		background: rgba(249, 249, 249, 1);
		overflow: auto;
	}

	.cj-in {
		width: 94%;
		margin: 0 auto;
		padding-top: 30upx;
		box-sizing: border-box;
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

	.cj-final {
		width: 94%;
		height: 521upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10px;
		margin: 0 auto;
		position: relative;
		top: -250upx;
		margin-bottom: 30upx;
	}

	.list {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 345upx;
		
	}

	.cj-left {
		width: 70%;
		height: 100%;

	}

	.cj-right {
		width: 20%;
		height: 100%;
	}

	.cj-left>text {
		display: block;
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		word-wrap: break-word;
	}

	.cj-right>text {
		display: block;
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(249, 50, 81, 1);
		margin-bottom: 50upx;
	}

	.cj-right>.code {
		width: 128upx;
		height: 138upx;
	}

	.cj-right>.code>text {
		display: block;
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.cj-right>.code>.erweima {
		width: 118upx;
		height: 118upx;
		border: 3px solid rgba(51, 51, 51, 1);
		border-radius: 10upx;
	}

	.cj-right>.code>.erweima>image {
		width: 98upx;
		height: 98upx;
		display: block;
		margin: 10upx auto 0 auto;
	}

	.cj-in>text {
		display: block;
		margin-top: 50upx;
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.cj-ready {
		width: 94%;
		height: 314upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10px;
		margin: 0 auto;
		position: relative;
		top: -220upx;
	}
</style>
