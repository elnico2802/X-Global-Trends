# Roadmap — X Global Trends

Este documento resume la dirección del proyecto sin prometer fechas ni funcionalidades que todavía no estén implementadas.

## 0.9.x — Estabilidad y preparación de lanzamiento

- Auditoría final en Chrome y Brave.
- Validación de instalación limpia.
- Revisión de errores de carga, navegación SPA y persistencia.
- Empaquetado de una release candidate limpia.
- Preparación de materiales para distribución.

## 1.0 — Primera versión pública estable

Objetivo: publicar una versión gratuita, útil y sencilla de instalar.

Prioridades:

- comportamiento estable en `/home` y `/explore`;
- selector de país fiable;
- persistencia de preferencias;
- privacidad y permisos mínimos;
- documentación completa;
- distribución mediante GitHub y, si se aprueba, Chrome Web Store.

## Después de 1.0

### Cobertura geográfica

Investigar fuentes públicas que permitan ampliar países sin introducir:

- API keys privadas;
- credenciales de la cuenta de X;
- cookies de sesión;
- servidor propio obligatorio;
- costes recurrentes incompatibles con el núcleo gratuito.

Uruguay queda como caso prioritario de investigación.

### Categorías reales

Revisar de forma periódica si aparece una fuente fiable para:

- Noticias;
- Deportes;
- Entretenimiento.

La condición es poder combinarlas de forma clara con la geografía seleccionada sin inventar clasificaciones.

### Preferencias

Posibles mejoras gratuitas:

- países favoritos;
- accesos rápidos;
- orden personalizado;
- más opciones de visualización;
- mejoras de accesibilidad.

## Filosofía Freemium

El proyecto adopta una filosofía freemium:

- el núcleo gratuito debe seguir siendo útil por sí mismo;
- ninguna función básica existente se degradará artificialmente para forzar un pago;
- una futura capa Pro solo tendrá sentido si incorpora valor adicional real;
- no hay funciones de pago implementadas en `0.9.0`.

Ideas Pro futuras, sujetas a viabilidad técnica y demanda real:

- alertas personalizadas;
- seguimiento de tendencias favoritas;
- comparativas entre ubicaciones;
- vistas históricas o analíticas avanzadas;
- funciones adicionales que requieran infraestructura o proveedores externos.

Estas ideas no constituyen compromisos de producto.
