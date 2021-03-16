<template>
	<div id="app">
		<el-container>
			<el-header >
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
					<template v-for="item,index in menus.items">
						<el-submenu v-if="item.sub" v-show="!item.config.show && item.config.show != false" :index="item.key" :disabled="item.disabled">
						    <template slot="title">{{item.config.label}}</template>
						    <template v-for="subItem,subIndex in item.items" :index="subItem.key" v-if="'sub_config_key'.indexOf(subItem.key) == -1">
								<el-submenu v-if="subItem.sub" :index="subItem.key">
								    <template slot="title">{{subItem.config.label}}</template>
								    <template v-for="childItem,childIndex in subItem.items" :index="childItem.key" v-if="'sub_config_key'.indexOf(subItem.key) == -1">
										<el-menu-item :key="childItem.key" :index="childItem.key" :disabled="childItem.disabled">
											<el-icon v-if="childItem.icon" :name="childItem.icon"></el-icon>
											{{childItem.label}}
										</el-menu-item>
									</template>
								</el-submenu>
								<el-menu-item v-if="!subItem.sub"  :key="subItem.key" :index="subItem.key" :disabled="subItem.disabled">
									<el-icon v-if="subItem.icon" :name="subItem.icon"></el-icon>
									{{subItem.label}}
								</el-menu-item>
							</template>
						</el-submenu>
						<el-menu-item v-if="!item.sub" v-show="!item.show && item.show != false" :key="item.key" :index="item.key" :disabled="item.disabled">
							<el-icon v-if="item.icon" :name="item.icon"></el-icon>
							{{item.label}}
						</el-menu-item>
					</template>
				</el-menu>
			</el-header>
			<el-main>
				<component :is="currentView"></component>
			</el-main>
			<el-footer>
				<el-row class="footer">
					<el-col :span="24">&Sigma; bg is from kde plasma</el-col>
				</el-row>
				<el-drawer title="title" :visible.sync="showDrawer" :direction="'ltr'" :before-close="handleClose">
					<span>here!</span>
				</el-drawer>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	var componentMap = {};
	export default {
		components: {

		},
		data() {
			return {
				menus: this.components,
				activeIndex: 'home',
				showDrawer: false,
				currentView: ''
			}
		},
		mounted() {
			this.setCurrentView();
		},
		methods: {
			handleClose(done) {
				done();
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				if (key == 'drawer') {
					this.$set(this.$data, 'showDrawer', true);
				} else {
					this.$set(this.$data, 'activeIndex', key);
					this.setCurrentView();
				}
			},
			setCurrentView() {
				var activeIndex = this.activeIndex;
				if (!componentMap[activeIndex]) {
					let item = import(`./modules/${activeIndex}.vue`);
					//console.log(item);
					item.then(res => {
						// {default: {…}, __esModule: true}
						componentMap[activeIndex] = res.default;
						this.$set(this.$data, 'currentView', componentMap[activeIndex]);
					});
				} else {
					this.$set(this.$data, 'currentView', componentMap[activeIndex]);
				}
			}
		}
	}
</script>

<style>
	@import url("./assets/css/main.css");
</style>

