# TiendaHub

Prototipo web de una plataforma de comercio electrónico multi-vendedor. Esta versión funciona como demostración local en el navegador, sin servidor ni base de datos.

## Ver el prototipo

Abre `index.html` directamente en un navegador o publica el repositorio con GitHub Pages seleccionando la rama `main` y la carpeta raíz `/`.

## Funcionalidades de demostración

- Planes Básico, Pro y Escala, con precios, comisiones y límites de productos ilustrativos.
- Inscripción de vendedores y aprobación/suspensión simulada en el panel central.
- Tienda pública con productos, carrito y pedidos de demostración.
- Código de rastreo y progreso manual del envío.
- Panel de vendedor con inventario, pedidos y estadísticas.
- Panel central con MRR calculado y comisiones estimadas.
- Tema claro/oscuro.

## Límites y seguridad

**No es una plataforma lista para producción.** Los datos solo existen en memoria: se pierden al recargar la página. Los botones de pago simulan transacciones; no hay Stripe, Mercado Pago ni transferencias reales. No existe autenticación, autorización de roles ni aislamiento de vendedores: todos los paneles son accesibles desde la navegación. Tampoco existe persistencia, control de inventario concurrente, protección contra inyección de HTML en datos introducidos, ni integración con servicios de paquetería.

Para convertirlo en producto operativo se necesita backend, base de datos, roles y seguridad, cobros reales con webhooks, gestión de suscripciones y pedidos, y pruebas.

## Estructura

- `index.html`: prototipo original completo, ejecutable sin dependencias.
- `docs/prototipo-original.md`: archivo Markdown suministrado como referencia.
- `.github/workflows/validate.yml`: comprobación básica de los archivos HTML.

## Créditos

Repositorio inicial creado a partir de los archivos aportados para el proyecto TiendaHub.
