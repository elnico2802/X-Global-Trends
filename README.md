# X Global Trends

X Global Trends es una extensión para Chrome y Brave que consulta tendencias
globales y por país directamente desde X, con un panel integrado en la barra
lateral.

## Características

- Tendencias Global y por los países disponibles dinámicamente en Trends24.
- Nombres de países en español.
- Integración en la barra lateral de X en `/home`, `/explore` y rutas de
  Explorar.
- Persistencia automática del último país elegido.
- Caché local temporal de siete minutos.
- Deduplicación de tendencias y protección ante respuestas de red fuera de
  orden.
- Apertura de cada tendencia en una nueva pestaña de X.
- Adaptación a los temas claro y oscuro de X.
- Integración segura con la navegación SPA de X.

## Instalación manual

1. Descargá o cloná este proyecto.
2. Abrí `chrome://extensions` en Chrome o `brave://extensions` en Brave.
3. Activá **Modo de desarrollador**.
4. Elegí **Cargar descomprimida** y seleccioná la carpeta del proyecto.
5. Abrí `https://x.com/home` o `https://x.com/explore`.

## Uso

El panel aparece en la barra lateral derecha de X. Elegí **Global** para ver la
ubicación mundial publicada por Trends24 o seleccioná un país en el selector
**PAÍS**. Al hacer clic en una tendencia, su búsqueda se abre en una nueva
pestaña. La extensión recuerda automáticamente tu última ubicación.

## Privacidad

X Global Trends no recopila datos personales, no accede ni almacena cookies de
X, no accede a tokens de autenticación, no publica contenido y no lee mensajes
privados. No requiere cuentas externas, no usa analytics y no envía datos a un
servidor propio.

La extensión consulta páginas públicas de Trends24. Usa `chrome.storage.local`
solamente para una caché temporal de respuestas y para recordar el último país
seleccionado.

## Permisos

- `storage`: necesario para la caché local y la persistencia del último país.
- `https://trends24.in/*`: necesario para consultar la fuente pública de
  tendencias.
- `https://x.com/*`: la extensión se ejecuta únicamente para integrar su
  interfaz en X.

## Fuente de datos

Trends24 es el proveedor actual de datos. X Global Trends no está afiliado a X
ni a Trends24, no calcula un ranking propio y muestra los datos disponibles
públicamente a través del proveedor.

## Limitaciones actuales

- La cobertura se limita a las ubicaciones que ofrece Trends24.
- Uruguay no está disponible actualmente en Trends24.
- Las categorías Noticias, Deportes y Entretenimiento no se muestran porque no
  existe una fuente pública fiable compatible con los requisitos de privacidad
  y coste del proyecto.
- Cambios en X o Trends24 pueden requerir adaptar la extensión.

## Estado

Pre-release 0.9.0.

## Autor

Nico Aguilar
X: https://x.com/NicoAguilarUY
