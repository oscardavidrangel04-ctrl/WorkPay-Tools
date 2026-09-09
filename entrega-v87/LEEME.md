# WorkPay Tools V8.7 — SEO y experiencia de uso

Entrega: 9 de septiembre de 2026. Basada en WorkPay Tools V8.6 Salary Cluster Expansion.

## Despliegue

Proyecto estático completo: publicar el contenido de la raíz con la configuración Vercel existente. No requiere compilación ni dependencias nuevas. Conservar `vercel.json`; implementa las rutas sin `.html` y la redirección permanente de `/calculators/index` a `/calculators`.

El dominio canónico conservado es `https://work-pay-tools.vercel.app`. Si se cambia de dominio, sustituirlo de forma coherente en canonical, datos estructurados, metadatos sociales, sitemap y robots antes de publicar. Abrir con `file://` no reproduce las rutas del alojamiento.

## Problemas priorizados y corregidos

1. Descubrimiento incompleto: la búsqueda de la home tenía 13 herramientas y las sugerencias del catálogo 16, aunque existen 18. Ahora ambas usan un registro compartido de 18 herramientas; la tabla comparativa también incorpora las tres herramientas ausentes.
2. Jerarquía: los bloques de enlaces SEO adelantaban al contenido principal. Se reordenaron home y catálogo; las calculadoras cuentan con acceso directo y la herramienta se acerca al encabezado cuando su estructura lo permite. Se conserva el contenido editorial indexable.
3. Navegación inconsistente: menú común, enlace a guías salariales, breadcrumbs con el nombre real de cada página y menú móvil con estado expandido y cierre mediante Escape. La navegación sigue disponible sin JavaScript.
4. Páginas salariales poco conectadas con la herramienta: quince guías enlazan al convertidor con importe, horas y semanas precargados. Los parámetros no cambian sus canonical.
5. Presentación: capa compartida de estilos para formularios, resultados, tarjetas, botones, tablas, foco y espaciado; se mantiene la identidad azul/verde y no se añaden fuentes ni frameworks.

## SEO implementado

- Revisión de titles, descriptions, H1, canonical, sitemap y datos estructurados en las páginas completas.
- Corrección de referencias desactualizadas a 15 calculadoras.
- Sincronización de nombres y descripciones WebPage/CollectionPage con los metadatos de página.
- Breadcrumbs visibles coherentes con su esquema y enlaces canónicos.
- Catálogo enlazable de 18 herramientas, incluidos los grupos de crecimiento salarial y compensación.
- Redirección permanente del catálogo duplicado; se conserva su archivo como respaldo.
- Sitemap con las mismas 44 URL y fecha de modificación correspondiente a esta entrega. Esa fecha refleja la edición del sitio, no una revisión fiscal o legal.
- Contenido, robots, URL canónicas y motor de cálculo conservados. No se añadieron acreditaciones ni resultados de herramientas SEO no utilizadas.

Criterios técnicos consultados: [consolidación de URL duplicadas de Google](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) y [enlaces rastreables de Google](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

## Móvil y accesibilidad

- Menú desplegable en pantallas pequeñas, con botones y enlaces táctiles de al menos 44 px en los componentes compartidos.
- Inputs de 16 px, teclados numéricos adecuados y ayuda asociada mediante aria-describedby.
- Foco visible, indicación de página actual y errores de rango/paso con texto y aria-invalid.
- Resultados y acciones con ajuste de línea; columnas apiladas y restricciones de ancho.
- Tablas desplazables accesibles por teclado, respeto a movimiento reducido y estilos de impresión.
- Los errores de entrada avisan antes de usar el resultado; las fórmulas existentes conservan su comportamiento.

## Validación realizada

- 46 páginas completas analizadas; el archivo de verificación Google se conserva aparte.
- 44 URL del sitemap coherentes con sus canonical y sin noindex.
- 45 bloques JSON-LD válidos.
- 2.458 referencias locales revisadas, sin destino o ancla ausente.
- Sin IDs duplicados en el resultado final.
- Sintaxis de todos los archivos JavaScript comprobada con Node.
- `calculator.js` idéntico byte por byte al original.
- Diez casos de cálculo ejecutados en Node con DOM mínimo simulado: weekly pay, semimonthly, hours-to-decimal, biweekly, annual income, salary growth, compensation package, contractor salary y los dos convertidores salary/hourly.
- Tres casos del nuevo cargador de escenarios: importe válido, negativo y no numérico. Registro compartido comprobado: 18 slugs únicos.

Los informes JSON incluidos contienen los resultados concretos. Estas comprobaciones no son pruebas completas de navegador.

## Límites y pendientes

No se ejecutó una revisión visual en navegadores o dispositivos reales ni pruebas de extremo a extremo de copiar, compartir, CSV, imprimir o gráficas. Sus funciones originales se conservaron, pero su interacción con el nuevo diseño requiere comprobación en el alojamiento. No se ha publicado el proyecto ni medido Core Web Vitals, tráfico, indexación o posiciones en Search Console. No se promete una mejora de rankings. No se revisó la vigencia legal o fiscal del contenido existente.

La página 404 mantiene su tratamiento original, sin canonical ni meta description; no se añade al sitemap. Se conserva el CSS original junto con una capa compartida pequeña para reducir el riesgo de regresiones en las herramientas especializadas. Los archivos históricos de notas se conservan como antecedentes; este documento describe la entrega actual.

## Archivos

`ARCHIVOS.json` enumera todos los archivos nuevos y modificados, con hash SHA-256. Componentes nuevos: `tool-catalog.js`, `home-page.js`, `catalog-page.js`, `interface-v87.css` e `interface-v87.js`. Se modificaron las páginas HTML completas, `sitemap.xml` y `vercel.json`; el motor matemático y el CSS base se preservaron.
