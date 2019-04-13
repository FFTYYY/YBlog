一个不知所云的博客系统...

使用方法：

下载解压后，进入项目目录（即README.md所在目录），然后先生成被忽略的必要文件：

>python ./utils/make_ignored_files.py

然后进入项目目录：

>cd YYYBlog

执行数据库迁移：

>python manage.py migrate

创建超级用户：

>python manage.py createsuperuser

然后照着他的提示完成创建用户

接下来在数据库中添加文章空间：

首先打开shell:
>python manage.py shell

然后在shell中：

>from Entry.models import 空间

>空间(名="文章",位置="Article_Zone","地址="文章").save()

>quit()


然后就可以运行本地服务：
>python manage.py runserver

然后在浏览器中输入127.0.0.1:8000/admin进入后台

在后台中 文章空间-节点s中添加节点主目录，地址写root，其他的随便。

然后输入127.0.0.1:8000就可以访问主目录了

之后可以在节点s中添加其他文章，每个文章节点都必须是主目录的后代，否则不会被访问到

要在远端部署也很简单，把/YYYBlog/settings.py中的DEBUG改成False，在ALLOWED_HOSTS加入服务器的域名，然后runserver后面加上0.0.0.0:80 --insecure(完整的命令就是python manage.py runserver 0.0.0.0:80 --insecure)然后用服务器域名取代以上的127.0.0.1:8000就行了。

