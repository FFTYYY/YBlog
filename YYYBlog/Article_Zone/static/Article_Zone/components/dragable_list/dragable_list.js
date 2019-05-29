
showing_list = []
now_showing = 0;
showing_index = 0;

now_showing_in = false
mc_in = false
hmc_in = false
		
hidden_main_cont = document.getElementById("hidden_main_cont")

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
	setInterval(
		function(){
			if(!(now_showing_in || mc_in || hmc_in))
			{
				now_showing.classList.add("hidden")

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
		showing_list[i].classList.add("unshowing");
	}
	now_showing.classList.remove("unshowing");
}

function locate_now_showing()
{
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

	}

	showing_list = showing_lis;

	main_cont.onmousemove = function(){
		locate_now_showing()
	}
	main_cont.onmouseenter = function (){
		mc_in = true
		now_showing.classList.remove("hidden")
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
		now_showing.classList.remove("hidden");
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