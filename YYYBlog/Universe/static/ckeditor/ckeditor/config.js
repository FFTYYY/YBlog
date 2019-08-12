/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.extraPlugins = 'YYYSpliter,YYYRegulizeSpliter,' + config.extraPlugins; 
	config.font_names = '宋体/宋体;黑体/黑体;仿宋/FangSong;楷体/KaiTi;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;' + config.font_names ;
	//config.extraPlugins = "yyy_spliter," + config.extraPlugins;

};
