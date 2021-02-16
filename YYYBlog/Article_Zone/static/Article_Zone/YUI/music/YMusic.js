function draw_music(element , width , height , fillcolor , fillbackcolor) 
{
	var VF = Vex.Flow

	var render_container = document.createElement("span") //在这个新建的span内画图
	var renderer = new VF.Renderer(render_container, VF.Renderer.Backends.SVG)
	renderer.resize(width , height)
	context = renderer.getContext()
	context.setFillStyle(fillcolor).setStrokeStyle(fillcolor).setBackgroundFillStyle(fillbackcolor)

	// ---------- 第一步解析 ----------
	var content = element.innerText.trim().match(/【([\S\s]*?)】\s*【([\S\s]*?)】/)
	var meta_info = content[1] // 元信息部分
	var note_info = content[2] //音符信息部分

	// ---------- 画谱 ----------
	meta_info 	   	= meta_info.trim().split("，")
	var clef 	   	= meta_info[0].trim() //谱号
	var num_lines  	= parseInt( meta_info[1].trim() ) //线数
	var beat_value 	= parseInt( meta_info[2].trim() ) //时值
	var beat_num   	= parseInt( meta_info[3].trim() ) //拍数

	var stave_type = undefined // 0 for 五线谱，1 for 吉他谱
	var clef_type  = undefined
	var stave      = undefined
	if(clef == "高")
	{
		stave = new VF.Stave(0, 0, width, {num_lines : num_lines})
		stave.addClef("treble")
		stave.addTimeSignature(beat_value + "/" + beat_num)

		stave_type = "五线"
		clef_type  = "treble"
	}
	else if (clef == "吉他")
	{
		stave = new VF.TabStave(0, 0, width, {num_lines : num_lines})
		stave.addClef("tab")

		stave_type = "吉他"
	}
	else
	{
		throw "不支持的谱号！"
	}

	stave.setContext(context).draw();

	// ---------- 画音符 ----------
	var notes_to_render = []

	var notes = note_info.trim()
	notes = notes.split("|")
	for(var note of notes){
		note = note.trim()
		if(note == "") //允许空串
			continue
		note = note.match(/([\s\S]*?)\[([\dr]*)\]/)

		// 获得长度
		var beat_val = note[2].trim()

		// 获得音符
		var keys = note[1].trim()
		var keys_or_poses_to_render = [] // 对于五线谱是keys，对于吉他谱是positions
		keys = keys.split("、")
		for(var key of keys)
		{
			key = key.trim()
			if(stave_type == "五线")
			{
				keys_or_poses_to_render.push(key)
			}
			else if(stave_type == "吉他")
			{
				key = key.split("-")
				var str  = parseInt( key[0].trim() ) // 弦数
				var fret = parseInt( key[1].trim() ) // 品数

				keys_or_poses_to_render.push({str:str , fret:fret})
			}
		}

		if(stave_type == "五线")
		{
			notes_to_render.push(new VF.StaveNote({
				clef 	: clef_type, 
				keys 	: keys_or_poses_to_render, 
				duration: beat_val,
			}))
		}
		else if(stave_type == "吉他")
		{
			notes_to_render.push(new VF.TabNote({
				positions 	: keys_or_poses_to_render, 
				duration 	: beat_val,
			}))
		}
	}

	var voice = new VF.Voice({num_beats: beat_num ,  beat_value: beat_value})
	voice.addTickables(notes_to_render)

	var formatter = new VF.Formatter().joinVoices([voice]).format([voice], width)

	// ---------- 输出 ----------
	voice.draw(context, stave)	

	element.innerHTML = render_container.innerHTML	
}

function ymusic_parse(){
	var elements = document.getElementsByClassName("YMusic")
	for(var ele of elements){
		var w 				= ele.attributes.width
		var h 				= ele.attributes.height
		var fillcolor 		= ele.attributes.fillcolor
		var backfillcolor 	= ele.attributes.backfillcolor
		w = w ? w.value : 400
		h = h ? h.value : 200
		fillcolor 		= fillcolor 	? fillcolor.value 		: "#000000" //默认黑色
		backfillcolor 	= backfillcolor ? backfillcolor.value 	: "#00000000" //默认透明

		draw_music(ele , w , h , fillcolor , backfillcolor)
	}
}

