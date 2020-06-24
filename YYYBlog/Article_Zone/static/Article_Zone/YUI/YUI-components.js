function YUI_components_init(){

	//TODO：捕获hover事件
	//按钮
	Vue.component("y-button", {
		delimiters: ['[[', ']]'],

		data: function () { return {
			classes: ["Y-button" , "Y-color-text-light" , "Y-color-highdark"],
		}},

		template: `
			<div :class = classes>
				<slot></slot>
			</div> 
		`, 
	})

	//TODO：捕获hover事件
	//选项
	Vue.component("y-option", {
		delimiters: ['[[', ']]'],

		data: function () { return {
			classes: ["Y-option" , "Y-color-text-light"],
		}},

		template: `
			<a :class = classes>
				<slot></slot>
			</a> 
		`, 
	})

}

YUI_components_init()
