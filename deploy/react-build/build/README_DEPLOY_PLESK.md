# React Landing - Deploy en Plesk Windows (IIS)

Contenido del ZIP: estático de producción generado con CRA + Tailwind + shadcn.

Pasos de despliegue
1) En Plesk (sitio de la landing) > Files > httpdocs
   - Sube y extrae el contenido del ZIP (los archivos sueltos y la carpeta static/). Asegúrate que `web.config` quede en la raíz de httpdocs.
2) Requisitos del servidor (normalmente ya activos):
   - Módulo URL Rewrite
   - Compresión estática habilitada
3) HTTPS: fuerza HTTPS desde Plesk > Hosting Settings o con regla adicional.
4) Cloudflare (recomendado): proxy naranja ON, Auto‑Minify ON, Brotli ON, Early Hints ON, HTTP/3 ON. No cachear `index.html`.

Variables/Tracking
- No requiere backend. Si en el futuro usas API, define REACT_APP_BACKEND_URL en tiempo de build y vuelve a generar.

Soporte SPA
- `web.config` redirige todas las rutas de React a `/index.html` y define MIME types y cache para assets.

Performance
- JS gzip ≈ 160 KB, CSS gzip ≈ 10 KB
- Considera auto‑hospedar la fuente y usar WebP local para la imagen del hero para aún mejor puntuación de PSI móvil.
