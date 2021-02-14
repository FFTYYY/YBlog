(function() {

    var number2word = function(num)
    {
        s = "" + num
        s = s.replace( new RegExp("0" , "g") , "〇")
        s = s.replace( new RegExp("1" , "g") , "一")
        s = s.replace( new RegExp("2" , "g") , "二")
        s = s.replace( new RegExp("3" , "g") , "三")
        s = s.replace( new RegExp("4" , "g") , "四")
        s = s.replace( new RegExp("5" , "g") , "五")
        s = s.replace( new RegExp("6" , "g") , "六")
        s = s.replace( new RegExp("7" , "g") , "七")
        s = s.replace( new RegExp("8" , "g") , "八")
        s = s.replace( new RegExp("9" , "g") , "九")
        return s
    }

    var the_reg = "【[\\s\\S]*?】<a[\\s]*?id=\"[\\s\\S]*?\"[\\s]*?name=\"[\\s\\S]*?\"></a>"
    var the_name = "[〇一二三四五六七八九]+"

    var regulize_section = function(text)
    {
        count = 0
        start_pos = 0
        while(true)
        {
            mat = text.substr(start_pos).match(new RegExp(the_reg))
            if (mat == null)
                break

            count ++

            sub_st = start_pos + mat.index
            sub_ed = sub_st + mat[0].length
            the_substr = text.substr(sub_st , mat[0].length)

            new_name = number2word(count)

            the_substr = the_substr.replace(new RegExp(the_name,"g") , new_name)

            text = text.substr(0,sub_st) + the_substr + text.substr(sub_ed)


            start_pos = sub_st + the_substr.length
        }

        return text
    }

    var ask_selection = function(text)
    {
        res = text.match(new RegExp(the_reg , "g"))
        if(res == null)
            return 0
        return res.length
    }

    var a = {
        exec: function(editor) {
            text = editor.getData();
            new_text = regulize_section(text)
            editor.setData(new_text);
        }
    },

    b='YYYRegulizeSpliter';
    CKEDITOR.plugins.add(b, {
        init: function(editor) {
            editor.addCommand(b, a);
            editor.ui.addButton("YYYRegulizeSpliter", {
                label: '重设所有段落名', 
                icon: this.path+"icon.gif",
                command: b
            });
        }
    }); 
})();