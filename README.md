A blog system based on `YText`. 

# Initialization

- create a file `yblog/extra_infos.py`, and fill it out based on the template provided in `yblog/extra_infos.py.template`
- creat a file `nginx/config.py`, and fill it out based on the template provided in `nginx/config.py.template`
- run `python manage.py createsuperuser`, and follow the instructions
- run `python manage.py migrate`.

# Run server

- run `gunicorn --workers 3 yblog.wsgi:application`.
- run `cd nginx && python make_nginx.py`