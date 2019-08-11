init_area = document.getElementById("init_area");
father = init_area.parentElement;
wid_father = father.parentElement;
the_wid = init_area.offsetWidth

brother_count = 1

deb = 0


function delete_a_child(x)
{
	if(x == undefined || x["my_deleted"])
		return 
	x["my_deleted"] = true
	father.removeChild(x)
	brother_count --;	
	update_width()
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
	return false
}

function update_width()
{
	wid_father.style.width = the_wid*brother_count + "px";
}

function show_mouse_env(ele)
{
	ele.addEventListener("mouseenter" , 
		function(e){
			//console.log("mouse_enter:")
			//console.log(this)
			this["mouse_in_me"] = true
		}
	)
	ele.addEventListener("mouseleave" , 
		function(e){
			if(e.movementX || e.movementY)
			{
				//console.log("mouse leave:")
				//console.log(this)
				this["mouse_in_me"] = false
			}
		}
	)

}

function get_last(a_address)
{
	lis = a_address.split("/")
	return lis[lis.length-1]
}

function lls_ele_enter(_this , e)
{
	if(the_wid == 0)
		the_wid = init_area.offsetWidth

	this_father = _this.parentNode.parentElement.parentElement

	this_number = this_father.my_number
	new_number = this_number + 1

	deleted = false
	for(var _my_brother = 0;_my_brother < father.childElementCount;_my_brother ++)
	{
		var my_brother = father.children[_my_brother]

		if(my_brother["my_number"] == new_number)
		{
			delete_a_child(my_brother)
			deleted = true
		}
	}

	if(brother_count >= 3)
		return 

	//new_area = $(init_area).clone(true)
	new_address = get_last(_this.children[0].href)
	new_area = document.getElementById("the_area_of_" + new_address).cloneNode(true)
	new_area.classList.remove("hidden")
	if(!deleted)	//from new
		new_area.classList.add("sub_ining")
	map_add_thing[new_address](new_area)

	brother_count ++;

	new_area.id = "new_area_" + new_number;
	new_area["my_number"] = new_number
	new_area.style.left = the_wid*this_number + "px";
	new_area["forward_father"] = this_father
	show_mouse_env(new_area)
	_this.my_new_area = new_area
	father.appendChild(new_area);
	update_width()

	new_area.addEventListener("mouseleave" , function(e)
	{
		if(e.movementX || e.movementY)
		{
			let _thi = this
			setTimeout(
				function()
				{
					if(_thi.my_number == brother_count) // I'm the last
					{
						_thi.classList.add("sub_outing")
						setTimeout(
							function()
							{
								//console.log("delete because leave main")
								_thi.classList.remove("sub_outing")
								delete_a_child(_thi)
							},
							500,
						)
					}
				},
				501,
			)

		}
	})

	give_all_lls_ele_event(new_area)
}

function lls_ele_out(_this , e)
{
	on_mouse_out_anime(_this);
	let me = _this
	let my_father = _this.parentNode.parentElement.parentElement
	let now_my_new_area = me.my_new_area

	setTimeout(
		function()
		{
			if(me.my_new_area === now_my_new_area)
			{
				if(my_father.mouse_in_me || (my_father.forward_father && my_father.forward_father.mouse_in_me))
				{
					me.my_new_area.classList.add("sub_outing")
				}
			}
		},
		500
	)
	setTimeout(
		function()
		{
			if(me.my_new_area === now_my_new_area)
			{
				if(my_father.mouse_in_me || (my_father.forward_father && my_father.forward_father.mouse_in_me))
				{
					//console.log("delete because leave button")
					me.my_new_area.classList.remove("sub_outing")
					delete_a_child(me.my_new_area)
					me.my_new_area = undefined
				}
			}
		},
		1000
	)
	
}

function give_all_lls_ele_event(element)
{
	lls = element.getElementsByClassName("left_list")
	for(var i = 0;i < lls.length;i++)
	{
		lls[i].onmouseenter = function (e){
			lls_ele_enter(this , e)
		}

		lls[i].onmouseout = function (e){				
			lls_ele_out(this , e)
		}
		
	}
}

function init()
{	
	update_width()
	init_area["my_number"] = 1
	show_mouse_env(init_area)
	give_all_lls_ele_event(init_area)

}

init()
