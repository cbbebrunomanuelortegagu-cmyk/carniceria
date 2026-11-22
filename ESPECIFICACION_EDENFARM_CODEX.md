# EdenFarm — Especificación funcional para Codex
## Rediseño del sitio, catálogo de carnes al vacío, pedidos/reservas, sección de socios y chatbot sin IA

> **Propósito:** utilizar este documento como fuente principal de requisitos para evolucionar el proyecto existente de EdenFarm. Primero se debe comprender y ordenar el proyecto actual; después implementar la experiencia web y sus reglas de negocio; y recién cuando estas estén claras, diseñar la base de datos.
>
> **Prioridad máxima:** conservar las funcionalidades y la información válida del proyecto. No borrar ni alterar datos existentes por iniciativa propia. Los cambios autorizados por este documento se limitan a la nueva presentación comercial y a los requisitos explícitos que se detallan aquí.

---

# 1. Contexto del proyecto existente

El proyecto entregado se llama `carniceria` y, según los archivos revisados, utiliza:

- Angular 17 y TypeScript en el frontend.
- Componentes standalone y Angular Router.
- Servicios de frontend para productos, carrito y ventas.
- `localStorage` para persistencia local de algunos datos.
- Una carpeta `server/` con configuración inicial.
- Una carpeta `database/` con un esquema SQL propuesto para MySQL.
- Un chatbot con interfaz visual y un servicio todavía no conectado a una fuente de conocimiento.

Rutas observadas actualmente en `src/app/app.routes.ts`:

- `/tienda`
- `/ventas`

También existen componentes de catálogo, carrito, POS, navbar, footer y chatbot.

**No asumas que la implementación actual está terminada ni que el esquema SQL existente es definitivo.** Inspecciona los archivos actuales antes de planificar cambios. El esquema MySQL existente es solamente una propuesta previa y no debe ejecutarse, ampliarse ni tomarse como diseño aprobado sin una revisión posterior.

## 1.1 Archivos y módulos que requieren atención

Como mínimo, inspecciona:

- `src/app/app.routes.ts`
- `src/app/app.component.*`
- `src/app/shared/components/navbar/`
- `src/app/shared/components/footer/`
- `src/app/shared/components/chatbot/`
- `src/app/shared/components/carrito-drawer/`
- `src/app/features/tienda/`
- `src/app/features/ventas/`
- `src/app/core/models/`
- `src/app/core/services/`
- `src/app/core/mock/`
- `src/app/core/data/`
- `server/`
- `database/`
- `package.json`
- `angular.json`
- `.env.example`
- `.gitignore`

No te limites a esta lista si encuentras otros módulos relacionados.

---

# 2. Objetivo del nuevo sitio web

La web debe dejar de sentirse como una tienda genérica con carrito de compras y pasar a ser una página comercial de EdenFarm, centrada en:

1. Presentar la marca y el negocio.
2. Mostrar el catálogo de carnes al vacío y sus precios.
3. Permitir consultar y seleccionar paquetes reales según su peso disponible para realizar pedidos o reservas.
4. Presentar información para personas interesadas en ser socios de EdenFarm.
5. Resolver preguntas frecuentes mediante un chatbot basado exclusivamente en información guardada y autorizada en la base de datos, sin utilizar IA generativa.

La navegación pública debe tener **cinco pestañas principales**.

## 2.1 Las cinco pestañas

La propuesta para completar las cinco pestañas solicitadas es:

| N.º | Pestaña | Objetivo |
|---|---|---|
| 1 | Inicio | Página principal con presentación breve y accesos/resúmenes de las demás secciones |
| 2 | Carnes al vacío | Catálogo informativo de cortes y precios |
| 3 | Pedidos / Reservas | Selección de paquetes según pesos reales disponibles y solicitud de pedido/reserva |
| 4 | Nosotros | Información de EdenFarm, historia, propósito y quiénes somos |
| 5 | Sé socio | Información para personas interesadas en ser socios |

