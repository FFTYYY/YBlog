function start_ypdf(tags , pdfworker_path){

	// 初始化pdf.js worker
	pdfjsLib.GlobalWorkerOptions.workerSrc = pdfworker_path

	// 把所有标记替换class为_ypdf的div
	for(let tagname of tags)
	{
		$(tagname).each(function(){
			let t = $(this).html()
			t = t.replace("【PDF开始】" , "<div class = '_ypdf'>")
			t = t.replace("【PDF结束】" , "</div>")
			$(this).html(t)
		})
	}

	// 查找所有class = ypdf的div，查看其内容
	$("._ypdf").each(function(){
		let pre_h = $(this).height()
		let pre_w = $(this).width()

		let url   = $(this).text()
		$(this).html("")

		let loadingtask = pdfjsLib.getDocument(url)
		let me = this
		loadingtask.promise.then(function(pdf) {
			for(let page_i = 1;page_i <= pdf._pdfInfo.numPages;page_i++){
				pdf.getPage(page_i).then(function(page) {
					var canvas = $("<canvas></canvas>")[0]
					let ctx = canvas.getContext("2d")

					let page_wid = page._pageInfo.view[2] - page._pageInfo.view[0]
					let page_hei = page._pageInfo.view[3] - page._pageInfo.view[1]
					let scale = pre_w / page_wid
					canvas.height = page_hei * scale
					canvas.width  = page_wid * scale

					let viewport = page.getViewport( 1 * scale )

					//防止canvas绘图模糊
					deal_with_unclear_canvas(canvas , ctx)

					let rdcontext = {
						canvasContext: ctx,
						viewport: viewport,
					}
					page.render(rdcontext)

					me.appendChild(canvas)
				}
			)}
		})
	})
}
