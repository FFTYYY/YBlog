var mouse_pos_x = 0
var mouse_pos_y = 0
var drag_start_x = 0
var rag_start_y = 0
var drag_start_top = 0
var drag_start_left = 0
var now_dragging = ""		//当前谁在被拖动

//监听鼠标移动事件
document.addEventListener('mousemove', function(e) {
	mouse_pos_x = e.clientX
	mouse_pos_y = e.clientY

	if(now_dragging !== "")
	{
		now_dragging.style.top = drag_start_top + (mouse_pos_y - drag_start_y)
		now_dragging.style.left = drag_start_left + (mouse_pos_x - drag_start_x)

		aaa = now_dragging

		if(parseInt(now_dragging.style.top) < 0)
			now_dragging.style.top = 0;

		if(parseInt(now_dragging.style.left) < 0)
			now_dragging.style.left = 0;

		if(parseInt(now_dragging.style.top) > window.innerHeight - now_dragging.offsetHeight)
			now_dragging.style.top = window.innerHeight - now_dragging.offsetHeight;

		if(parseInt(now_dragging.style.left) > window.innerWidth - now_dragging.offsetWidth)
			now_dragging.style.left = window.innerWidth - now_dragging.offsetWidth;
	}

})

document.addEventListener('mouseup', function(e) {
	now_dragging = ""
})

function make_dragable(comp , condi = function(e){return true})
{
	comp.onmousedown = function(e)
	{
		if(condi(e))
		{
			now_dragging = comp
			drag_start_x = mouse_pos_x
			drag_start_y = mouse_pos_y
			drag_start_top = comp.offsetTop
			drag_start_left = comp.offsetLeft
		}
	}
}