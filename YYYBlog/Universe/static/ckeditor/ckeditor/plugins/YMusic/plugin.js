(function() {

	var plugin_command = {
		exec: function(editor) {
			var text = editor.getData()

			var to_insert = "<span class=YMusic height=100 fillcolor='#CCCCCC'> 【吉他，4，4，4】【[1]|】 </span>"

			editor.insertHtml(to_insert);
		}
	}

	var plugin_name = "YMusic"
	CKEDITOR.plugins.add(plugin_name, {
		init: function(editor) {
			editor.addCommand(plugin_name, plugin_command)
			editor.ui.addButton("YMusic", {
				label: "乐谱", 
				icon: this.path + "icon.gif",
				command: plugin_name
			});
		}
	})
})()