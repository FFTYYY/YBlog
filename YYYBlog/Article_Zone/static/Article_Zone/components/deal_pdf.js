function triple2color(col)
{
	str = "#"
	for(var i = 0;i < 4;i++)
	{
		var s = col[i].toString(16)
		while(s.length < 2)
			s = '0' + s
		str = str + s
	}
	return str
}

function color2triple(col)
{
	col = col.replace(/[^0-9]/ig," ")
	col = col.split(" ")
	y = []
	for(var i = 0;i < col.length;i++)
	{
		if(col[i] != "")
			y[y.length] = parseInt(col[i])
	}
	while(y.length > 4)
		y.pop()
	while(y.length < 4)
		y[y.length] = 255
	return y
}

function color_transform(col , make_same , target_color)
{/*
	对于一个颜色和目标颜色，修改此颜色
	make_same为true时尽量让修改后的颜色和目标颜色颜色相同，为false时尽量相异
	输入格式：col : rgba(r,g,b,a)(字符串)
*/

	col = color2triple(col)

	for(var j = 0;j < 3;j++)
	{
		var c1 = Math.abs(col[j] - target_color[j]);
		var c2 = col[j] - target_color[j];
		if(make_same)
		{
			//改了颜色要更不明显
			if(Math.abs(c1 - target_color[j]) < Math.abs(c2 - target_color[j]))
				col[j] = c1;
			else col[j] = c2;
		}
		else
		{
			//改了颜色要更明显
			if(Math.abs(c1 - target_color[j]) > Math.abs(c2 - target_color[j]))
				col[j] = c2;
			else col[j] = c1;
		}
	}

	return triple2color(col)
}

function deal_cssrule(cssrule , target_color)
{//对于一个css选择器，以底色为target_color来修改其颜色

	sty = cssrule.style

	if(sty === undefined)
		return

	//避免没有backgroundColor或者backgroundColor不是一个常数（比如是inherit）的情况
	if(sty.backgroundColor != undefined && sty.backgroundColor.startsWith("rgb"))
	{
		var bgcol = sty.backgroundColor
		sty.backgroundColor = color_transform(bgcol , true , target_color)
	}

	if(sty.color != undefined && sty.color.startsWith("rgb"))
	{
		var col = sty.color
		sty.color = color_transform(col , false , target_color)
	}
}

function change_color(target_color)
{//搜索每个css选择器，以底色为target_color来修改其颜色

	for(var i = 0;i < document.styleSheets.length;i++)
	{
		for(var j = 0;j < document.styleSheets[i].cssRules.length;j++)
		{
			cssrule = document.styleSheets[i].cssRules[j]

			if(cssrule.constructor == CSSKeyframesRule)
			{
				deal_cssrule(cssrule.cssRules[0] , target_color);
				deal_cssrule(cssrule.cssRules[1] , target_color);
			}
			else
			{
				deal_cssrule(cssrule , target_color)
			}

		}
	}
}

function deal_with_unclear_canvas(canvas , ctx)
{//网上找的代码
	var  devicePixelRatio = window.devicePixelRatio || 1;  

	var backingStoreRatio = ctx.webkitBackingStorePixelRatio || 
		ctx.mozBackingStorePixelRatio 	|| 
		ctx.msBackingStorePixelRatio 	|| 
		ctx.oBackingStorePixelRatio 	|| 
		ctx.backingStorePixelRatio 		|| 1;

	var ratio = devicePixelRatio / backingStoreRatio;

	var oldWidth = canvas.width; 
	var oldHeight = canvas.height; 
	canvas.width = oldWidth * ratio; 
	canvas.height = oldHeight * ratio; 
	canvas.style.width = oldWidth + 'px'; 
	canvas.style.height = oldHeight + 'px'; 
	ctx.scale(ratio, ratio);
}


function get_mean_color(canvas)
{
	var ctx = canvas.getContext("2d");

	var width = canvas.width;
	var height = canvas.height;

	var r = 0;
	var g = 0;
	var b = 0;

	var data = ctx.getImageData(0, 0, width, height).data;
 
	for (var row = 0; row < height; row++) {
		for (var col = 0; col < width; col++) {
			r += data[((width * row) + col) * 4];
			g += data[((width * row) + col) * 4 + 1];
			b += data[((width * row) + col) * 4 + 2];
		}
	}
 
	r /= (width * height);
	g /= (width * height);
	b /= (width * height);

	return [r,g,b]
}
