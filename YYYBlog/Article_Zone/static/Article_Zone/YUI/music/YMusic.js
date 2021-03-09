
var ymusic_sampler = new Tone.Sampler({
			urls: {
				A0: "A0.MP3",
				A1: "A1.MP3",
				A2: "A2.MP3",
				A3: "A3.MP3",
				A4: "A4.MP3",
				A5: "A5.MP3",
				A6: "A6.MP3",
				A7: "A7.MP3",
			},
			baseUrl: "/static/Article_Zone/YUI/music/samples/", //TODO：解耦合
		}).toDestination();

function get_default_str_key(){ 
	/*默认的吉他调弦*/
	return {
		1: ["E" , "4"] , 
		2: ["B" , "3"] , 
		3: ["G" , "3"] , 
		4: ["D" , "3"] , 
		5: ["A" , "2"] , 
		6: ["E" , "2"] , 
	}
}

function pushkey(key , num){
	/*key形如：['A' , '5'] ，生成提高num半音的音*/

	var name2num = {
		"C":0,"C#":1,"Db":1,
		"D":2,"D#":3,"Eb":3,"E":4,"F":5,"F#":6,"Gb":6,
		"G":7,"G#":8,"Ab":8,"A":9,"A#":10,"Bb":10,"B":11,
	}
	var num2name = {}
	for(var x in name2num)
		num2name[ name2num[x] ] = x

	console.log()
	var num_semitone = name2num[key[0].trim()] + parseInt( key[1].trim() ) * 12 //原来的半音数
	num_semitone += num

	var newheight = parseInt(num_semitone / 12)
	var newname = num2name[num_semitone - 12 * newheight]

	return [newname , newheight]
}

function ymusic_play_music(bar_notes , bar_metas , speed){
	/*播放一段音乐

	参数：
		bar_notes：[notes,...]，一小节已经解析好的音乐
			notes: 一段解析好的音符描述
				格式：
				[ 
					{
						duration: 持续时间（几分音符）,
						keys： [key,...]
							对于五线谱，key是一个描述音高的字符串
							对于吉他谱，key是 {str：弦数, fret: 品数}
						modifiers: [modifier,...]
							modifier：额外描述符（目前只有和弦名）
					},
					...
				] ,
			注意bar_notes要分小节给出，否则无法正确确定临时升降号的作用范围
		bar_metas：解析好的每小节谱信息
	*/

	to_play = []

	for(var bar_idx in bar_notes){
	
		var notes = bar_notes[bar_idx]
		var metas = bar_metas[bar_idx]

		accidentials = {} //维护当前时间哪些音要升降。比如 accidentials[["C","5"]] = "b"
						  //在小节开头这个数组会被自动重置

		for(var x of notes){
			var keys = [] // 每一个key：[名字，高度]

			if(metas.stave_type == "五线"){
				for(var key of x.keys){
					var name   = key.match(/[a-gA-G]/)[0]
					var height = key.match(/\d+/)[0]
					keys.push([name,height])
				}
			}
			if(metas.stave_type == "吉他"){

				if(metas.str_key == undefined){
					if(bar_idx == 0)
						metas.str_key = get_default_str_key() //用默认调弦
					else
						metas.str_key = bar_metas[bar_idx-1].str_key //用上一个小节的调弦
				}

				for(var key of x.keys){
					var str  = parseInt(key.str)
					var fret = parseInt(key.fret)

					if(! (fret >= 0)) //不是个正常的音
						continue

					key = pushkey(metas.str_key[str] , fret) //找到这个音
					keys.push(key) //加入列表
				}
			}


			for(var mod of x.modifiers){
				if(mod.type != "accidental") //不是临时升降号
					continue
				if(mod.value == "n")    //还原号
					accidentials[keys[mod.idx]] = undefined
				else 					//升降号
					accidentials[keys[mod.idx]] = mod.value
			}

			//把至今为止所有的升降号作用这个音符上
			for(var i in keys){
				var key = keys[i]
				var acc = accidentials[key] ? accidentials[key] : "" //这个位置的升降号
				keys[i] = key[0] + acc + key[1] //类似C#5
			}

			if(x.duration.match("r")){ //休止符
				keys = []
			}

			to_play.push({
				keys: keys,
				duration: 1.0 / parseInt(x.duration), //多少个全音符
			})
		}
	}

	semibreve = speed //一个音符，一秒

	for(var i = to_play.length-1;i >= 0;i--){
		if(to_play[i].keys.length <= 0){
			if(i > 0)
			{
				to_play[i-1].duration += to_play[i].duration
				to_play[i].duration = 0
			}
		}

	}

	const now = Tone.now()
	let time_cnt = 0
	for(var x of to_play){
		if(x.duration <= 0)
			continue
		let true_duration = Math.min(x.duration + 0.2 , x.duration * 2)  * semibreve//实际演奏的时长
		ymusic_sampler.triggerAttackRelease(x.keys , true_duration , now + time_cnt)
		time_cnt += x.duration * semibreve
	}

}

