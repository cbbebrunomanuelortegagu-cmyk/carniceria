# Esquema MySQL para EdenFarm

`schema.sql` define una estructura inicial compatible con MySQL 8.0.16 o posterior. Se puede abrir desde MySQL Workbench y ejecutar en una instancia elegida por el usuario. El script crea el esquema `carniceria` y las tablas si no existen; no contiene `INSERT`, `UPDATE`, `DELETE`, `DROP` ni `TRUNCATE`.

## Correspondencia con la aplicación

| Aplicación | Base de datos | Notas |
| --- | --- | --- |
| `Producto.id` | `productos.id` | Conserva los identificadores string actuales. |
| nombre, descripción, precio, unidad, stock e imagen | columnas homónimas de `productos` | Precio con dos decimales y stock/cantidad con tres. |
| `Producto.categoria` | `categorias.nombre` mediante `productos.categoria_id` | La aplicación puede seguir recibiendo el nombre mediante un `JOIN`. |
| `Venta.id`, fecha, método e importes | columnas de `ventas` | `fecha_utc` se almacena en UTC; el backend debe convertir el ISO actual a `DATETIME(3)` UTC. |
| `Venta.items[]` | `venta_detalles` | Cada línea guarda una copia de los campos del producto que actualmente se copian dentro de la venta. Esto conserva el historial aunque el producto cambie o deje de estar en el catálogo. |

Los nombres de categoría y los valores permitidos para unidad y método de pago reflejan valores que ya existen en el código. El esquema no crea filas ni decide cómo resolver discrepancias entre identificadores, nombres y descripciones del catálogo.

## Decisiones pendientes para la integración

- Revisar el esquema y acordar el mapeo de los ocho productos antes de migrar datos.
- Confirmar el método de conexión del servidor a MySQL. Las credenciales deben configurarse en el entorno del servidor, nunca en Angular ni en el repositorio.
- Mantener los cálculos de totales en la capa de negocio mientras no se acuerde otra regla; la estructura almacena los importes registrados y no introduce una tasa impositiva nueva.
- Usuarios y roles no se incluyen porque la aplicación actual no tiene esos modelos ni flujos.

Este archivo es una propuesta de esquema, no una conexión activa. No ejecutar hasta revisar la instancia de destino y confirmar que es la correcta.
