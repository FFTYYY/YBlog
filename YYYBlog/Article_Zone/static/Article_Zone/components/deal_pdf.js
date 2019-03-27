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
		if(make_same)
		{
			//改了颜色要更不明显
			//如果注释掉这个if，等于说强制反色，效果不一定好
			if(Math.abs(col[j] - target_color[j]) > Math.abs(col[j]))
				col[j] = target_color[j] - col[j]
		}
		else
		{
			//改了颜色要更明显
			if(Math.abs(col[j] - target_color[j]) < Math.abs(col[j]))
				col[j] = target_color[j] - col[j]
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

//setInterval(change_color, 20)
change_color( [0xFF,0xFF,0xFF] );