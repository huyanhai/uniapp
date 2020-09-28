<template>
	<web-view :src="url" v-if="url.length"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url:"http://agent.1in100.cn/"
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
