<template>
	<div id="app">
		<el-container>
			<el-header>
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
					<template v-for="item,index in menus">
						<el-menu-item :key="item.index" :index="item.key" :disabled="item.disabled">
							<el-icon v-if="item.icon" :name="item.icon"></el-icon>
							{{item.label}}
						</el-menu-item>
					</template>
				</el-menu>
			</el-header>
			<el-main v-show="activeIndex=='basic'" >
				<!--<img src="./assets/logo.png">-->
				<Clock></Clock>
				<div>
					<el-button @click="startHacking">Start</el-button>
				</div>
			</el-main>
			<!--<el-main v-show="activeIndex=='userInfo'">
				<UserInfo></UserInfo>
			</el-main>-->
			<el-main v-show="activeIndex=='funny'">
				<Funny v-if="activeIndex=='funny'" img="/src/assets/funny.png"></Funny>
			</el-main>
			<el-main v-show="activeIndex=='biwaScheme'">
				<BiwaScheme></BiwaScheme>
			</el-main>
			<el-footer>
				<el-drawer
				  title="我是标题"
				  :visible.sync="showDrawer"
				  :direction="'ltr'"
				  :before-close="handleClose">
				  <span>我来啦!</span>
				</el-drawer>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	import UserInfo from './root/user/info/info.vue';
	import Clock from './root/clock/clock.vue';
	import Funny from './root/funny/funny.vue';
	import BiwaScheme from './root/biwa/biwa.vue';
	export default {
		components:{
				UserInfo:UserInfo,
				Clock:Clock,
				Funny:Funny,
				BiwaScheme:BiwaScheme
		},
		data() {
			return {
				menus:[
					{
						label:'',
						key:'drawer',
						icon:'menu'
					},{
						label:'Basic',
						key:'basic',
						icon:''
					},{
						label:'Funny',
						key:'funny',
						icon:''
					},{
						label:'BiwaScheme',
						key:'biwaScheme',
						icon:''
					},{
						label:'User',
						key:'userInfo',
						icon:''
					},{
						label:'messages',
						key:'messages',
						icon:'',
						disabled:true
					}
				],
				activeIndex: 'basic',
				showDrawer:false
			};
		},
		methods: {
			handleClose(done){
				done();
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				if(key=='drawer'){
					this.$set(this.$data, 'showDrawer', true);
				} else {
					this.$set(this.$data, 'activeIndex', key);
				}
			},
			startHacking() {
				this.$notify({
					title: 'It works!',
					type: 'success',
					message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
					duration: 5000
				})
			}
		}
	}
</script>

<style>
	#app {
		font-family: Helvetica, sans-serif;
		text-align: center;
	}
</style>
