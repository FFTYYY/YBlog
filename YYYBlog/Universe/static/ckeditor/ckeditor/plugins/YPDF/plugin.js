(function() {

	var plugin_command = {
		exec: function(editor) {
			var text = editor.getData()

			var to_insert = "【PDF开始】这里写URL【PDF结束】"

			editor.insertHtml(to_insert);
		}
	}

	var plugin_name = "YPDF"
	CKEDITOR.plugins.add(plugin_name, {
		init: function(editor) {
			editor.addCommand(plugin_name, plugin_command)
			editor.ui.addButton("YPDF", {
				label: "PDF代码示例", 
				icon: this.path + "icon.gif",
				command: plugin_name
			});
		}
	})
})()