La pestaña **Carnes al vacío** es la quinta sección que completa la estructura de cinco pestañas: el usuario describió expresamente Inicio, Pedidos/Reservas, Nosotros y Socios, y también solicitó un catálogo informativo de carnes y precios.

No combines el catálogo informativo con el formulario de pedidos: son objetivos diferentes.

La navbar debe ser responsive, accesible y mantener una navegación clara en escritorio y móvil. Las rutas pueden definirse después de inspeccionar la estructura actual, pero deben ser coherentes y descriptivas, por ejemplo:

- `/inicio`
- `/carnes-al-vacio`
- `/pedidos`
- `/nosotros`
- `/socios`

La ruta `/` debe llevar a Inicio.

---

# 3. Pestaña Inicio

Debe ser la página principal de EdenFarm.

Debe incluir:

- Una presentación principal de EdenFarm.
- Un mensaje breve que explique qué ofrece el negocio.
- Una vista previa del catálogo de carnes al vacío.
- Un acceso claro a Pedidos / Reservas.
- Una vista previa de Nosotros / Quiénes somos.
- Una vista previa de la sección Sé socio.
- Accesos visuales a las otras cuatro pestañas.

No inventes historia, misión, visión, ubicación, años de experiencia, certificaciones, beneficios, teléfonos, redes sociales ni afirmaciones comerciales. Si esos contenidos no existen en el proyecto o no han sido entregados por el usuario, deja textos provisionales claramente identificados como pendientes de contenido y solicita la información.

El diseño debe mantener la identidad visual que ya exista en el proyecto, salvo que se proponga un cambio y el usuario lo apruebe.

---

# 4. Pestaña Carnes al vacío: catálogo informativo y precios

## 4.1 Comportamiento requerido

Esta sección es **informativa**.

- Debe mostrar el nombre de cada producto y su precio.
- No debe permitir agregar productos al carrito.
- No debe mostrar contadores para aumentar o disminuir cantidades.
- No debe requerir seleccionar un peso.
- No debe abrir el carrito al pulsar una tarjeta.
- No debe simular una compra.
- Puede incluir filtros visuales por categorías si son útiles, pero no inventes categorías comerciales cuando no estén confirmadas.
- El precio debe mostrarse con claridad y con su unidad correspondiente.
- Usa la moneda boliviana: `Bs`.
- Los precios deben tener formato legible, por ejemplo `Bs 115/kg` o `Bs 60/pack`.

## 4.2 Lista autorizada de productos y precios

Estos son los productos y precios proporcionados por el usuario. Utiliza exactamente estos valores; no los conviertas, redondees ni reemplaces por los precios de los datos mock anteriores.

| N.º | Producto | Precio | Unidad de precio |
|---|---|---:|---|
| 1 | Punta de S | Bs 115 | kilogramo |
| 2 | Lomo | Bs 104 | kilogramo |
| 3 | Ojo de bife | Bs 104 | kilogramo |
| 4 | Colita de cuadril | Bs 94 | kilogramo |
| 5 | Pollerita | Bs 70 | kilogramo |
| 6 | Lomito | Bs 105 | kilogramo |
| 7 | Bollo grande | Bs 90 | kilogramo |
| 8 | Keperi | Bs 87 | kilogramo |
| 9 | Peceto | Bs 87 | kilogramo |
| 10 | Molida 1ra | Bs 84 | kilogramo |
| 11 | Molida 2da | Bs 78 | kilogramo |
| 12 | Jiba | Bs 80 | kilogramo |
| 13 | Chorizo picante | Bs 60 | kilogramo |
| 14 | Chorizo normal | Bs 60 | kilogramo |
| 15 | Chorizo con queso | Bs 60 | kilogramo |
| 16 | Hamburguesa | Bs 60 | pack |
| 17 | Milanesa | Bs 80 | kilogramo |

### Reglas importantes sobre precios

