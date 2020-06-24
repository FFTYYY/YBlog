YUI_mixins = {

	//能够感知鼠标
	sense_mouse: {
		data: function () { return {
			mouse_in 		: false , 	//鼠标是否在内

			mouse_hold 		: false , 	//鼠标是否按下
			mouse_hold_x 	: 0 ,		//鼠标按下的位置(clientX)
			mouse_hold_y 	: 0 ,	
			mouse_hold 		: false,  	//鼠标是否按住
			mouse_hold_idx 	: 0,  		//本次按住的编号

			mouse_move_event: undefined,//鼠标移动事件，用于给子对象访问
		}},

		methods:{

			mouseenter: function(e){//鼠标进入
				this.mouse_in = true
			},

			mouseleave: function(e){//鼠标离开				
				
				if(
					e.toElement == null 
					&& e.clientX >= 0 && e.clientX <= window.innerWidth
					&& e.clientY >= 0 && e.clientY <= window.innerHeight
				)
				{//假离开
					return 
				}

				this.mouse_hold = false //同时也认为抬起了
				this.mouse_in = false
			},

			mouseup: function(e){//鼠标抬起
				this.mouse_hold = false
			},

			mousedown: function(e){//鼠标按下
				this.mouse_hold_x = e.clientX
				this.mouse_hold_y = e.clientY
				this.mouse_hold_idx += 1
				this.mouse_hold = true
			},

			mousemove: function(e){//鼠标移动
				this.mouse_move_event = e
			},
		},
	},

	//能够拖动（设置x和y这两个属性）
	dragble: {
		data: function () { return {
			drag_el_x: 0 ,	//元素原来的位置
			drag_el_y: 0 ,
			drag_parent_hold_idx: -1 , //本次鼠标按下在父对象中的编号 (mouse_hold_idx)
		}},

		props: ["parent" , "parent_mouse_move_event"] , 

		watch:{
			mouse_hold: function(new_val , old_val){
				if(new_val){ //按下了
					this.drag_el_x = this.x
					this.drag_el_y = this.y

					//这个时候事件还没有浮到parent处，因此需要自行+1
					this.drag_parent_hold_idx = this.parent.mouse_hold_idx + 1
				}
			},
			parent_mouse_move_event: function(new_val , old_val){//直接监听父对象的鼠标移动，因为鼠标很可能移出本对象
				if( 
					this.parent.mouse_hold && 
					this.parent.mouse_hold_idx == this.drag_parent_hold_idx
				){  //鼠标没有按下，但是在parent中还没有断（这说明只是因为移出去了）
					//这样比检测自己的mouse_hold更灵敏
					this.x = (new_val.clientX - this.mouse_hold_x) + this.drag_el_x
					this.y = (new_val.clientY - this.mouse_hold_y) + this.drag_el_y
				}
			},
		},
	},
}


function YUI_init(){

	//工具
	Vue.component("y-tool", {
		delimiters: ['[[', ']]'],

		data: function () { return {

			//位置和大小，注意位置是相对于toolbar
			height: 500,
			width : 200,
			opacity: 0.9,

			idx: 0, //在父对象中的编号

			classes: ["Y-color-highdark" , "Y-scroll" , "Y-abs-position" , "Y-color-text-light"] , 
			option_class: "Y-button" , 
		}},

		computed: {
			show: function(){ 
				return this.$parent.tool_active && (this.$parent.active_idx == this.idx)
			},
			x: function(){  //left
				if(this.$parent.x < window.innerWidth / 2)
					return this.$parent.width
				return -this.width
			},
			y: function(){  // top
				if(this.$parent.y < window.innerHeight / 2)
					return 0
				return -this.height+this.$parent.height
			},
		},

		mounted: function(){
			/*TODO：这里的实现使得动态删除子元素后编号变得混乱*/
			/*TODO：改用事件实现*/
			this.idx = this.$parent.n_children 	//设置自己在父对象中的编号
			this.$parent.children.push(this) 	//把自己加入父对象的儿子列表
		},

		methods: {
			enter_anime: function(){
				anime({
					targets: this.$el,
					left: ["-50px" , this.x],
					opacity: [0 , this.opacity],
					duration: 500,
					easing: "easeInOutQuad",
				});
			},
			leave_anime: function(){
				anime({
					targets: this.$el,
					opacity: [this.opacity , 0],
					duration: 500,
					easing: "easeInOutQuad",
				});
			},
		},

		template: `
			<transition 
				@enter = enter_anime
				@leave = leave_anime
				:duration = 500
			>
			<div 
				:class = classes
				:style = "{
					height: height + 'px',
					width : width  + 'px',
					left  : x + 'px',
					top   : y + 'px',
					opacity: String(opacity),		
				}"

				v-show = show
			>
				<slot v-bind:option_class=option_class></slot>
			</div>
			</transition>

		`,
	})

	//这个是真正的y-toolbar
	Vue.component("y-toolbar-real", {
		delimiters: ['[[', ']]'],

		mixins: [YUI_mixins.sense_mouse , YUI_mixins.dragble ] ,

		data: function () { return {

			//位置和大小
			height: 50,
			width : 50,
			x: 50, //left
			y: 50, //top

			classes: ["Y-color-lightdark" , "Y-allow-overflow" , "Y-abs-position" , "Y-color-text-light"] , 

			active_idx: 0, //当前活跃的子对象编号
			children: [] , //所有子对象
		}},

		computed: {
			n_children   : function(e){ return this.children.length },
			active_child : function(e){ return this.children[this.active_idx] },
			tool_active  : function(e){
				return this.mouse_in
			},
		},

		methods:{

			mousewheel: function(e){
				if(e.wheelDeltaY < 0)
					this.active_idx = (this.active_idx + 1) % (this.n_children)
				else 
					this.active_idx =  (this.active_idx - 1 + this.n_children) % (this.n_children)
			},
		},

		template: `
			<div 
				:class = classes 
				:style = "{
					height: height + 'px',
					width : width  + 'px',
					left  : x      + 'px',
					top   : y      + 'px',					
				}"

				@mouseenter.self = mouseenter($event)
				@mouseleave.self = mouseleave($event)
				@mousedown.self  = mousedown($event)
				@mouseup.self    = mouseup($event)
				@mousemove.self  = mousemove($event)

				@mousewheel.self = mousewheel($event)
			>
				<slot v-slot:data="data"></slot>
			</div>
		`,
	})

	//为了实现常Prop，新加一个组件，用于传递所有从父到y-toolbar的信息
	Vue.component("y-toolbar", {
		delimiters: ['[[', ']]'],

		template: `
			<y-toolbar-real
				:parent_mouse_move_event = "$parent.mouse_move_event"
				:parent					 = "$parent"
			>
			<slot></slot>
			</y-toolbar-real>
		`,
	})


	//主内容
	Vue.component("y-content", {
		delimiters: ['[[', ']]'],

		data: function () { return {

			//位置
			left  : "10%",
			right : "10%",
			top   : "10%",
			bottom: "10%",

			classes: ["Y-color-dark" , "Y-scroll" , "Y-abs-position" , "Y-color-text-light"]
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

			classes: ["Y-color-dark" , "Y-no-scrollbar" , "Y-full" , "Y-color-text-light"],
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
