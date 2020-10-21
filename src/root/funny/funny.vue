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
		props:["img"],
		data() {
			return {}
		},
		mounted() {
			//config.particles.shape.image.src = this.$props.img;
			this.init("particles-js");
		},
		methods: {
			init(elemId) {
				window.particlesJS(elemId, config);
				//document.getElementById(elemId).dispatchEvent(new Event('resize'));
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