function ymusic_GetStaveClefType(clef){
	/*将输入的谱号，转化为谱类型+谱号类型

	参数: 
		clef 输入的谱号。
	返回值：
		[谱类型,谱号类型]
	*/

	var stave_type = undefined
	var clef_type  = undefined
	var str_key    = undefined //调弦

	if(clef == "高")
	{
		stave_type = "五线"
		clef_type  = "treble"
	}
	else if (clef.startsWith("吉他"))
	{
		stave_type = "吉他"
		clef_type  = "tab"

		var str_info = clef.match(/吉他([\s\S]*)/)[1].trim() //除了开头的吉他之外的部分
		if(str_info != ""){ // 没给出调弦信息则保留undefined
			str_info = str_info.match(/：([\s\S]*)/)[1].trim().split("、")//挑出冒号，剩下以顿号隔开
			str_key = {}
			for(var i in str_info){
				str_key[parseInt(i)+1] = str_info[i].trim().split("/") //从一弦开始。每个音形如A/5
			}
		}
	}
	else
	{
		throw "不支持的谱号！"
	}

	return [stave_type , clef_type , str_key]

}

function ymusic_AutoHeight(height , stave_type , num_lines){
	/*根据输入的谱类型线数自动决定高度
	
	参数：
		height：输入的高度，仅当height='auto'时本函数会运作。
		stave_type：谱类型。
		num_lines：线数。注意线数应包括隐藏的线数。
	返回：
		推荐的绘图高度

	*/
	if(height != "auto")
		return parseInt(height)

	if (stave_type == "五线")
		return 10 * num_lines

	if (stave_type == "吉他")
		return 15 * num_lines

	throw "错误！"
}

function ymusic_AutoTopBotspace(stave_type){
	/*根据谱的类型不同自动决策上下额外加多少条线
	
	参数：
		stave_type：谱类型。
	返回：
		推荐的上下加线数

	*/

	if (stave_type == "五线")
		return [2,2]

	if (stave_type == "吉他")
		return [1,1]

	throw "错误！"

}

