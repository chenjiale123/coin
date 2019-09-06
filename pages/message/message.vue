<template>
	<view class="content">
		<view class="cj-top">
			<image src="../../static/image/returnhhh@2x.png" mode="" @click="back"></image>
			<text>系统消息</text>
		</view>
		<view class="cj-main">
			<view class="list" v-for="(item,index)  in lists">
				<view class="cj-in">
					<view class="in">
						<view class="cj-left">
							<text>{{item.title}}</text>
						</view>
						<view class="cj-right">
							<text>{{item.create_time}}</text>
						</view>
					</view>
					<text>{{item.content}}</text>
				</view>
			</view>
			<text @click="loadMore">加载更多</text>
		</view>
		
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
				loadData: true
			}
		},

		onLoad() {
			this.initList()
		},

		methods: {
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
				uniRequest.post('/api/user/message', _this.params)
					.then(function(response) {
						console.log(response);
						_this.lists = (response.data.data.lists == undefined) ? _this.lists : _this.lists.concat(response.data.data.lists);
						_this.total = (response.data.data.total == undefined) ? _this.total : response.data.data.total;
						_this.current = (response.data.data.current == undefined) ? _this.current : response.data.data.current;
						_this.count = (response.data.data.count == undefined) ? _this.count : response.data.data.count;
						_this.size = (response.data.data.size == undefined) ? _this.size : response.data.data.size;
						// _this.lists = _this.lists.concat(_this.lists)
						console.log(_this.lists)

					})
					.catch(function(error) {
						console.log(error);
					});

				// this.lists = this.lists.concat(this.lists)

			},
			 loadMore: function() {
			                this.current = Number(this.current) + 1;
			                console.log(this.current)
			                this.initList(this.current)
			
			            }
		}

	}
</script>

<style>
	.content {
		background: rgba(249, 249, 249, 1);
	}
	.cj-main{
		text-align: center;
	}
.cj-main>text{
	/* display: block; */
	font-size: 20upx;
	margin: 0 auto;
}
	.cj-top {
		width: 100%;
		height: 110upx;

		overflow: hidden;
		text-align: center;
		position: relative;
		background: #fff;
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

	.cj-main {
		width: 94%;
		margin: 0 auto;
	}

	.list {
		width: 100%;
		height: auto;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.05);
		border-radius: 10px;
		margin-bottom: 20upx;
		padding: 20upx 0;
	}

	.in {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.cj-left>text {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(102, 102, 102, 1);
	}

	.cj-right>text {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.cj-in>text {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(153, 153, 153, 1)
	}
</style>