- Los tres tipos de chorizo tienen el mismo precio: Bs 60 por kilogramo.
- Hamburguesa cuesta Bs 60 por pack, no por kilogramo.
- Milanesa cuesta Bs 80 por kilogramo.
- Los demás precios de la tabla son por kilogramo.
- No calcules un precio final de paquete en esta sección.
- No infieras que un pack de hamburguesa tiene cierto número de unidades o cierto peso. Esa información no fue proporcionada.
- No agregues impuestos, descuentos, promociones o costos adicionales no indicados.

El usuario escribió también “jib” en una parte de su mensaje, pero previamente indicó “jiba”. Para la presentación se utiliza provisionalmente **Jiba**. No cambies el nombre sin confirmación.

## 4.3 Relación con los datos actuales

El proyecto contiene datos mock de productos que no coinciden con la lista comercial nueva. No reutilices automáticamente sus nombres, precios, descripciones, imágenes, identificadores o categorías.

La lista de 17 productos y precios de este documento es la nueva fuente autorizada para el catálogo público.

Antes de sustituir los datos mock:

1. Identifica exactamente dónde se utilizan.
2. Comprueba si esos datos también alimentan el POS o el historial de ventas.
3. No rompas el POS ni alteres ventas anteriores.
4. Separa, si es necesario, el catálogo público informativo del modelo de productos utilizado por el POS.
5. No elimines los datos históricos ni los sobrescribas.
6. Informa si algún producto anterior no tiene correspondencia clara con la nueva lista.

El usuario autoriza actualizar el catálogo público para reflejar los 17 productos y precios indicados aquí. Esa autorización no permite modificar ventas históricas ni otros datos del negocio.

---

# 5. Pestaña Pedidos / Reservas

Esta sección tiene un comportamiento diferente del catálogo informativo.

La carne se comercializa al vacío y cada paquete tiene un peso previamente establecido. Por ello, el cliente **no debe indicar una cantidad arbitraria de kilogramos ni incrementar una cantidad mediante un contador**.

Debe seleccionar entre los paquetes concretos que realmente estén disponibles.

## 5.1 Organización de pesos

Los paquetes deben organizarse en tres grupos:

1. **Menos de 1 kg:** peso menor a 1.000 kg.
2. **Entre 1 y 2 kg:** desde 1.000 kg hasta 2.000 kg, ambos incluidos.
3. **Más de 2 kg:** peso superior a 2.000 kg.

Ejemplos únicamente ilustrativos de cómo clasificar un peso:

- 0.850 kg → Menos de 1 kg.
- 1.250 kg → Entre 1 y 2 kg.
- 2.300 kg → Más de 2 kg.

Estos ejemplos no representan paquetes reales ni inventario disponible.

## 5.2 Botones de paquetes

Cada paquete disponible debe mostrarse como un botón seleccionable que indique su peso real, por ejemplo:

- `0.850 kg`
- `1.250 kg`
- `2.300 kg`

Los valores anteriores son ejemplos de formato, no pesos que deban cargarse al sistema.

Reglas:

- Los botones deben provenir de paquetes reales registrados como disponibles.
- No generes pesos aleatorios ni pesos de ejemplo en el catálogo de producción.
- No uses un contador de cantidad.
- No permitas seleccionar un peso que no corresponda a un paquete disponible.
- Cada paquete debe tener una identidad propia para evitar confundir dos paquetes que casualmente tengan el mismo peso.
- La interfaz debe distinguir claramente los paquetes seleccionados de los no seleccionados.
- Debe indicarse cuando una categoría no tiene paquetes disponibles.
- Cuando un paquete deje de estar disponible, no debe poder reservarse.
- El peso debe conservar su precisión; no lo redondees de manera que cambie el valor real del paquete.

Se puede permitir seleccionar uno o varios paquetes concretos, pero cada paquete físico solo puede seleccionarse una vez en una misma solicitud. No se debe representar la selección como “cantidad de kg” ni como un contador de unidades.

## 5.3 Relación entre producto y paquete

Cada paquete debe estar asociado a un producto del catálogo, por ejemplo Lomo, Peceto o Chorizo normal.

La interfaz de Pedidos / Reservas debe permitir:

