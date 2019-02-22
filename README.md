一个不知所云的博客系统...

使用方法：

下载解压后，进入主目录（即README.md所在目录），然后先生成被忽略的必要文件：

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

>空间(名="文章",位置="Article_Zone","地址="whatever").save()

>quit()


然后就可以运行本地服务：
>python manage.py runserver

然后在浏览器中输入127.0.0.1/admin（总之就是 本机地址/admin）进入后台

