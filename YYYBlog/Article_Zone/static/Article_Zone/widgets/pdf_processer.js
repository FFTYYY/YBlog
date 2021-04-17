function start_ypdf(){

	/*查找所有class = ypdf的div，查看其内容*/
	$(".ypdf").each(function(){
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
