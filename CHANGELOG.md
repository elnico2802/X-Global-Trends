# Changelog

Todos los cambios relevantes de X Global Trends se documentan aquí.

## [0.9.0] — 2026-10-07

Pre-release centrada en estabilidad, integración visual y preparación de distribución.

### Añadido

- Integración del panel en `/home`, `/explore` y `/explore/*`.
- Fuente pública de tendencias mediante Trends24.
- Descubrimiento dinámico de países disponibles.
- Nombres de países en español.
- Persistencia del último país seleccionado mediante `chrome.storage.local`.
- Caché local de 7 minutos.
- Deduplicación de tendencias repetidas.
- Apertura de tendencias en una pestaña nueva.
- Protección contra respuestas de red fuera de orden.
- Branding oficial en blanco y negro.
- Iconos oficiales de 16, 32, 48 y 128 px.
- Política de privacidad independiente.
- Documentación de roadmap y checklist de release.

### Mejorado

- Posicionamiento del panel junto al buscador de X.
- Compatibilidad con navegación SPA.
- Adaptación a tema claro y oscuro.
- Estados de carga y error.
- Ocultación reversible de módulos nativos seleccionados en la sidebar.
- Documentación del proyecto y permisos.

### Corregido

- Duplicación de numeración proveniente de listas ordenadas.
- Tendencias idénticas repetidas en una misma lista.
- Restauración y persistencia de país entre navegación y recargas.
- Superposición visual con el buscador sticky de X.
- Uso del branding oficial dentro del panel.

### Limitaciones conocidas

- La cobertura geográfica depende de Trends24.
- Uruguay no está disponible como ubicación propia en el proveedor actual.
- Las categorías Noticias, Deportes y Entretenimiento permanecen fuera de la interfaz hasta disponer de una fuente compatible y fiable.
- Cambios futuros en la estructura HTML de X o Trends24 pueden requerir mantenimiento.

### Monetización

- Se adopta una filosofía freemium para el futuro.
- `0.9.0` no incluye funciones de pago, suscripciones ni sistema de cobros.
