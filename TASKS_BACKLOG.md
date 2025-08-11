# Backlog de tareas

## Pendiente: Publicar ZIP de build React en GitHub
- Archivo a publicar: `/app/react-landing-build.zip`
- Contenido: build de producción (index.html, static/, web.config, README_DEPLOY_PLESK.md)
- Opciones de publicación:
  1) Commit directo al repositorio en `deploy/react-build/` (recomendado para versionar artefactos)
  2) GitHub Releases: crear un release `react-build-v1` y adjuntar el ZIP
- Checklist previo:
  - Verificar que el dominio productivo usa Plesk Windows (IIS)
  - Confirmar que Cloudflare está activo (proxy naranja) si se usará
- Notas: Esta versión es solo frontend estático; no incluye backend ni llamadas API.