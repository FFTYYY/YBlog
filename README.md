A blog system based on `YText`. 

# Initialization

- create a file `yblog/extra_infos.py`, and fill it out based on the template provided in `yblog/extra_infos.py.template`
- creat a file `nginx/config.py`, and fill it out based on the template provided in `nginx/config.py.template`
- on `nginx/`: run `python make_nginx.py`.
- on `yblog/`: run `python manage.py createsuperuser`, and follow the instructions.
- on `yblog/`: run `python manage.py migrate`.

# Run server

- on `yblog/`: run `python manage.py collectstatic`.
- on any path: run `gunicorn --workers 3 yblog.wsgi:application --bing 127.0.0.1:8001`.
- make sure nginx is on: `sudo systemctl restart nginx`

