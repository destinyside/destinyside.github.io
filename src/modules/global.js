import Vue from 'vue';

//	字符串首字母大写处理
function strUp(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const indexCom = require.context('.',true,/index\.js/);

let configMap = {};
indexCom.keys().forEach(key => {
	const config = indexCom(key);
	const configObj = config.default || config;
	//console.log(configObj);
	configMap[key] = configObj;
});

function getConfig(category){
	if(category){
		let path = './'+ category +'/index.js';
		if(configMap[path]){
			return configMap[path];
		} else {
			return {};
		}
	}
}

let components = {};
	
let setKey = (key, com) => {
	//获取单个组件内容
	const _component = requireCom(key);
	const _componentObj = _component.default || _component;
	//获取组件名称
	const _componentName = key.replace(/^\.\//,'').replace(/\.\w+$/,'');
	//strUp(key.replace(/^\.\//,'').replace(/\.\w+$/,''));
	let componentParts = _componentName.split('/');
	if(componentParts.length >= 2){
		let current = components;
		let ancestorCategory = null;
		for(let i=0, len = componentParts.length; i<len-1; i++ ){
			let category = componentParts[i];
			ancestorCategory = ancestorCategory?(ancestorCategory + '/' + category):category;
			if(!current[category]){
				current[category] = {};
				current[category].sub = true;
				current[category].config = {
					label:category
				};
				let config = getConfig(ancestorCategory);
				if(config){
					current[category].config = config;
				}
			}
			current = current[category];
		}
		current[_componentName] = _componentObj.config;
	} else {
		components[_componentName] = _componentObj.config;
	}
	//console.log(key, _componentName);
	//console.log(_componentObj.config);
	//注册在vue上
	//Vue.component(_componentName,_component.default || _component);
}

//引入同目录下的全部组件
const requireCom = require.context('.',true,/\.vue$/);
//依次进行注册
requireCom.keys().forEach(key => {
	setKey(key, requireCom);
});

let sort = (item) => {
	if(item.sub){
		let arr = [];
		for(var key in item){
			//console.log(key, item[key]);
			if('config_sub_key'.indexOf(key) == -1){
				item[key].key = key;
				sort(item[key]);
				arr.push(item[key]);
			}
		}
		arr.sort((a,b)=>{
			var aIdx = a.config?a.config.index:a.index;
			var bIdx = b.config?b.config.index:b.index;
			return aIdx - bIdx;
		});
		//console.log(arr);
		item.items = arr;
	}
}

let current = components;
components.sub = true;
sort(components);
delete components.sub;

export default components;
