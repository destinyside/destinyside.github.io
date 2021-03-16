<template>
	<el-row>
		<el-col :span="24">
			 <div id="particles-js" class="glass-background" :style="style"></div>
		</el-col>
	</el-row>
</template>

<script>
	import * as particlesJs from "particles.js";
	import config from "./particles.json";
	export default {
		config:{
				index:1,
				label:'Particles'
		},
		props:["img"],
		data() {
			return {}
		},
		mounted() {
			//config.particles.shape.image.src = this.$props.img;
			this.init("particles-js");
		},
		computed: {
			style() {
				let height = window.innerHeight - 180;
				let style = `height:${height}px;`;
				return style;
			}
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
		width: 100%;
	}
</style>
