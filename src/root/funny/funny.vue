<template>
	<el-row>
		<el-col :span="24">
			 <div id="particles-js"></div>
		</el-col>
	</el-row>
</template>

<script>
	import * as particlesJs from "particles.js";
	import config from "./particles.json";
	export default {
		data() {
			return {}
		},
		mounted() {
			this.init("particles-js");
		},
		methods: {
			init(elemId) {
				window.particlesJS(elemId, config);
			}
		},
	}
</script>

<style>
	#particles-js {
		width: 100vw;
		height: 100vh;
	}
</style>
