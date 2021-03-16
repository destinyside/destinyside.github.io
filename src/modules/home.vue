<template>
	<el-row>
		<el-col :span="24">
			<div class="glass-container" :style="style">
				<div class="glass-background" :style="style">
					<canvas canvas-id="clockCanvas" id="clockCanvas" :style="clockStyle" width="200" height="200"></canvas>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		config:{
				index:1,
				label:'Home'
		},
		data() {
			return {}
		},
		mounted() {
			this.drawClock("clockCanvas");
		},
		computed: {
			style() {
				let height = window.innerHeight - 180;
				let style = `height:${height}px;`;
				return style;
			},
			clockStyle(){
				let height = (window.innerHeight - 180 - 200) / 2;
				let style = `margin-top:${height}px;`;
				return style;
			}
		},
		methods: {
			drawClock(elemId) {
				var canvas = document.getElementById(elemId);
				if (canvas.getContext) {
					var ctx = canvas.getContext('2d');
					ctx.lineWidth = 8;
					ctx.shadowOffsetX = 3;
					ctx.shadowOffsetY = 3;
					ctx.shadowBlur = 2;
					ctx.font = '16px monospace';
					var startAngle = -Math.PI / 2;

					function drawClock() {
						var time = new Date();
						var hours = time.getHours();
						var am = true;
						if (hours >= 12) {
							hours -= 12;
							am = false;
						}
						var minutes = time.getMinutes();
						var seconds = time.getSeconds();

						ctx.clearRect(0, 0, 200, 200);

						ctx.beginPath();
						ctx.strokeStyle = "rgb(255, 0, 0)";
						ctx.shadowColor = "rgba(255, 128, 128, 0.5)";
						ctx.arc(100, 100, 90, startAngle, (hours / 6 + minutes / 360 + seconds / 21600 - 0.5) * Math.PI, false);
						ctx.stroke();

						ctx.beginPath();
						ctx.strokeStyle = "rgb(0, 255, 0)";
						ctx.shadowColor = "rgba(128, 255, 128, 0.5)";
						ctx.arc(100, 100, 75, startAngle, (minutes / 30 + seconds / 1800 - 0.5) * Math.PI, false);
						ctx.stroke();

						ctx.beginPath();
						ctx.strokeStyle = "rgb(0, 0, 255)";
						ctx.shadowColor = "rgba(128, 128, 255, 0.5)";
						ctx.arc(100, 100, 60, startAngle, (seconds / 30 - 0.5) * Math.PI, false);
						ctx.stroke();

						time = [];
						if (hours < 10) {
							time.push('0');
						}
						time.push(hours);
						time.push(':');

						if (minutes < 10) {
							time.push('0');
						}
						time.push(minutes);
						time.push(':');

						if (seconds < 10) {
							time.push('0');
						}
						time.push(seconds);

						if (am) {
							time.push('AM');
						} else {
							time.push('PM');
						}

						ctx.fillText(time.join(''), 50, 105);
					}
					drawClock();
					setInterval(drawClock, 1000);
				}
			}
		},
	}
</script>

<style>
	#clockCanvas{
		width: 12.5rem;
		height: 12.5rem;
	}
</style>