function ymusic_parse_notes(note_info , metas){
	/*给定音符描述文本，生成结构化的描述

	参数：
		note_info：描述音符的文本
		metas：解析好的谱信息
	返回：
		[ 
			[ 
				{
					duration: 持续时间（几分音符）,
					keys： [key,...]
						对于五线谱，key是一个描述音高的字符串
						对于吉他谱，key是 {str：弦数, fret: 品数}
					modifiers: [modifier,...]
						modifier：额外描述符（目前只有和弦名）
				},
				...
			] ,
			[
				{
					duration: 持续时间（几分音符）,
					text： 注释文本,
					posi：注释文本的位置，第几行（以第一条线的上方为第0行）
				},
				...
			] 
		]

	*/
	var parsed_notes = []
	var parsed_texts = []

	var notes = note_info.trim()
	notes = notes.split("|")
	for(var note of notes){
		note = note.trim()
		if(note == "") //允许空串
			continue
		note = note.match(/([\s\S]*?)\[([\dr]*)\]/)

		// 获得长度
		var duration = note[2].trim()

		// 这个位置的音符
		var keys = note[1].trim()
		var parsed_note_keys = [] // 对于五线谱是keys，对于吉他谱是positions

		// 这个位置的注释
		var parsed_text 	 = "" // 所有文本
		var parsed_text_pos = -1 

		// 这个位置的和弦描述
		var modifiers = []

		//解析所有提供的信息
		keys = keys.split("、")
		var note_cnt = 0 //当前是第几个音符
		for(var key of keys){
			key = key.trim()
			key = key.split("：") //同一个音的多个描述用：隔开

			if(key[0].trim() == "和"){ 					//是一个和弦描述
				var chord = key[1]
				modifiers.push({type: "chord" , value: chord})
			}
			else if(key[0].trim() == "文"){ 				//是一个文本
				var text = key[1]
				parsed_text += text

				if(key.length > 2){
					posi = parseInt(key[2])
					parsed_text_pos = posi //覆盖之前的，所有文本只能有一个高度
				}
			}
			else{										//是一个正常音符
				if(metas.stave_type == "五线"){ 	//五线谱音符
					parsed_note_keys.push(key[0])

					if(key.length > 1){
						modifiers.push({type: "accidental" , value: key[1].trim() , idx: note_cnt})
					}

				}
				if(metas.stave_type == "吉他"){ 	//吉他音符
					key = key[0].trim().split("-")
					var str  = parseInt(key[0].trim())  // 弦数
					var fret = key[1].trim() 			// 品数

					parsed_note_keys.push({str:str , fret:fret})
				}
			}
			note_cnt += 1
		}

		parsed_notes.push({duration: duration , keys: parsed_note_keys , modifiers: modifiers})
		parsed_texts.push({duration: duration , text: parsed_text , posi: parsed_text_pos})
	}

	return [ parsed_notes , parsed_texts ]
}


function ymusic_parse_meta(meta_info , width , height){
	/*给定谱信息字符串，解析生成结构化的元信息描述

	参数：
		meta_info：谱信息字符串
		width：用户要求的绘图宽度（如果是'auto'，则自动决策）
		height：用户要求的绘图高度（如果是'auto'，则自动决策）
	返回：
		一个列表，描述各种谱相关的信息
	*/
	// 获取元信息
	meta_info 		= meta_info.trim().split("，")
	var clef 	   	= meta_info[0].trim() //谱号
	var beat_value 	= parseInt( meta_info[2].trim() ) //时值
	var beat_num   	= parseInt( meta_info[3].trim() ) //拍数
													  // 类型
	var [stave_type , clef_type , str_key] = ymusic_GetStaveClefType(clef)
													  //线数
	var num_lines = meta_info[1].trim()
	var [extra_topspace , extra_botspace] = ymusic_AutoTopBotspace(stave_type)
	extra_botspace -= 1 //好像Vexflow默认会在下面加一个，去掉之
	while(num_lines.endsWith("+") || num_lines.endsWith("-")){// 检查末尾有多少个加减号
		if(num_lines.endsWith("+")) //加号增加下方行数
			extra_botspace += 1
		if(num_lines.endsWith("-")) //减号增加上方行数
			extra_topspace += 1
		num_lines = num_lines.substr(0,num_lines.length-1) //去掉这个加减号
	}
	num_lines = parseInt(num_lines) //把去掉加减号之后的部分转成数字

	//计算宽高
	if(width == "auto")
		width = 30 + 280 * (beat_num / beat_value)
	height = ymusic_AutoHeight(height , stave_type , num_lines + extra_botspace + extra_topspace)


	return {
		"stave_type" : stave_type ,
		"clef_type"  : clef_type , 
		"num_lines"  : num_lines , 

		"beat_value" : beat_value ,
		"beat_num"   : beat_num ,  

		"topspace"   : extra_topspace , 
		"botspace"   : extra_botspace , 
		"height"     : height , 
		"width"    	 : width , 
		"str_key" 	 : str_key , 
	}
}

