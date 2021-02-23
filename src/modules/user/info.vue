<template>
	<div>
		<el-card>
			<div slot="header" class="clearfix">
				<span>卡片名称</span>
				<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
			</div>
			<div v-for="o in 4" :key="o" @click="name(o)" class="text item">
				{{'列表内容 ' + o }}
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		config:{
				label:'User Info',
				index:2
		},
		data() {
			return {
			}
		},
		methods: {
			name(val) {
				this.$notify({
					title:'tip',
					message:'current click is ' + val
				});
				
			}
		},
	}
</script>

<style>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 480px;
	}
</style>
