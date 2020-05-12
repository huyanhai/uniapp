import { BASE_URL,TIMEOUT,HEADER } from "../config/index.js"

export function get(url,data) {
	let authCode = String(uni.getStorageSync("authCode"))
	return new Promise((resolve, reject)=>{
		uni.showLoading();
		uni.request({
			method: 'GET',
			url:BASE_URL + url,
			header:{
				authCode:authCode
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
	let authCode = String(uni.getStorageSync("authCode"))
	
	return new Promise((resolve, reject)=>{
		uni.showLoading();
		uni.request({
			method: 'POST',
			url:BASE_URL + url,
			timeout:TIMEOUT,
			header:{
				authCode:authCode
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