function ymusic_draw_music_onebar(ctx , meta_info, note_info, offset, last_meta){
	/*给定各种解析好的信息，绘制一个小节的乐谱

	参数：
		ctx：绘图上下文
		meta_info：当前小节的谱信息
		note_info：当前小节的音符信息
		offset：绘图的x坐标偏移
		last_meta：上一个小节的谱信息（用来确定是否需要重新绘制谱号等）
	*/
	VF = Vex.Flow

	// ---------- 画谱 ----------
	var meta = meta_info

	// 创建stave
	stave = undefined
	if(meta.stave_type == "五线"){
		stave = new VF.Stave(offset, 0, meta.width, {num_lines : meta.num_lines})

		if(meta.clef_type != last_meta.clef_type) //跟前一个人不一样才绘制
			stave.addClef(meta.clef_type)
		if(meta.beat_num != last_meta.beat_num || meta.beat_value != last_meta.beat_value)
			stave.addTimeSignature(meta.beat_num + "/" + meta.beat_value)
	}
	if (meta.stave_type == "吉他"){
		stave = new VF.TabStave(offset, 0, meta.width, {num_lines : meta.num_lines})
		if(meta.clef_type != last_meta.clef_type) //跟前一个人不一样才绘制
			stave.addClef(meta.clef_type)
	}
	stave.options.space_above_staff_ln = meta.topspace //上方预留的空间
	stave.options.space_below_staff_ln = meta.botspace // 下方预留的空间
	stave.setContext(ctx).draw()

	// ---------- 画音符 ----------

	var [ parsed_notes , parsed_texts ] = note_info

	//音符
	var notes_to_render = []
	for(var nt of parsed_notes){ //取出所有解析出的音符信息，转成VF音符
		var the_note = undefined

		if(meta.stave_type == "五线"){
			the_note = new VF.StaveNote({
				clef 	: meta.clef_type, 
				keys 	: nt.keys, 
				duration: nt.duration,
			})
		}
		if(meta.stave_type == "吉他"){
			the_note = new VF.TabNote({
				positions 	: nt.keys, 
				duration 	: nt.duration,
			})
		}

		for(var mod of nt.modifiers){
			if(mod.type == "chord")
			{
				var chord = new VF.ChordSymbol().addGlyphOrText(mod.value)

				//这个库有点智障
				if(meta.stave_type == "五线")
					the_note.addModifier(0,chord)
				if(meta.stave_type == "吉他")
					the_note.addModifier(chord,0)
			}
			if(mod.type == "accidental")
			{
				var acc = new VF.Accidental(mod.value)
				the_note.addAccidental(mod.idx , acc)
			}
 
		}

		notes_to_render.push(the_note)
	}

	//注释文本
	var texts_to_render = []
	for(var nt of parsed_texts){ //取出所有文本信息，转成TextNote

		texts_to_render.push(
			new VF.TextNote({
				font: {
					family: "Arial",
					size: 12,
					weight: ""
				},
				text 	: nt.text + " ", 
				duration: nt.duration,
			})
			.setLine(nt.posi+3) // 为了让第一根线上方的空白刚好是0
			.setStave(stave)
			.setJustification(Vex.Flow.TextNote.Justification.LEFT)
		)
	}

	var voice_music = new VF.Voice({num_beats: meta.beat_num ,  beat_value: meta.beat_value})
	var voice_text  = new VF.Voice({num_beats: meta.beat_num ,  beat_value: meta.beat_value})
	voice_music.addTickables(notes_to_render)
	voice_text .addTickables(texts_to_render)

	var formatter = new VF.Formatter().joinVoices([voice_music , voice_text])
	formatter.format([voice_music , voice_text], meta.width - 30)
	voice_music.draw(ctx, stave)	
	voice_text .draw(ctx, stave)
}

