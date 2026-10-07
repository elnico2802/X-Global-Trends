# X Global Trends

Extensión Chrome/Brave (Manifest V3) que añade una barra de tendencias dentro de
`x.com/explore`. Consulta las páginas públicas de Trends24 desde un service
worker, con caché local de siete minutos y sin cookies, tokens, API keys ni servidor.

Las ubicaciones se descubren en la portada del proveedor y se filtran con el
catálogo de regiones estándar del navegador; el selector no incluye ciudades.

## Probarla

1. Abrí `chrome://extensions` o `brave://extensions`.
2. Activá **Modo de desarrollador**.
3. Elegí **Cargar descomprimida** y seleccioná esta carpeta del proyecto.
4. Abrí `https://x.com/explore`.

Los botones actualizan el estado visual sin recargar la página. Al navegar fuera
de Explorar la barra se retira; al volver, se inserta nuevamente sin duplicarse.

## Límites actuales

La única categoría funcional es **Todas**. X ofrece superficies como Tendencias,
Noticias, Deportes y Entretenimiento, pero Trends24 no proporciona una
clasificación pública fiable por tendencia, por lo que la extensión no inventa
esa clasificación.

Global se ofrece solo si Trends24 publica y enlaza una ubicación Worldwide. No
se calcula un ranking propio.
