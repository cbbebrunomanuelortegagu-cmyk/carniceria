# Propuesta de datos: catálogo público

## Estado

El usuario aprobó los cinco puntos iniciales y confirmó que las imágenes se guardarán como archivos en el servidor, con su ruta en MySQL. Motor: MySQL. Esquema propuesto: `edenfarm`. Alcance confirmado: solo el catálogo público. No se incluyen paquetes, reservas, pagos, ventas del POS ni pedidos persistidos.

El botón `Pagar` del prototipo es solo una demostración visual: vacía el carrito temporal, muestra Gracias y vuelve a Inicio. No procesa un pago y no crea registros en MySQL.

## Modelo propuesto

Una entidad de catálogo público, sin categorías porque no fueron confirmadas y sin imágenes/descripciones porque aún no se proporcionaron.

| Campo propuesto | Tipo conceptual MySQL | Uso |
|---|---|---|
| `id` | `VARCHAR(64)` | Identificador técnico estable (slug) para que Angular pueda buscar y renderizar el producto. |
| `nombre` | `VARCHAR(120)` | Nombre comercial exacto aprobado. |
| `precio` | `DECIMAL(10,2)` | Precio de referencia vigente; no usar `FLOAT`. |
| `unidad_precio` | `VARCHAR(8)` con valores `kg` o `pack` | Unidad a la que corresponde el precio. |
| `moneda` | `VARCHAR(8)` | Moneda de presentación `Bs`. |
| `imagen_ruta` | `VARCHAR(500)` nullable | Ruta pública del archivo guardado en el servidor, por ejemplo `/uploads/catalogo/lomo.jpg`. |

La restricción de unidad puede validarse en la aplicación y, si se aprueba una versión MySQL que aplique `CHECK`, también en el servidor. No se requiere una relación con categorías para el alcance actual.
Los archivos se almacenarán en el servidor bajo `uploads/catalogo`; MySQL guardará solo la ruta. Una ruta nula significa que el producto todavía no tiene una imagen publicada.

## Datos fuente autorizados

Después de aprobar el modelo, el catálogo se cargaría desde los 17 registros de `src/app/core/data/public-catalog.data.ts`, conservando nombre, precio y unidad exactamente. Los identificadores técnicos actuales son slugs, no códigos comerciales asignados por EdenFarm.

| Identificador técnico | Nombre | Precio | Unidad |
|---|---|---:|---|
| `punta-de-s` | Punta de S | 115 | kg |
| `lomo` | Lomo | 104 | kg |
| `ojo-de-bife` | Ojo de bife | 104 | kg |
| `colita-de-cuadril` | Colita de cuadril | 94 | kg |
| `pollerita` | Pollerita | 70 | kg |
| `lomito` | Lomito | 105 | kg |
| `bollo-grande` | Bollo grande | 90 | kg |
| `keperi` | Keperi | 87 | kg |
| `peceto` | Peceto | 87 | kg |
| `molida-1ra` | Molida 1ra | 84 | kg |
| `molida-2da` | Molida 2da | 78 | kg |
| `jiba` | Jiba | 80 | kg |
| `chorizo-picante` | Chorizo picante | 60 | kg |
| `chorizo-normal` | Chorizo normal | 60 | kg |
| `chorizo-con-queso` | Chorizo con queso | 60 | kg |
| `hamburguesa` | Hamburguesa | 60 | pack |
| `milanesa` | Milanesa | 80 | kg |

La carga inicial de esos registros requerirá aprobación separada. No se modifica el catálogo ni el historial del POS.

## Integración propuesta

- Express expondría una consulta de solo lectura, por ejemplo `GET /api/catalogo-publico`.
- Angular leería los productos a través de un servicio/repository; nunca se conectaría directamente a MySQL.
- La respuesta contendría solo los campos de catálogo autorizados.
- El chatbot no se conectará automáticamente a esta consulta. Cuando se autorice, podría usar la misma lectura controlada para responder precios; hasta entonces no responderá con datos comerciales.
- El carrito de demostración y su flujo Gracias seguirán en memoria y no escribirán en la base de datos.
- Las credenciales se mantendrán en el entorno local del backend, nunca en el bundle del navegador o en Git.

## Fuera de alcance

No se incluirán inventario por paquete, pesos reales, disponibilidad, reservas, contacto de clientes, pagos, ventas POS, usuarios, roles, respuestas del chatbot ni contenido institucional. El modelo deberá revisarse si más adelante se incorporan esas funciones.

## Aprobación recibida

El usuario confirmó:

1. Una única entidad de catálogo público con los seis campos propuestos.
2. Los slugs indicados como identificadores técnicos.
3. Los 17 registros como carga inicial de catálogo.
4. El endpoint de solo lectura y la separación Angular → Express → MySQL.
5. Que `Pagar` sea demostrativo y no registre ventas, pedidos ni pagos.
6. Guardar en MySQL la ruta de imagen y los archivos en el servidor.

El DDL y la carga inicial están separados en `catalogo_publico.sql` y `catalogo_publico_datos.sql`. No se ejecutarán hasta que el servidor MySQL esté disponible y haya una base de destino seleccionada.