1. Identificar el producto.
2. Consultar los paquetes disponibles de ese producto.
3. Ver el peso real de cada paquete.
4. Encontrar los paquetes agrupados por los tres rangos de peso.
5. Seleccionar paquetes concretos.
6. Revisar la selección antes de continuar con la solicitud.

No calcules el precio de cada paquete hasta que se haya definido y aprobado la regla de cálculo. En particular, el usuario todavía no ha especificado:

- Si el importe de un paquete se calcula multiplicando el peso exacto por el precio por kg.
- Cómo se calcula el precio de un pack de hamburguesas.
- Si se debe mostrar un importe estimado o un importe definitivo.
- Cómo se manejan diferencias de peso o precio.

No inventes estas reglas. Puedes mostrar el precio unitario de referencia del producto, pero separándolo claramente del precio final del paquete.

## 5.4 Solicitud de pedido o reserva

El objetivo de esta pestaña es permitir que una persona solicite o reserve paquetes específicos, no crear un carrito de compras tradicional.

No reutilices automáticamente el flujo actual de carrito/checkout como si fuera el flujo definitivo de reservas.

Antes de implementar el envío real de solicitudes, identifica qué información hace falta confirmar con el usuario, por ejemplo:

- Datos de contacto del cliente.
- Si la reserva se confirma automáticamente o requiere aprobación.
- Si el pedido es para retiro o entrega.
- Si existe fecha u horario de retiro/entrega.
- Si se requiere pago anticipado.
- Qué medios de contacto o notificación se utilizarán.

No inventes ni des por aprobadas estas reglas. En la primera fase puedes preparar la interfaz de selección y un resumen, pero deja el envío final desacoplado y documenta las decisiones pendientes.

## 5.5 Inventario y concurrencia

Cuando exista base de datos, la disponibilidad de paquetes debe verificarse en el servidor.

- No confíes únicamente en el estado visual del navegador.
- Dos clientes no deben poder reservar simultáneamente el mismo paquete.
- La reserva debe validar que el paquete continúe disponible.
- La actualización del estado del paquete y la creación de la solicitud deben ser consistentes y transaccionales.
- Define los estados de paquete y solicitud solamente después de proponerlos y recibir aprobación.
- No borres físicamente los paquetes reservados o vendidos si se necesita conservar trazabilidad.

---

# 6. Pestaña Nosotros

Debe ser una página independiente para presentar quiénes somos.

Prepara una estructura visual que permita incorporar posteriormente:

- Presentación de EdenFarm.
- Historia del negocio.
- Quiénes somos.
- Propósito.
- Valores.
- Fotografías del negocio o del equipo.
- Información adicional que el usuario proporcione.

**No inventes el contenido.** Si no hay información confirmada, deja secciones provisionales identificadas como “Contenido pendiente de proporcionar”.

No dupliques toda la información de Inicio: Inicio debe ofrecer un resumen y Nosotros debe contener la presentación completa.

---

# 7. Pestaña Sé socio

Debe existir una sección independiente destinada a explicar cómo una persona puede convertirse en socio de EdenFarm.

El usuario indicó expresamente que la información de esta sección se trabajará más adelante.

Por ahora:

- Crea la ruta y la estructura visual de la sección.
- Deja un espacio preparado para el contenido.
- Identifica claramente que la información está pendiente.
- No inventes requisitos, montos de inversión, beneficios, porcentajes, condiciones, formularios ni compromisos.
- No crees un proceso de registro de socios ni guardes solicitudes hasta recibir las reglas reales.
- No publiques contenido ficticio como si fueran condiciones oficiales.

---

# 8. Chatbot de EdenFarm: sin inteligencia artificial

## 8.1 Decisión tecnológica y funcional

El chatbot **NO debe utilizar inteligencia artificial generativa**.

No integrar:

- OpenAI.
- Gemini.
- Claude.
- Ollama.
- APIs de modelos de lenguaje.
- Servicios externos de generación de texto.
- Embeddings ni búsquedas vectoriales que requieran un modelo de IA.

