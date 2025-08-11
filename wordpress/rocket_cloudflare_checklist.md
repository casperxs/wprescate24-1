# Checklist WP Rocket + Cloudflare (velocidad extrema)

1) WP Rocket
- Cache: Enable for mobile, separate cache for mobile OFF, user cache OFF
- File Optimization: Minify CSS/JS ON; Combine CSS/JS OFF inicialmente; Optimize CSS delivery ON; Load JS deferred ON; Delay JS execution ON
- Media: LazyLoad images/iframes ON; Add missing image dimensions ON; WebP compatibility ON (si usas WebP)
- Preload: Preload cache ON; Preload links ON; Sitemap-based preloading ON
- Database: Limpieza semanal automática
- CDN: Si usas Cloudflare, integra la API o usa el add-on Cloudflare
- Exclusions (cuando tengas tracking): exclude fbq, gtag, googletagmanager de Delay JS

2) Cloudflare (plan Free suficiente)
- SSL/TLS: Full (strict) si el hosting lo soporta
- Speed > Auto Minify: JS/CSS/HTML ON
- Brotli ON
- Caching > Caching level: Standard; Browser cache TTL: 1 hora; Always Online ON
- Speed > Rocket Loader OFF (evita conflictos)
- Rules: Page Rule/Transform Rule para no cachear /wp-admin/* y preview
- Image Optimization: activa WebP y Polish si tienes plan Pro (opcional)

3) Imágenes
- Subir como WebP si es posible; dimensiones explícitas; peso &lt; 150KB en hero

4) Medición
- PageSpeed (móvil) objetivo LCP &lt; 2.5s, TBT &lt; 150ms
- WebPageTest/GTmetrix: revisa waterfall, busca terceros lentos

5) Seguridad
- Wordfence básico activado; 2FA; límite de intentos; ocultar /wp-admin si procede