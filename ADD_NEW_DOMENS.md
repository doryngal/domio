📁 Добавление нового поддомена (на будущее)


# 1. Создать конфиг
nano /etc/nginx/sites-available/myapp.domio.top

# 2. Включить
ln -s /etc/nginx/sites-available/myapp.domio.top /etc/nginx/sites-enabled/

# 3. Проверить и перезагрузить
nginx -t && systemctl reload nginx