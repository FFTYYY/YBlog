from config import DOMAIN, LOCALPATH, NGINX_PATH, NGINX_ENABLED_PATH
import os 

template = '''server {
	listen 80 default_server;
	listen [::]:80 default_server;
	server_name {domain};

    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias {localpath}/static/;
    }

    location /media/ {
        alias {localpath}/media/;
    }
};'''.format(domain = DOMAIN, localpath = LOCALPATH)

if __name__ == "__main__": 
    with open(NGINX_PATH, "w") as f:
        f.write(template)
    os.system(f"sudo ln -s {NGINX_PATH} {NGINX_ENABLED_PATH}")