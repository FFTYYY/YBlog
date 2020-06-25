function YUI_components_init(){


	//按钮
	Vue.component("y-button", {
		delimiters: ['[[', ']]'],

		mixins: [YUI_mixins.sense_mouse] , 

		computed:  {
			//用这种方式来实现hover效果
			classes: function(){ return {
				'Y-text-center' 		: true , 
				'Y-font-short' 			: true , 
				"Y-color-text-light"	: !this.mouse_in, 
				"Y-color-highdark"		: !this.mouse_in,
				"Y-color-text-dark"		: this.mouse_in, 
				"Y-color-light"			: this.mouse_in,
			}},
		},

		template: `
			<div 
				:class = classes
				@mouseenter.self = mouseenter($event)
				@mouseleave.self = mouseleave($event)

				:style = "{
					border: '0',
					outline: '0',
				}"
			>
				<slot></slot>
			</div> 
		`, 
	})

	//选项
	Vue.component("y-option", {
		delimiters: ['[[', ']]'],

		mixins: [YUI_mixins.sense_mouse] , 

		computed:  {
			//用这种方式来实现hover效果
			classes: function(){ return {
				'Y-text-vertical-center': true , 
				'Y-font-short' 			: true , 
				"Y-color-text-light"	: !this.mouse_in, 
				"Y-color-transparent"	: !this.mouse_in, 
				"Y-color-text-dark"		: this.mouse_in, 
				"Y-color-light"			: this.mouse_in,
			}},
		},

		template: `
			<a 
				:class = classes
				@mouseenter.self = mouseenter($event)
				@mouseleave.self = mouseleave($event)

				:style = "{
					'border' 			: '0',
					'outline' 			: '0',
					'text-decoration'	: 'none',
					'transition' 		: '0.5s ease-in',
				}"
			>
				<slot></slot>
			</a> 
		`, 
	})

	//text input
	Vue.component("y-text-input", {
		delimiters: ['[[', ']]'],

		data: function (){return {
			classes: ["Y-color-text-light" , "Y-color-lightdark" , "Y-font-short"] , 
		}} , 

		template: `
			<input
				:class = classes
				type = "text"
			/>
		`, 
	})
	//text area
	Vue.component("y-text-area", {
		delimiters: ['[[', ']]'],

		data: function (){return {
			classes: ["Y-color-text-light" , "Y-color-lightdark" , "Y-font-short"] , 
		}} , 

		template: `
			<textarea
				:class = classes
				type = "text"

				:style = "{
					'resize': 'none',
				}"
			><slot></slot></textarea>
		`, 
	})

}

YUI_components_init()
