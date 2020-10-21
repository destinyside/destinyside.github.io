<template>
	<el-row>
		<el-col :span="12">
			<el-button @click="evalData">Eval</el-button>
			<el-input type="textarea" class="input" v-model="data"></el-input>
			
		</el-col>
		<el-col :span="12">
			<el-button @click="clearData">Clear</el-button>
			<el-input type="textarea" class="output" v-model="result" :readonly="true"></el-input>
		</el-col>
	</el-row>
</template>

<script>
	import BiwaScheme from 'biwascheme';
	export default {
		data() {
			return {
				data:'',
				result:''
			}
		},
		methods: {
			evalData(){
				try{
					this.result += BiwaScheme.run(this.data) + '\n';
				}catch(e){
					this.result += e + '\n';
				}
				
				
			},
			clearData(){
				this.result = '';
			}
		},
	}
</script>

<style>
	.input,.output{
		height:80vh;
		width:100%;
		resize:none;
	}
	
	.input > textarea,.output > textarea{
		height:100%;
		resize:none;
	}
	
</style>
