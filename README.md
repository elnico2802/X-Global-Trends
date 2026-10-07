# X Global Trends

MVP técnico de una extensión Chrome/Brave (Manifest V3) que añade una barra de
selección de tendencias dentro de `x.com/explore`.

La interfaz usa exclusivamente datos **DEMO / MOCK**: no consulta ni presenta
tendencias reales.

## Probarla

1. Abrí `chrome://extensions` o `brave://extensions`.
2. Activá **Modo de desarrollador**.
3. Elegí **Cargar descomprimida** y seleccioná esta carpeta del proyecto.
4. Abrí `https://x.com/explore`.

Los botones actualizan el estado visual sin recargar la página. Al navegar fuera
de Explorar la barra se retira; al volver, se inserta nuevamente sin duplicarse.

## Siguiente etapa

Antes de integrar datos reales, conviene evaluar un proveedor público y
reemplazable. X no ofrece una API pública gratuita y estable de tendencias por
país; no se debe depender de endpoints privados ni de cookies o tokens de sesión.
Si no surge una fuente pública fiable, la alternativa responsable requiere un
proveedor autorizado o un backend propio que consuma una fuente permitida.

La futura vista Global podrá combinar rankings reales con cobertura por país,
posición, recurrencia y volumen cuando estén disponibles. La fórmula se definirá
cuando exista una fuente de datos verificable.