function ymusic_parse(innertext , width , height){
	/*给定用户字符串，解析生成结构化的信息
	
	返回值：
		[[第i小节的谱信息,...] , [第i小节的音符信息,...]]
	*/
	//提取所有小节信息
	var meta_infos = []
	var note_infos = []
	while(innertext.length > 0){
		var content = innertext.trim().match(/【([\S\s]*?)】\s*【([\S\s]*?)】/)

		meta_infos.push(content[1])// 乐谱信息部分
		note_infos.push(content[2])// 音符信息部分

		innertext = innertext.substr(content[0].length , innertext.length) //删去匹配部分
		innertext = innertext.trim()
	}

	//解析所有信息
	for(var i in meta_infos){
		meta_infos[i] = ymusic_parse_meta (meta_infos[i] , width , height) 
		note_infos[i] = ymusic_parse_notes(note_infos[i] , meta_infos[i])
	}

	return [meta_infos , note_infos]
}

function ymusic_draw(meta_infos , note_infos , fillcolor , backfillcolor){
	/*给定解析好的所有信息，绘制乐谱

	参数：
		meta_infos：所有解析好的谱信息
		note_infos：所有解析好的音符信息
		fillcolor：画图颜色
		backfillcolor：音符背后的颜色（用来防止谱线遮挡音符），不需要的话可以直接设为透明
	*/
	var VF = Vex.Flow

	//初始化绘图环境
	var render_container = document.createElement("span") //在这个新建的span内画图
	var renderer = new VF.Renderer(render_container, VF.Renderer.Backends.SVG)
	var ctx = renderer.getContext()
	ctx.setFillStyle(fillcolor).setStrokeStyle(fillcolor)
	ctx.setBackgroundFillStyle(backfillcolor)
	
	//算出总高度、总宽度
	var height = 0
	var width  = 0
	for(var meta of meta_infos){
		height = Math.max(height , meta.height)
		width  += meta.width
	}
	renderer.resize(width , height) //必须在创建stave之前resize

	var offset = 0
	for(i in meta_infos){
		var meta_info = meta_infos[i]
		var note_info = note_infos[i]

		var last_meta = {}
		if(i > 0)
			last_meta = meta_infos[i-1]

		ymusic_draw_music_onebar(ctx , meta_info , note_info , offset , last_meta)
		offset += meta_info.width
	}

	return render_container
}

function ymusic_draw_music(element , width , height , fillcolor , backfillcolor , speed){
	/*解析指定元素的内容，并将内容替换为绘制好的图像

	参数：
		element：用来提供绘图信息的元素
		width：用户要求的宽度
		height：用户要求的高度
		fillcolor：画图颜色
		backfillcolor：音符背后的颜色（用来防止谱线遮挡音符），不需要的话可以直接设为透明
	*/

	let [meta_infos , note_infos] = ymusic_parse(element.innerText.trim() , width , height)
	let render_container 		  = ymusic_draw(meta_infos , note_infos , fillcolor , backfillcolor)

	//提取出音符
	let music_notes = []
	for(var [mnotes , tnotes] of note_infos){
		music_notes.push(mnotes)
	}

	//创建元素
	element.innerHTML = render_container.innerHTML

	//创建播放音乐的按钮
	element.onclick = function(){ymusic_play_music(music_notes , meta_infos , speed)}
	
}


function start_ymusic(){
	var elements = document.getElementsByClassName("YMusic")
	for(var ele of elements){
		var er = ele.attributes
		width 			= er.w 				? parseInt(er.w.value) 		: "auto" // auto: 每个4分音符占50px
		height 			= er.h 				? parseInt(er.h.value) 		: "auto"
		fillcolor 		= er.fillcolor 		? er.fillcolor.value 		: "#000000" //默认黑色
		backfillcolor 	= er.backfillcolor  ? er.backfillcolor.value 	: "#00000000" //默认透明
		topspace 		= er.topspace 		? parseInt(er.topspace.value) : "auto"
		speed   		= er.speed 			? parseInt(er.speed.value)  : 1.0
		ymusic_draw_music(ele , width , height , fillcolor , backfillcolor , speed)
	}
}
