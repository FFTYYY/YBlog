一个博客系统

### 使用

##### 首先迁移数据库并创建超级用户
1. 下载解压后，进入项目目录（即README.md所在目录）：`cd YBlog`
2. 生成被忽略的必要文件： `python ./utils/make_ignored_files.py`
3. 进入主目录：`cd YYYBlog`
4. 执行数据库迁移：`python manage.py migrate`
5. 创建超级用户：`python manage.py createsuperuser`
6. 然后照着他的提示完成创建用户

##### 接下来在数据库中生成文章空间
1. 打开shell:`python manage.py shell`
2. 在shell中输入：
```
from Entry.models import 空间
空间(名="文章",位置="Article_Zone","地址="文章").save()
quit()
```
3. 如果要打开讨论区功能，可以在shell中输入：
```
空间(名="公开讨论",位置="Open_Discuss_Zone","地址="Discuss").save()
```

##### 运行本地服务了
1. 执行指令```python manage.py runserver```
2. 打开浏览器，通过地址127.0.0.1:8000可以访问网站主页，通过网址127.0.0.1:8000/admin可以进入后台

### 其他事项
1. 为了网站的主目录可以正常显示，需要先在后台中的『节点s』中添加一个节点，地址写root，其他的随便。
2. 之后可以在节点s中添加其他文章，每个文章节点都必须是主目录的后代，否则不会被访问到。
3. 如果要在远端部署，把/YYYBlog/settings.py中的DEBUG改成False，在ALLOWED_HOSTS加入服务器的ip或域名（也可以直接写\*），然后runserver后面加上0.0.0.0:80 --insecure(完整的命令就是`python manage.py runserver 0.0.0.0:80 --insecure`)然后用服务器ip或域名取代以上的127.0.0.1:8000就行了。
4. 在后台的『讨论区s』可以新建和管理讨论区
