from config import DOMAIN, LOCALPATH, NGINX_PATH, NGINX_ENABLED_PATH, NAME
import os 

template = '''
user www-data;
server {
	listen 80;
	server_name %s;

    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias %s/static/;
    }

    location /media/ {
        alias %s/medias/;
    }
}''' % (DOMAIN, LOCALPATH, LOCALPATH)

if __name__ == "__main__": 
    with open(f"{NGINX_PATH}/{NAME}", "w") as f:
        f.write(template)
    os.system(f"rm {NGINX_ENABLED_PATH}/{NAME}")
    os.system(f"sudo ln -s {NGINX_PATH}/{NAME} {NGINX_ENABLED_PATH}")
    pass