El chatbot debe funcionar mediante lógica determinista y consultar información estructurada y autorizada almacenada en la base de datos.

## 8.2 Cómo debe responder

El chatbot debe reconocer intenciones y responder mediante reglas y consultas controladas.

Ejemplos de intenciones que deberá contemplar cuando existan los datos:

| Pregunta del cliente | Información que debe consultar |
|---|---|
| ¿Qué carnes tienen? | Catálogo de productos activos |
| ¿Cuánto cuesta el lomo? | Precio vigente del lomo |
| ¿Cuánto cuesta el chorizo? | Precio vigente y variantes de chorizo |
| ¿Tienen peceto? | Existencia del producto en el catálogo |
| ¿Qué paquetes de lomo hay? | Paquetes disponibles de lomo y pesos |
| ¿Tienen paquetes de menos de un kilo? | Paquetes disponibles del rango correspondiente |
| ¿Cómo puedo reservar? | Instrucciones oficiales de pedidos/reservas |
| ¿Cómo puedo ser socio? | Información oficial de la sección de socios |
| ¿Dónde están ubicados? | Dirección registrada, solo si se proporciona |

Estas son intenciones esperadas, no respuestas ni datos adicionales que deban inventarse.

## 8.3 Arquitectura del chatbot

Separa al menos estas responsabilidades:

1. **Interfaz:** ventana de conversación, mensajes y entrada del usuario.
2. **Normalización:** limpiar espacios y normalizar mayúsculas/minúsculas sin alterar el significado.
3. **Detección de intención:** reconocer preguntas mediante reglas, patrones y palabras clave.
4. **Servicio de conocimiento:** consultar exclusivamente las funciones o endpoints permitidos.
5. **Formateo de respuesta:** construir una respuesta clara a partir de resultados reales.
6. **Fallback:** informar cuando no se entiende la consulta o no existe información suficiente.

No permitas que el usuario escriba SQL ni que el chatbot ejecute consultas arbitrarias.

El chatbot debe usar endpoints o servicios de negocio controlados, por ejemplo:

- Consultar catálogo activo.
- Consultar precio de un producto.
- Consultar paquetes disponibles.
- Consultar información institucional publicada.
- Consultar información de socios publicada.

Los nombres anteriores son ejemplos de capacidades; los endpoints definitivos se definirán cuando se diseñe el backend y la base de datos.

## 8.4 Reglas de respuesta

- Responder únicamente con datos existentes y autorizados.
- No inventar precios, pesos, disponibilidad, promociones, horarios, direcciones ni políticas.
- No afirmar que un paquete está disponible sin comprobar su estado actual.
- No mostrar información privada de clientes, ventas o administración.
- No modificar inventario ni crear reservas por el solo hecho de responder una pregunta.
- Si no comprende la pregunta, pedir que se formule de otra manera o mostrar temas que sí puede atender.
- Si la información no está registrada, decir que no dispone de ese dato.
- No simular respuestas provenientes de la base de datos mientras todavía no exista conexión real.
- No utilizar respuestas hardcodeadas para datos variables como precios o disponibilidad.
- Se pueden usar mensajes fijos de interfaz y reglas lingüísticas, pero los datos comerciales deben consultarse en la fuente autorizada.

## 8.5 Limitaciones de un chatbot sin IA

El chatbot no tendrá comprensión libre del lenguaje como un modelo generativo. Debe trabajar con un conjunto definido de intenciones y patrones.

Diseña el sistema para poder ampliar sus reglas de manera ordenada, sin llenar el componente visual de condicionales.

Documenta las intenciones no reconocidas para poder mejorarlas, sin almacenar información personal innecesaria.

---

# 9. Arquitectura y separación de responsabilidades

Antes de implementar, inspecciona la arquitectura existente y propón cómo adaptarla.

Principios:

