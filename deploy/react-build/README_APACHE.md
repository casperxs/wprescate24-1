Despliegue en Apache (Linux)

1) Habilita módulos:
   sudo a2enmod rewrite headers expires deflate brotli http2
   sudo systemctl reload apache2

2) VirtualHost ejemplo (ajusta tu dominio y DocumentRoot):
<VirtualHost *:80>
  ServerName tu-dominio.com
  DocumentRoot /var/www/tu-dominio.com/public
  <Directory /var/www/tu-dominio.com/public>
    AllowOverride All
    Require all granted
    Options -Indexes
  </Directory>
  Protocols h2 h2c http/1.1
  ErrorLog ${APACHE_LOG_DIR}/tu-dominio-error.log
  CustomLog ${APACHE_LOG_DIR}/tu-dominio-access.log combined
</VirtualHost>

3) Copia el contenido de la carpeta build/ al DocumentRoot y asegúrate de incluir el archivo .htaccess.

4) HTTPS (recomendado): usa Certbot/Let’s Encrypt o el panel de tu hosting. Si usas :443, copia el bloque y añade SSLEngine on, SSLCertificateFile, SSLCertificateKeyFile, etc.

5) Cloudflare (opcional): Proxy naranja ON, Brotli y HTTP/3 ON, desactiva Rocket Loader.

6) Cache: Assets con hash tienen Cache-Control immutable 1 año; index.html no se cachea para permitir nuevas versiones.