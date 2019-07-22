father = document.getElementById("node_list_area_flexible");
init_area = document.getElementById("init_area");
num_of_new = 0
the_wid = init_area.offsetWidth
function init()
{
	lls = document.getElementsByClassName("left_list")
	for(var i = 0;i < lls.length;i++)
	{
		lls[i].onmouseenter = function (){
			if(the_wid == 0)
				the_wid = init_area.offsetWidth

			new_area = init_area.cloneNode(true);
			new_area.id = "new_area" + num_of_new;
			num_of_new ++;
			new_area.style.left = the_wid*num_of_new + "px";


			this.my_new_area = new_area

			father.appendChild(new_area);
			father.style.width = the_wid*(1+num_of_new) + "px";
		}

		lls[i].onmouseout = function (){
			on_mouse_out_anime(this);
			let me = this
			setTimeout(
				function()
				{
					father.removeChild(me.my_new_area);
					father.offsetWidth -= the_wid;
					num_of_new --;			
					father.style.width = the_wid*(1+num_of_new) + "px";

				},
				300
			)
		}

	}

}

init()
