# React Build Artifact

Este directorio contiene el artefacto compilado de la landing React para despliegue en Plesk Windows (IIS).

Archivos
- react-build-v1.zip (SHA256 en SHA256SUMS.txt)

Cómo usar
1) Descarga `react-build-v1.zip` y descomprímelo en `httpdocs/` de tu sitio en Plesk.
2) Asegúrate de incluir `web.config` en la raíz.
3) Habilita compresión estática y URL Rewrite en IIS (normalmente activo en hosting Windows con Plesk).
4) Opcional: coloca Cloudflare delante del dominio para mayor velocidad.

Notas
- Este artefacto es frontend puro, sin backend.
- Para builds posteriores, versiona como `react-build-v2.zip`, etc.
