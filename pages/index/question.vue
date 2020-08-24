
<template>
	<view class="question-content">
		<view class="question-item" v-for="(item,index) in questions" :key="index">
			<view class="title">{{item.title}}</view>
			<question-item v-for="(it,idx) in item.question" :question.sync="it" :key="idx"></question-item>
		</view>
	</view>
</template>

<script>
	import { get, post } from '../../libs/request.js';
	import questionItem from "../../components/questionItem.vue";
	import {BASE_URL} from "../../config/index.js"
	export default {
		data() {
			return {
				questions:[]
			};
		},
		created(){
			this.getData()
		},
		components:{
			questionItem
		},
		methods:{
			changeItem(item){
				
			},
			getData(){
				post(`user/proble`).then(res => {
					if (res.code === 200) {
						this.questions = res.data.questions
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.question-content{
	margin: 0 40rpx;
	.question-item{
		margin-bottom: 20rpx;
		.title{
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 2rpx solid #DFDFDF;
			font-size: 32rpx;
			color: #333333;
		}
		
	}
}
</style>
