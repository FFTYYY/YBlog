
showing_list = []
now_idx = -1;
should_idx = -1;
old_now_idx = 0;

now_showing_in = false
mc_in = false
hmc_in = false
the_div = 0;

hidden_main_cont = document.getElementById("hidden_main_cont")

now_inited = false

function locate_elements()
{//根据当前按钮位置变换列表的位置

	var ele = showing_list[0]
	for(var i = 0;i < showing_list.length;i++)
	{
		ele = showing_list[i]
		if(the_div.offsetLeft < window.innerWidth / 2)
			ele.style.left = main_cont.offsetWidth
		else ele.style.left = -ele.offsetWidth

		if(the_div.offsetTop < window.innerHeight / 2)
			ele.style.top = 0
		else ele.style.top = -ele.offsetHeight + the_div.offsetHeight
	}

	if(now_idx >= 0)
	{
		ele = showing_list[now_idx]

		if(the_div.offsetLeft < window.innerWidth / 2)
			hidden_main_cont.style.left = 0
		else hidden_main_cont.style.left = -ele.offsetWidth + main_cont.offsetWidth

		if(the_div.offsetTop < window.innerHeight / 2)
			hidden_main_cont.style.top = 0
		else hidden_main_cont.style.top = -ele.offsetHeight + the_div.offsetHeight
	}
}

animing = false
function flush()
{
	if(!now_inited)
		return 
	
	if(!(now_showing_in || mc_in || hmc_in))
		should_idx = -1;
	
	if(should_idx < 0 && (mc_in))
		should_idx = old_now_idx;

	if(!animing)
	{
		if(now_idx != should_idx)
		{
			let now_id = now_idx;
			let sho_id = should_idx;
			animing = true;
			if(now_id >= 0)
				showing_list[now_id].classList.add("outing")
			if(sho_id >= 0)
			{
				showing_list[sho_id].classList.remove("hidden")
				showing_list[sho_id].classList.add("ining")
			}
			setTimeout(
				function(){
					animing = false;
					if(now_id >= 0)
					{
						showing_list[now_id].classList.add("hidden");
						showing_list[now_id].classList.remove("outing")
					}
					if(sho_id >= 0)
						showing_list[sho_id].classList.remove("ining")
				},
				500
			)
			if(now_idx >= 0 && should_idx < 0)
				old_now_idx = now_idx;
			now_idx = should_idx;		
		}
	}
	locate_elements();
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

function dragble_list_init(main_cont , showing_lis)
{
	hidden_main_cont = document.getElementById("hidden_main_cont")

	for(var i = 0;i < showing_lis.length;i++)
	{
		ele = showing_lis[i]
		ele.style.width = hidden_main_cont.offsetWidth
		ele.style.height = hidden_main_cont.offsetHeight

		ele.onmouseenter = function(){
			now_showing_in = true;
		}
		ele.onmouseleave = function(e){

			if(e.movementX || e.movementY)
			{//防止焦点丢失（如打字）被判断为离开
				now_showing_in = false;
			}
		}

	}

	showing_list = showing_lis;

	main_cont.onmousemove = function(){
	}

	main_cont.onmouseenter = function (){
		mc_in = true;
	}

	main_cont.onmouseleave = function (e){

		if(e.movementX || e.movementY)
		{//防止焦点丢失（如打字）被判断为离开
			mc_in = false;
		}
	}
	main_cont.onmousewheel = function(e){
		if(e.wheelDeltaY < 0)
			should_idx = (should_idx + 1 + showing_list.length) % showing_list.length;
		else should_idx = (should_idx - 1 + showing_list.length) % showing_list.length;
	}

	//注意这里是hidden_main_cont，等于说扩大了不消失的范围
	hidden_main_cont.onmouseenter = function (e){
		hmc_in = true
	}
	hidden_main_cont.onmouseleave = function (e){
		hmc_in = false
	}

	switch_hidden_main_cont_state(false)

	now_inited = true
}

function mouse_out(mx , my , who)
{
	if(who)
	{
		leff = who.offsetLeft + the_div.offsetLeft
		topp = who.offsetTop + the_div.offsetTop

		return mx < leff || mx > leff + who.offsetWidth ||
				my < topp || my > topp + who.offsetHeight;
	}
}
document.addEventListener('mousemove', function(e) {
	mx = e.clientX
	my = e.clientY

	if(now_idx >= 0)
	{
		if(now_showing_in && mouse_out(mx , my , showing_list[now_idx]))
		{	
			who = showing_list[now_idx]
			leff = who.offsetLeft + the_div.offsetLeft
			topp = who.offsetTop + the_div.offsetTop
		}
		now_showing_in = !mouse_out(mx , my , showing_list[now_idx]);
	}

	hmc_in = !mouse_out(mx , my , hidden_main_cont)
	mc_in = !mouse_out(mx , my , main_cont)
})

setInterval(flush , 20)