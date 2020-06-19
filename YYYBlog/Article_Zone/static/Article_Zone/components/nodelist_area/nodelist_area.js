

function hid_one(one_div , one_but)
{//取消某个按钮和其对应的列表
	//通过控制其class来改变其css样式，从而达成显隐
	one_div.classList.remove("left_list_div_active")
	one_but.classList.remove("left_button_active")
}

function hid_all()
{//取消所有按钮和其对应的列表
	hid_one(div_son , but_son)
	hid_one(div_fat , but_fat)
	hid_one(div_bro , but_bro)
}
function show_one(one_div , one_but)
{//只激活某一个按钮和其对应的列表
	hid_all();
	one_div.classList.add("left_list_div_active")
	one_but.classList.add("left_button_active")
}

div_son = document.getElementById("left_list_sons")
div_fat = document.getElementById("left_list_fathers")
div_bro = document.getElementById("left_list_brothers")

but_son = document.getElementById("but_son")
but_fat = document.getElementById("but_fat")
but_bro = document.getElementById("but_bro")

/*
	考虑到对于文章，一般没有下属节点，因此默认显示兄弟节点
	而对于集，一般想要向下走，因此默认显示儿子节点
*/
if(node_type == 0)
	show_one(div_bro , but_bro)
else
	show_one(div_son , but_son)

but_son.onclick = function(){ show_one(div_son , but_son); }
but_fat.onclick = function(){ show_one(div_fat , but_fat); }
but_bro.onclick = function(){ show_one(div_bro , but_bro); }

//双击上行键直接跳到父亲，方便使用
if(node_has_father)
	but_fat.ondblclick = function(){ window.location.href = '../' + node_father_add }


/*
	因为css里没有unhover的伪类，如果直接给元素添加动画则其入场时也会有动画，这里是保证了其出场之
	后给其添加动画。
	如果几个列表来回切换的话，会有多次入场，而后面的入场也可能会因为前面添加了动画而有动画，因此要在
	动画结束后移除动画... 
*/

lls = document.getElementsByClassName("left_list")
for(var i = 0;i < lls.length;i++)
{
	lls[i].onmouseout = function (){
		//移除的同时立刻获得动画
		this.classList.add("left_list_unhover_anime")
		
		//因为动画的执行时间是0.5s，在0.5s后移除动画
		setTimeout(
			function (){
				this.classList.remove("left_list_unhover_anime")
			}.bind(this),
			500
		)
	}
}
