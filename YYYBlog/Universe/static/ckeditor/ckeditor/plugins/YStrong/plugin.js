// this plugin is abandoned cause we can directly change the action of bold
(function() {

	var plugin_command = {
		exec: function(editor) {
			var text = editor.getData()
			var selected = editor.getSelection().getSelectedText()

			console.log(selected)

			var to_insert = "<span class = Y-color-text-lighter style = 'font-weight: bold;'>" + selected + "</span>"

			editor.insertHtml(to_insert);
		}
	}

	var plugin_name = "YStrong"
	CKEDITOR.plugins.add(plugin_name, {
		init: function(editor) {
			editor.addCommand(plugin_name, plugin_command)
			editor.ui.addButton("YStrong", {
				label: "强！", 
				icon: this.path + "icon.gif",
				command: plugin_name
			});
		}
	})
})()