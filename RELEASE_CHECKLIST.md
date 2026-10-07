# Release Checklist — X Global Trends 0.9.0

Lista de comprobación para considerar una compilación como release candidate.

## Instalación limpia

- [ ] Descargar o clonar el repositorio en una carpeta nueva.
- [ ] Abrir `chrome://extensions` o `brave://extensions`.
- [ ] Activar Modo de desarrollador.
- [ ] Cargar la extensión descomprimida.
- [ ] Confirmar que no aparecen errores en la tarjeta de la extensión.
- [ ] Confirmar que el icono oficial aparece correctamente.

## X — Inicio

- [ ] Abrir `https://x.com/home`.
- [ ] Verificar que existe una sola instancia de X Global Trends.
- [ ] Verificar que el panel aparece después del buscador y no se superpone.
- [ ] Verificar que el branding e icono oficial se muestran correctamente.
- [ ] Verificar que los módulos nativos configurados para ocultarse no aparecen.
- [ ] Verificar que otros módulos de X siguen funcionando.

## X — Explorar

- [ ] Abrir `https://x.com/explore`.
- [ ] Verificar que el panel sigue presente y no se duplica.
- [ ] Navegar por `/explore/*` y comprobar estabilidad SPA.

## Tendencias y países

- [ ] Cargar Global.
- [ ] Seleccionar al menos tres países distintos.
- [ ] Confirmar que no hay tendencias idénticas repetidas.
- [ ] Confirmar que la numeración es consecutiva.
- [ ] Confirmar que cada tendencia abre una pestaña nueva en X.
- [ ] Cambiar rápidamente entre varios países y comprobar que una respuesta antigua no sobrescribe la selección final.

## Persistencia

- [ ] Seleccionar un país diferente de Global.
- [ ] Recargar con F5.
- [ ] Confirmar que el país se mantiene.
- [ ] Ir de Inicio a Explorar y volver.
- [ ] Confirmar que el país se mantiene durante la navegación SPA.

## Estados y recuperación

- [ ] Confirmar que durante una carga no quedan tendencias antiguas visibles.
- [ ] Confirmar que los mensajes de error no rompen el layout.
- [ ] Confirmar recuperación al volver a seleccionar una ubicación o recargar.

## Apariencia

- [ ] Validar modo oscuro.
- [ ] Validar modo claro.
- [ ] Validar el panel a una resolución de escritorio reducida.
- [ ] Confirmar que el listado conserva scroll y altura esperados.
- [ ] Confirmar legibilidad del icono en 16, 32, 48 y 128 px.

## Seguridad y privacidad

- [ ] Confirmar que `manifest.json` solicita únicamente `storage` y el host de Trends24 necesario.
- [ ] Confirmar que no existen cookies, tokens, API keys o credenciales en el repositorio.
- [ ] Confirmar que no existe analytics ni telemetría.
- [ ] Confirmar que `PRIVACY.md` coincide con el comportamiento real.

## Documentación

- [ ] README actualizado.
- [ ] PRIVACY actualizado.
- [ ] ROADMAP actualizado.
- [ ] CHANGELOG actualizado.
- [ ] Versión de manifest correcta.

## Empaquetado

- [ ] Excluir archivos de desarrollo innecesarios del ZIP de distribución.
- [ ] Incluir `manifest.json`, `src/`, `styles/` y `assets/` completos.
- [ ] Probar una última instalación desde el contenido exacto del ZIP.
- [ ] Nombrar el paquete de forma consistente, por ejemplo `x-global-trends-0.9.0.zip`.

## Criterio de aprobación

La release candidate se considera aprobada cuando todos los checks funcionales, visuales, de privacidad e instalación pasan sin errores bloqueantes.

## Validación manual final confirmada

- [x] Instalación limpia en Brave.
- [x] Funcionamiento en `/home`.
- [x] Funcionamiento en `/explore`.
- [x] Persistencia del país tras F5.
- [x] Navegación SPA entre Inicio y Explorar.
- [x] Ausencia de tendencias duplicadas.
- [x] Tema claro.
- [x] Tema oscuro.
- [x] Icono oficial correcto.
- [x] Ausencia de errores reportados por Brave Extensions.

## Estado de release

Release Candidate 0.9.0: APROBADA

Fecha de validación: 7 de octubre de 2026