- Mantener Angular y TypeScript, salvo que exista una razón técnica comprobable para proponer otra cosa.
- Mantener componentes standalone y el estilo arquitectónico ya utilizado cuando sea adecuado.
- Separar páginas, componentes compartidos, modelos, servicios y acceso a datos.
- Evitar lógica de negocio en plantillas HTML.
- Evitar que los componentes consulten directamente la base de datos.
- Evitar que la interfaz pública dependa de `localStorage` como fuente definitiva de precios o inventario.
- Mantener el POS separado del catálogo informativo público.
- Mantener el historial de ventas y sus datos históricos.
- Evitar duplicar la definición de precios en varios componentes.
- Centralizar temporalmente la lista autorizada de 17 productos en una única fuente de configuración/datos mientras se prepara la base de datos.
- Diseñar contratos de repositorio para que posteriormente puedan conectarse a una API real.
- No simular una API ni una conexión real.

## 9.1 Separación de experiencias

Distingue claramente:

### Experiencia pública
- Inicio.
- Carnes al vacío.
- Pedidos / Reservas.
- Nosotros.
- Sé socio.
- Chatbot público.

### Experiencia interna
- Punto de venta (`/ventas`) y cualquier función administrativa que ya exista.

No elimines el POS. No lo conviertas en una pestaña pública por defecto. No cambies sus reglas sin autorización.

Si el proyecto todavía no tiene autenticación, no inventes un sistema de roles completo durante esta etapa. Documenta los riesgos de acceso a `/ventas` y presenta una propuesta antes de implementar autenticación o permisos.

---

# 10. Base de datos: todavía NO diseñar ni ejecutar el esquema definitivo

El usuario quiere definir primero las secciones, el catálogo, los paquetes, las reglas de reserva y el comportamiento del chatbot. **Después de esa definición se trabajará en el diseño de la base de datos.**

Por lo tanto, durante esta etapa:

- No crear tablas definitivas.
- No ejecutar `database/schema.sql`.
- No modificar ni reemplazar el esquema MySQL existente.
- No agregar migraciones.
- No crear datos de prueba en una base real.
- No instalar un motor o proveedor nuevo.
- No asumir que MySQL ya está aprobado como motor definitivo.
- No inventar tablas, columnas, relaciones, estados ni reglas.
- No configurar credenciales reales.
- No borrar ni migrar datos de `localStorage`.

Sí puedes preparar un **documento de requerimientos de datos**, sin convertirlo todavía en SQL.

Ese documento debe identificar qué información deberá persistirse, por ejemplo:

- Productos y precios vigentes.
- Unidad de precio (`kg` o `pack`).
- Paquetes físicos y peso exacto.
- Disponibilidad de cada paquete.
- Solicitudes de pedido/reserva.
- Información institucional publicada.
- Contenido informativo de socios.
- Preguntas/intenciones y respuestas controladas del chatbot, si se decide administrarlas desde datos.
- Información necesaria para conservar el funcionamiento del POS y el historial de ventas.

Esta lista es preliminar. No la conviertas en un esquema definitivo sin revisar las reglas y recibir aprobación.

## 10.1 Entregable previo al diseño de base de datos

Antes de diseñar SQL, presenta una matriz como esta:

| Área | Información requerida | Reglas pendientes |
|---|---|---|
| Catálogo | Nombre, precio, unidad, estado | Confirmar si se administrarán precios desde panel |
| Paquetes | Producto, peso exacto, disponibilidad | Definir identificación y estados |
| Reservas | Cliente, paquetes, fecha y estado | Definir datos obligatorios y confirmación |
| Socios | Contenido institucional | Usuario aún debe proporcionar la información |
| Chatbot | Intenciones, patrones y fuente de respuesta | Definir cómo se administrarán las reglas |
| POS | Ventas, detalle e inventario | Revisar compatibilidad con el sistema actual |

No inventes los valores faltantes. Señala las preguntas concretas que deben resolverse.

---

# 11. Diseño visual y experiencia de usuario

