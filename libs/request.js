import { BASE_URL,TIMEOUT,HEADER } from "../config/index.js"

export function get(url,data) {
	return new Promise((resolve, reject)=>{
		uni.showLoading();
		uni.request({
			method: 'GET',
			url:BASE_URL + url,
			header:{
				authCode:String(HEADER)
			},
			timeout:TIMEOUT,
			success:function(res){
				resolve(res.data);
			},
			fail:function(err){
				uni.showToast({
					title:err.msg,
					icon: 'none'
				})
				reject(err);
			},
			complete:function(){
				uni.hideLoading();
			}
		})
	})
}

export function post(url,data) {
	return new Promise((resolve, reject)=>{
		uni.showLoading();
		uni.request({
			method: 'POST',
			url:BASE_URL + url,
			timeout:TIMEOUT,
			header:{
				authCode:String(HEADER)
			},
			data:data,
			success:function(res){
				resolve(res.data);
			},
			fail:function(err){
				uni.showToast({
					title:err.msg,
					icon: 'none'
				})
				reject(err);
			},
			complete:function(){
				uni.hideLoading();
			}
		})
	})
}