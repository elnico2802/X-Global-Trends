<div align="center">
  <img src="assets/icons/icon-128.png" width="96" height="96" alt="X Global Trends">

# X Global Trends

**Tendencias globales y por país, integradas directamente en X.**

![Version](https://img.shields.io/badge/version-0.9.0-111111)
![Manifest](https://img.shields.io/badge/Manifest-V3-111111)
![Chrome](https://img.shields.io/badge/Chrome-compatible-111111)
![Brave](https://img.shields.io/badge/Brave-compatible-111111)
![Privacy](https://img.shields.io/badge/privacy-no%20tracking-111111)

</div>

X Global Trends es una extensión para Chrome y Brave que añade un panel compacto de tendencias a la barra lateral de X. Permite consultar **Global** y los países publicados por Trends24 sin salir de `x.com`.

> **Estado actual:** pre-release `0.9.0`. El núcleo funcional está estable y la versión se encuentra en fase de auditoría final previa a release candidate.

## ✨ Características

- 🌎 Tendencias **Global** y por país.
- 🌐 Países descubiertos dinámicamente desde Trends24.
- 🇪🇸 Nombres de países mostrados en español.
- 🧩 Integración nativa en la sidebar de X en `/home`, `/explore` y `/explore/*`.
- 💾 Persistencia automática del último país seleccionado.
- ⚡ Caché local de 7 minutos para reducir solicitudes innecesarias.
- 🧹 Deduplicación de tendencias repetidas.
- 🔄 Protección frente a respuestas de red fuera de orden.
- 🔗 Las tendencias se abren en una pestaña nueva de X.
- 🌗 Adaptación a modo claro y oscuro.
- 🧭 Compatibilidad con la navegación SPA de X sin duplicar el panel.
- 🔒 Sin cookies de X, `auth_token`, `ct0`, API keys, analytics ni servidor propio.

## 📸 Cómo funciona

El panel aparece en la barra lateral derecha de X:

1. Elegí **Global** o un país en el selector **PAÍS**.
2. La extensión consulta la fuente pública configurada.
3. Se muestran las tendencias disponibles en orden.
4. Al seleccionar una tendencia, se abre su búsqueda en X en una pestaña nueva.
5. El último país queda guardado localmente para la próxima sesión.

## 🚀 Instalación manual

Mientras la extensión no esté publicada en una store:

1. Descargá o cloná este repositorio.
2. Abrí `chrome://extensions` en Chrome o `brave://extensions` en Brave.
3. Activá **Modo de desarrollador**.
4. Elegí **Cargar descomprimida**.
5. Seleccioná la carpeta raíz de `X-Global-Trends`.
6. Abrí `https://x.com/home` o `https://x.com/explore`.

Para actualizar una instalación manual, descargá la versión nueva y pulsá **Recargar** en la tarjeta de la extensión.

## 🔐 Privacidad

La extensión está diseñada con una superficie de datos mínima:

- no recopila datos personales;
- no lee ni almacena cookies de X;
- no usa tokens de autenticación de X;
- no lee mensajes privados;
- no publica contenido;
- no usa analytics;
- no envía datos a un servidor propio.

`chrome.storage.local` se utiliza únicamente para:

- caché temporal de respuestas de Trends24;
- recordar la última ubicación seleccionada.

La política completa está disponible en [PRIVACY.md](PRIVACY.md).

## 🔑 Permisos

| Permiso / acceso | Motivo |
|---|---|
| `storage` | Caché local y persistencia del último país. |
| `https://trends24.in/*` | Consultar páginas públicas del proveedor de tendencias. |
| `https://x.com/*` | Insertar la interfaz de X Global Trends dentro de X. |
| `assets/icons/icon-32.png` como recurso web accesible | Mostrar el icono oficial dentro del panel integrado en X. |

No se solicitan permisos adicionales para historial, pestañas, cookies, identidad o datos de cuenta.

## 📡 Fuente de datos

El proveedor actual es **Trends24**. X Global Trends no calcula un ranking propio: muestra y procesa los datos públicamente disponibles a través del proveedor.

X Global Trends es un proyecto independiente y **no está afiliado, patrocinado ni respaldado por X ni por Trends24**.

## ⚠️ Limitaciones actuales

- La cobertura geográfica depende de las ubicaciones publicadas por Trends24.
- Uruguay no está disponible actualmente como ubicación propia en el proveedor.
- Noticias, Deportes y Entretenimiento no se muestran porque todavía no existe una fuente pública que permita combinarlas de forma fiable con el país elegido respetando los requisitos actuales de privacidad y coste.
- Cambios en el HTML de X o Trends24 pueden requerir ajustes futuros en la extensión.

## 💎 Filosofía Freemium

El objetivo es mantener un **núcleo gratuito útil y respetuoso con la privacidad**. Funciones premium futuras solo se evaluarían si aportan valor adicional real; la versión gratuita no se convertirá artificialmente en una demo inutilizable.

Hoy `0.9.0` no contiene funciones de pago ni sistema de cobros.

## 🗺️ Roadmap

El detalle actualizado está en [ROADMAP.md](ROADMAP.md). Prioridades posteriores a `0.9.0`:

- ampliar cobertura geográfica si aparece una fuente compatible;
- investigar categorías reales sin depender de credenciales privadas;
- favoritos y preferencias adicionales;
- preparar distribución en Chrome Web Store;
- definir, más adelante, funciones opcionales para una capa Pro.

## 🧪 Release y calidad

La lista de validaciones para la release candidate está documentada en [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md).

Los cambios relevantes por versión se registran en [CHANGELOG.md](CHANGELOG.md).

## 🗂️ Estructura

```text
X-Global-Trends/
├─ assets/icons/        # Iconos oficiales
├─ src/
│  ├─ providers/        # Proveedores de tendencias
│  ├─ background.js     # Fetch y caché
│  ├─ content.js        # Integración con X / SPA
│  ├─ trends.js         # Localización de países
│  └─ ui.js             # Render del panel
├─ styles/trends.css    # Estilos del panel
├─ manifest.json        # Manifest V3
├─ PRIVACY.md
├─ ROADMAP.md
├─ RELEASE_CHECKLIST.md
└─ CHANGELOG.md
```

## 👤 Autor

**Nico Aguilar**  
X: https://x.com/NicoAguilarUY

---

<div align="center">
  <strong>X Global Trends · 0.9.0</strong><br>
  Hecho para consultar el mundo sin salir de X.
</div>