- Reutiliza la identidad visual existente cuando sea coherente.
- Mantén consistencia en colores, tipografía, botones, tarjetas, espaciados y navegación.
- Diseña primero para móvil y adapta a escritorio.
- Asegura contraste, legibilidad, navegación por teclado y etiquetas accesibles.
- Evita que todas las páginas sean una repetición de tarjetas de productos.
- El catálogo de precios debe ser fácil de consultar.
- Los pesos disponibles deben destacar visualmente y estar agrupados por rango.
- Debe existir un estado vacío claro cuando no haya paquetes disponibles.
- No muestres botones que aparenten funcionar si todavía no existe su operación real.
- No uses imágenes de productos que no correspondan al producto mostrado.
- Si faltan imágenes reales, utiliza un espacio visual neutro o solicita material; no presentes imágenes engañosas como fotografías reales de EdenFarm.

---

# 12. Protección de datos y seguridad

- No almacenar credenciales en el repositorio.
- No exponer datos privados en el chatbot.
- No permitir que el chatbot modifique información.
- No confiar en precios o disponibilidad enviados por el navegador al confirmar una reserva.
- Validar los datos en el servidor cuando exista backend conectado.
- Evitar inyección SQL mediante consultas parametrizadas u ORM cuando corresponda.
- Mantener los secretos fuera del control de versiones.
- No ejecutar operaciones destructivas.
- No publicar información de socios que todavía no esté aprobada.

---

# 13. Plan de trabajo obligatorio para Codex

Trabaja en fases. No intentes rediseñar todo de una sola vez.

## Fase 1 — Auditoría del proyecto actual (sin editar archivos)

1. Inspecciona el proyecto y sus dependencias.
2. Comprueba el estado de Git, rama actual y cambios pendientes.
3. Identifica las rutas y páginas existentes.
4. Identifica qué componentes actuales pueden reutilizarse.
5. Identifica cómo se conectan catálogo, carrito, POS, ventas y stock.
6. Identifica los datos mock y su impacto en otras funcionalidades.
7. Revisa el chatbot actual y confirma qué está implementado realmente.
8. Revisa el backend y el SQL existente sin ejecutarlos.
9. Detecta riesgos de romper funcionalidades.
10. Propón una arquitectura para las cinco pestañas, pedidos/reservas y chatbot determinista.

**Al terminar, entrega el diagnóstico y espera aprobación. No modifiques código en esta fase.**

## Fase 2 — Diseño funcional y visual

Después de la aprobación:

1. Propón la navegación de las cinco pestañas.
2. Propón la distribución de contenido de cada página.
3. Propón el catálogo informativo de 17 productos.
4. Propón la pantalla de paquetes agrupados por peso.
5. Define estados visuales: disponible, seleccionado, no disponible y vacío.
6. Propón la experiencia de selección y resumen de paquetes.
7. Propón la estructura de Nosotros y Sé socio, con contenido pendiente donde corresponda.
8. Propón el flujo conversacional determinista del chatbot.
9. Presenta las decisiones pendientes antes de implementar acciones que dependan de ellas.

No inventes contenido institucional ni pesos disponibles.

## Fase 3 — Implementación frontend autorizada

Una vez aprobado el diseño:

1. Implementa las cinco pestañas públicas.
2. Actualiza el catálogo con los productos y precios autorizados.
3. Separa el catálogo informativo de cualquier flujo de carrito.
4. Implementa la interfaz de Pedidos / Reservas y los grupos de peso.
5. Utiliza únicamente paquetes reales cuando exista una fuente de datos real.
6. Si aún no existe esa fuente, desarrolla componentes y contratos con estados vacíos, sin inventar inventario.
7. Mantén el POS y las ventas existentes.
8. Prepara la sección Nosotros y Sé socio sin contenido ficticio.
9. Implementa la estructura del chatbot sin IA, dejando clara la ausencia de conexión hasta que exista una fuente de datos.

## Fase 4 — Requerimientos y diseño de base de datos

Cuando las páginas y reglas funcionales estén revisadas:

