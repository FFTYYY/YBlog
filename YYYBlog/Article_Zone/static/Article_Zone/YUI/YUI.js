

function YUI_init(){

	//工具
	YUI_toolbar_init()

	//主内容
	Vue.component("y-content", {
		delimiters: ['[[', ']]'],

		data: function () { return {

			//位置
			left  : "10%",
			right : "10%",
			top   : "10%",
			bottom: "10%",

			classes: ["Y-color-lowdark" , "Y-scroll" , "Y-abs-position" , "Y-color-light-text"]
		}},

		template: `
			<div 
				:class="classes"
				:style="{
					left  : left,
					right : right,
					top   : top,
					bottom: bottom,
				}"

			>
				<slot></slot>
			</div>
		`, 
	})

	//容器
	Vue.component("y-page", {
		delimiters: ['[[', ']]'],

		mixins: [YUI_mixins.sense_mouse] , 

		data: function () { return {

			classes: ["Y-color-dark" , "Y-no-scrollbar" , "Y-full" , "Y-color-light-text"]
		}},

		template: `
			<div 
				:class="classes"

				@mouseenter.self  = mouseenter($event)
				@mouseleave.self   = mouseleave($event)
				@mousedown  	= mousedown($event)
				@mouseup    	= mouseup($event)
				@mousemove  	= mousemove($event)
			>
				<slot></slot>
			</div> 
		`, 
	})
}

YUI_init()
