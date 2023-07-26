<template>
	<view class="content">
	</view>
</template>

<script>
	export default {
		data () {  
				return {  
		        wv: null,  
		        canBack: false
		      }  
		    },  
		    onLoad(_) {  
					const params = {
						url: 'https://hot.imsyy.top/#/',
						title: 'SPEED TIME',
					}
					console.log('params', params)
		      if (!params.url) {  
		        return  
		      }  
		      if (params.title) {  
		        uni.setNavigationBarTitle({  
		          title: params.title  
		        })  
		      }  
		
		      // #ifdef APP-PLUS  
		      const url = params.url  
		      const wv = plus.webview.create("", "custom-webview", {  
		        plusrequire: "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止  
		        'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突  
		        top: uni.getSystemInfoSync().statusBarHeight + 44 //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值  
		      })  
		      wv.loadURL(url)  
		
		      const currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()  
		      currentWebview.append(wv); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭  
		
		      const self = this  
		      wv.addEventListener('loaded', e => {  
		        wv.canBack(e => {  
		          self.canBack = e.canBack  
		          currentWebview.setTitleNViewButtonStyle(0, {  
		            color: e.canBack ? '#000' : '#fff',    
		          });  
		        })  
		      })  
		      this.wv = wv  
		      // #endif  
		    },  
		    onBackPress(e) {  
		      if (e.from === 'navigateBack') {    
		        return false  
		      }  
		      // #ifdef APP-PLUS  
		      if (this.wv && this.canBack) {  
		        this.wv.back()  
		        return true  
		      }  
		      // #endif  
		    },  
		    onNavigationBarButtonTap (e) {  
		      uni.navigateBack()  
		    }
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