1. Documenta entidades y datos necesarios.
2. Identifica relaciones.
3. Define reglas de disponibilidad y reserva.
4. Define cómo se conserva el historial de ventas.
5. Define cómo se actualizan precios y paquetes.
6. Define cómo se administran las intenciones del chatbot.
7. Presenta el modelo entidad-relación y el esquema propuesto.
8. Explica cómo se integrará con el POS actual.
9. Espera aprobación antes de generar o ejecutar migraciones.

## Fase 5 — Backend, base de datos y conexión real

Solo después de aprobar el esquema y las reglas:

1. Implementa o adapta el backend.
2. Conecta la base de datos elegida por el usuario.
3. Implementa endpoints controlados.
4. Conecta productos, precios y paquetes.
5. Implementa solicitudes de reserva y control de concurrencia.
6. Conecta el chatbot determinista con los endpoints de consulta.
7. Integra sin perder el historial ni alterar ventas existentes.
8. Prueba todos los flujos.

## Fase 6 — Pruebas y entrega

Verifica:

- Las cinco pestañas y sus rutas.
- Responsive en móvil y escritorio.
- Los 17 productos y sus precios exactos.
- Que el catálogo informativo no tenga carrito ni contador.
- Que los paquetes se agrupen correctamente por peso.
- Que no se inventen paquetes.
- Que no se pueda seleccionar dos veces el mismo paquete físico en una solicitud.
- Que el chatbot no use IA ni invente datos.
- Que las respuestas del chatbot provengan de consultas autorizadas.
- Que el POS y el historial de ventas sigan funcionando.
- Que no haya errores de compilación ni pruebas regresivas.

---

# 14. Reglas para proteger el trabajo existente

1. Antes de empezar, ejecuta `git status` y revisa los cambios pendientes.
2. No cambies de rama ni hagas commits sin autorización.
3. No descartes cambios del usuario ni de otros desarrolladores.
4. No uses `git reset --hard`, `git clean`, ni comandos destructivos.
5. No borres componentes existentes sin explicar el motivo y obtener aprobación.
6. No reescribas archivos completos cuando sea posible realizar cambios puntuales.
7. No alteres el historial de ventas.
8. No reemplaces datos anteriores del POS por la lista del catálogo público sin revisar su uso.
9. No cambies precios o nombres de productos distintos de los autorizados en este documento.
10. Si detectas una incompatibilidad entre los requisitos nuevos y una funcionalidad actual, informa antes de resolverla por tu cuenta.

---

# 15. Formato de informe de Codex

Al finalizar cada fase, informa:

- Estado: completada, parcial o bloqueada.
- Archivos revisados.
- Archivos creados o modificados.
- Funcionalidades implementadas.
- Reglas que se respetaron.
- Datos que se conservaron.
- Pruebas ejecutadas y resultados.
- Problemas y riesgos encontrados.
- Decisiones que faltan del usuario.
- Próximo paso recomendado.

---

# 16. Instrucción inicial para Codex

Comienza exclusivamente con la **Fase 1 — Auditoría del proyecto actual**.

Lee este documento completo. Inspecciona el proyecto real de EdenFarm y contrasta los requisitos con el código existente.

**No edites, crees, elimines, formatees ni muevas archivos durante la Fase 1. No ejecutes SQL ni modifiques la base de datos.**

Entrega un diagnóstico concreto que indique:

1. Qué partes actuales se pueden reutilizar.
2. Qué partes deben adaptarse.
3. Qué funcionalidades podrían romperse con el rediseño.
4. Cómo separar las cinco pestañas públicas del POS interno.
5. Cómo implementar los paquetes físicos por peso sin contadores ni carrito.
6. Cómo implementar el chatbot sin IA.
7. Qué reglas todavía debe confirmar el usuario.
8. Qué información se necesitará para diseñar correctamente la base de datos después.

Espera mi aprobación antes de pasar a la Fase 2.

**La prioridad es construir EdenFarm sobre el proyecto existente, respetando sus datos y funcionalidades válidas, sin inventar información comercial ni adelantar el diseño definitivo de la base de datos.**
