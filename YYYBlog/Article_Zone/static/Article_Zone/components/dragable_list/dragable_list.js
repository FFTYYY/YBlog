
showing_list = []
now_showing = 0;
showing_index = 0;

now_showing_in = false
mc_in = false
hmc_in = false
the_div = 0;
		
hidden_main_cont = document.getElementById("hidden_main_cont")

function showing(who)
{
	return !(who.classList.contains("hidden") || who.classList.contains("unshowing"))
}

function make_hidden(who , tag = "hidden")
{//给退出添加动画
	old_s = showing(who)
		who.classList.remove("ining")


	if(old_s)
	{
		let the_guy = who
		let now_tag = tag
		the_guy.classList.add("leaving")
		the_guy.should_hid = true;
		setTimeout(
			function()
			{
				if(the_guy.should_hid)
					the_guy.classList.add(now_tag)
				if(now_tag == "hidden")
					the_guy.classList.add(now_tag)
				the_guy.classList.remove("leaving")
			} , 
			500
		)
	}
}

function unhidden(who , tag = "hidden")
{
	old_s = showing(who)
	who.classList.remove(tag)
	new_s = showing(who)
	
	if(tag == "hidden")
		who.should_hid = false;
	who.classList.remove("leaving")

	if((!old_s) && (new_s))
	{
		let the_guy = who
		let now_tag = tag
		the_guy.classList.add("ining")
		setTimeout(
			function()
			{
				the_guy.classList.remove("ining")
			} , 
			500
		)
	}

}

function switch_hidden_main_cont_state(on = true)
{
	if(on)
	{
		hidden_main_cont.classList.remove("pointer_events_none")
		hidden_main_cont.classList.add("pointer_events_auto")
	}
	else
	{

		hidden_main_cont.classList.remove("pointer_events_auto")
		hidden_main_cont.classList.add("pointer_events_none")
	}
}

function unshow_when_mouseleave()
{
	setTimeout(
		function(){
			if(!(now_showing_in || mc_in || hmc_in))
			{
				make_hidden(now_showing , "hidden")

				switch_hidden_main_cont_state(false)
			}
		}, 
		20
	)
}

function update_now_showing(ind)
{
	now_showing = showing_list[ind];
	now_showing.onmouseenter = function(){
		now_showing_in = true;
	}
	now_showing.onmouseleave = function(e){

		if(e.movementX || e.movementY)
		{//防止焦点丢失（如打字）被判断为离开
			now_showing_in = false;
		}
		unshow_when_mouseleave();
	}

	for(var i = 0;i < showing_list.length;i++)
	{
		if(showing(showing_list[i]))
		{
			this_man = showing_list[i];
			make_hidden(this_man , "unshowing");
		}
	}
	unhidden(now_showing , "unshowing");
}

function locate_now_showing()
{//根据当前按钮位置变换列表的位置
	if(the_div.offsetLeft < window.innerWidth / 2)
		now_showing.style.left = main_cont.offsetWidth
	else now_showing.style.left = -now_showing.offsetWidth

	if(the_div.offsetTop < window.innerHeight / 2)
		now_showing.style.top = 0
	else now_showing.style.top = -now_showing.offsetHeight + the_div.offsetHeight


	if(the_div.offsetLeft < window.innerWidth / 2)
		hidden_main_cont.style.left = 0
	else hidden_main_cont.style.left = -now_showing.offsetWidth + main_cont.offsetWidth

	if(the_div.offsetTop < window.innerHeight / 2)
		hidden_main_cont.style.top = 0
	else hidden_main_cont.style.top = -now_showing.offsetHeight + the_div.offsetHeight
}

function dragble_list_init(main_cont , showing_lis)
{
	hidden_main_cont = document.getElementById("hidden_main_cont")

	for(var i = 0;i < showing_lis.length;i++)
	{
		ele = showing_lis[i]
		ele.style.width = hidden_main_cont.offsetWidth
		ele.style.height = hidden_main_cont.offsetHeight

		ele["should_hid"] = false;
	}

	showing_list = showing_lis;

	main_cont.onmousemove = function(){
		locate_now_showing()

	}
	main_cont.onmouseenter = function (){
		console.log("sasaas")
		mc_in = true

		unhidden(now_showing , "hidden");
		unhidden(now_showing , "unshowing");
		console.log(now_showing.classList)
		switch_hidden_main_cont_state(true)
		locate_now_showing()
	}

	main_cont.onmouseleave = function (e){
		//console.log("hello!!")
		if(e.movementX || e.movementY)
		{//防止焦点丢失（如打字）被判断为离开
			mc_in = false;
		}
		unshow_when_mouseleave();
	}
	main_cont.onmousewheel = function(e){
		if(e.wheelDeltaY < 0)
			showing_index ++;
		else showing_index --;

		showing_index = (showing_index + showing_list.length) % showing_list.length
		update_now_showing(showing_index);
		unhidden(now_showing , "hidden");
		locate_now_showing()
	}

	//注意这里是hidden_main_cont，等于说扩大了不消失的范围
	hidden_main_cont.onmouseenter = function (e){
		hmc_in = true
	}
	hidden_main_cont.onmouseleave = function (e){
		hmc_in = false
		unshow_when_mouseleave()
	}

	update_now_showing(0)
	switch_hidden_main_cont_state(false)
}

function mouse_out(mx , my , who)
{
	leff = who.offsetLeft + the_div.offsetLeft
	topp = who.offsetTop + the_div.offsetTop
	//console.log(leff , topp , mx , my)

	return mx < leff || mx > leff + who.offsetWidth ||
			my < topp || my > topp + who.offsetHeight;
}

document.addEventListener('mousemove', function(e) {
	mx = e.clientX
	my = e.clientY

	if(e.movementX || e.movementY)
	{
		mc_in = !mouse_out(mx,my,main_cont);
		hmc_in = !mouse_out(mx,my,hidden_main_cont);
		if(showing(now_showing))
			now_showing_in = !mouse_out(mx,my,now_showing)

		unshow_when_mouseleave();
	}

})