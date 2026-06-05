# Деплой на сервер

## 1. DNS (Cloudflare или любой регистратор)

Добавь три записи типа **A**:

| Имя    | Тип | Значение       | Прокси   |
|--------|-----|----------------|----------|
| `@`    | A   | `IP_СЕРВЕРА`   | ✅ или DNS only |
| `www`  | A   | `IP_СЕРВЕРА`   | ✅ или DNS only |
| `*`    | A   | `IP_СЕРВЕРА`   | DNS only ⚠️ |

> Wildcard `*` должен быть **DNS only** (серое облако в Cloudflare) — иначе SSL-сертификат не выпустится через DNS challenge.

---

## 2. SSL — wildcard сертификат

На сервере (Ubuntu/Debian):

```bash
# Установить certbot + Cloudflare DNS plugin
apt install certbot python3-certbot-dns-cloudflare -y

# Создать файл с токеном Cloudflare
mkdir -p /root/.secrets
cat > /root/.secrets/cloudflare.ini << EOF
dns_cloudflare_api_token = ВАШ_CLOUDFLARE_API_TOKEN
EOF
chmod 600 /root/.secrets/cloudflare.ini

# Выпустить wildcard сертификат
certbot certonly \
  --dns-cloudflare \
  --dns-cloudflare-credentials /root/.secrets/cloudflare.ini \
  -d domio.top \
  -d "*.domio.top" \
  --agree-tos \
  --email your@email.com
```

Сертификат будет в `/etc/letsencrypt/live/domio.top/`.

> Если не Cloudflare — используй другой DNS plugin: `python3-certbot-dns-route53`, `python3-certbot-dns-digitalocean` и т.д.

---

## 3. Nginx

```bash
# Установить Nginx
apt install nginx -y

# Скопировать конфиг
cp nginx.conf /etc/nginx/sites-available/domio.top
ln -s /etc/nginx/sites-available/domio.top /etc/nginx/sites-enabled/domio.top
rm -f /etc/nginx/sites-enabled/default

# Проверить и перезапустить
nginx -t && systemctl reload nginx
```

---

## 4. Запуск приложений

```bash
# Клонировать оба репо
cd /home/deploy-prod
git clone https://github.com/doryngal/domio.git
git clone https://github.com/doryngal/domio-shops.git

# Лендинг (порт 3030)
cd domio
docker compose up -d --build

# Shops (порт 3031)
cd ../domio-shops
cp .env.example .env.local
# Заполни DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL=https://shop.domio.top
docker compose up -d --build

# Миграции и seed (первый раз)
docker exec -it domio-shops-web-1 sh -c "npx prisma migrate deploy && npx prisma db seed"
```

---

## 5. Проверка

```
https://domio.top              → лендинг
https://shop.domio.top         → вход в панель продавца
https://founder.domio.top      → вход в панель фаундера
https://demo.domio.top         → витрина демо-магазина
```

---

## 6. Автообновление SSL

Certbot ставит cron автоматически. Проверить:

```bash
certbot renew --dry-run
```

---

## Переменные окружения для domio-shops на проде

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/domio_shops
NEXTAUTH_SECRET=<случайная-строка-минимум-32-символа>
NEXTAUTH_URL=https://shop.domio.top
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=domio-shops
R2_PUBLIC_URL=https://pub-xxx.r2.dev
```
