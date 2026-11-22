# Instrucciones para Codex — Chatbot, eliminación de datos hardcodeados e integración de base de datos

## Objetivo general

Trabaja sobre el proyecto existente para incorporar un **chatbot funcional** y preparar la aplicación para utilizar una **base de datos externa o local**, de modo que la información dinámica deje de depender de valores hardcodeados en el código.

La prioridad absoluta es **conservar íntegramente la información, el contenido, las reglas de negocio y el comportamiento válido que ya existen en el proyecto**. No debes reemplazar, inventar, resumir, borrar ni alterar información existente.

Estas instrucciones se aplican al proyecto completo, pero los cambios deben realizarse de forma gradual, controlada y verificable.

---

## 1. Reglas obligatorias antes de modificar

1. Inspecciona primero toda la estructura del proyecto, sus tecnologías, dependencias, pantallas, componentes, servicios, modelos, rutas y archivos de configuración.
2. Identifica dónde existen datos hardcodeados y clasifícalos:
   - Datos de ejemplo o prueba.
   - Datos reales o contenido que debe conservarse.
   - Configuraciones constantes que legítimamente deben permanecer en el código.
   - Datos que deberían provenir de la base de datos.
3. Revisa cómo funciona actualmente cada módulo y documenta sus dependencias antes de cambiarlo.
4. **No modifiques información existente**: conserva textos, nombres, descripciones, preguntas, respuestas, categorías, reglas, registros, cálculos, diseños y funcionalidades, salvo que sea imprescindible adaptar su origen de datos sin cambiar su contenido.
5. No elimines archivos, pantallas, componentes, funciones, tablas, campos ni registros por considerarlos innecesarios sin autorización explícita.
6. No reemplaces la arquitectura ni migres de framework o tecnología por iniciativa propia.
7. No sobrescribas archivos completos cuando sea posible realizar cambios pequeños y localizados.
8. Antes de modificar archivos importantes, revisa el estado de Git y los cambios pendientes. No descartes ni sobrescribas trabajo previo.
9. Si encuentras información contradictoria, datos cuyo significado no está claro o una modificación que pueda alterar el comportamiento actual, detente y consulta antes de decidir.
10. No afirmes que una función está terminada si no fue implementada y probada.

## 2. Incorporación del chatbot

Implementa un chatbot integrado con la arquitectura y el diseño actuales del proyecto.

El chatbot debe:

- Estar disponible desde la interfaz de usuario de manera clara y coherente con el diseño existente.
- Permitir que el usuario escriba y envíe mensajes.
- Mostrar los mensajes del usuario y las respuestas del chatbot, diferenciándolos visualmente.
- Mantener el contexto de la conversación durante la sesión, cuando la arquitectura lo permita.
- Manejar estados de carga, mensajes vacíos, errores de conexión y respuestas fallidas.
- Validar entradas y evitar que mensajes vacíos se envíen.
- Separar la interfaz del chatbot de la lógica que genera las respuestas.
- Utilizar un servicio o módulo independiente para comunicarse con el motor conversacional.
- Evitar respuestas inventadas cuando no exista información suficiente.
- Mantener las reglas, contenidos y conocimientos propios del proyecto. No sustituyas información del proyecto por contenido genérico.

### Fuente de conocimiento del chatbot

Prepara el chatbot para consultar información desde la base de datos y responder con base en los datos disponibles y autorizados.

- No inventes preguntas frecuentes, respuestas, políticas, datos ni reglas de negocio.
- No alteres el contenido existente para adaptarlo al chatbot.
- No permitas que el chatbot modifique registros de la base de datos.
- Si una pregunta no puede responderse con la información disponible, debe indicarlo claramente.
- Mantén separadas la recuperación de información y la generación de respuestas.
- Si se requiere una API de inteligencia artificial, deja la integración desacoplada y utiliza variables de entorno para las credenciales. Nunca escribas claves directamente en el código.

Si todavía no se dispone de la base de datos o del proveedor del modelo, implementa únicamente la estructura e interfaces necesarias. No simules una conexión real ni presentes respuestas de prueba como si fueran respuestas reales del sistema.

## 3. Eliminación del hardcodeo

El objetivo es que los datos variables del proyecto se obtengan desde una fuente de datos centralizada y no estén dispersos en las pantallas o componentes.

Revisa, entre otros:

- Listados, tablas y tarjetas.
- Usuarios, perfiles y roles.
- Registros, historiales y estadísticas.
- Categorías, opciones y configuraciones administrables.
- Datos utilizados por formularios.
- Contenido que deba actualizarse sin modificar el código.
- Información que utilizará el chatbot.

### Criterios

1. Las vistas no deben contener consultas directas ni datos de negocio incrustados.
2. Centraliza el acceso a datos en repositorios, servicios o una capa equivalente, siguiendo el patrón que mejor encaje con la arquitectura actual.
3. Separa modelos, lógica de negocio, acceso a datos e interfaz.
4. Conserva las constantes técnicas que deban permanecer en el código; no conviertas absolutamente todo en registros de base de datos sin justificación.
5. No elimines los datos actuales: prepara su lectura desde la nueva fuente manteniendo exactamente sus valores y significados.
6. Si se necesita una transición, utiliza adaptadores o una capa temporal de compatibilidad, sin duplicar ni alterar información.
7. No dejes datos ficticios activos en producción. Si se mantienen datos de demostración para pruebas, deben estar claramente identificados y separados de los datos reales.

## 4. Integración de la base de datos

La base de datos, su motor, estructura, tablas, relaciones y credenciales serán proporcionados posteriormente. Por tanto:

- **No elijas ni inventes el motor de base de datos.**
- No inventes tablas, columnas, relaciones, restricciones ni registros como si fueran parte del diseño definitivo.
- No generes credenciales ni supongas direcciones de conexión.
- No ejecutes migraciones ni crees una estructura definitiva antes de recibir y revisar el diseño real de la base de datos.
- No elimines ni sobrescribas ninguna base de datos existente.
- No realices operaciones destructivas (`DROP`, `TRUNCATE`, borrados masivos o equivalentes).
- No cargues datos de prueba en una base de datos real.
- No cambies el contenido de los registros durante la integración.

Mientras se proporciona la base de datos, prepara:

1. Una configuración centralizada para la conexión.
2. Variables de entorno para los parámetros de conexión.
3. Un archivo de ejemplo de configuración, sin secretos reales.
4. Una capa de conexión desacoplada de la interfaz.
5. Repositorios o servicios con contratos claros.
6. Manejo de errores y cierre correcto de conexiones.
7. Validación de datos de entrada.
8. Consultas parametrizadas u ORM, según la tecnología existente.
9. Una estrategia para mapear la estructura real de la base de datos cuando sea entregada.

Cuando recibas la base de datos, primero analiza su estructura y compárala con los modelos y funcionalidades actuales. Presenta un plan de correspondencia entre los datos existentes y las tablas/campos reales. **No adaptes ni modifiques la información para hacerla coincidir**: si hay incompatibilidades, informa cuáles son y espera autorización antes de cambiar datos o reglas.

## 5. Seguridad

- No incluyas contraseñas, tokens, claves API ni credenciales en el código fuente.
- Utiliza variables de entorno y excluye los archivos sensibles del repositorio.
- Valida y sanitiza las entradas.
- Evita inyección SQL mediante consultas parametrizadas u ORM.
- Aplica los permisos correspondientes a cada rol.
- No expongas información privada en las respuestas del chatbot.
- No permitas que el chatbot ejecute consultas arbitrarias, instrucciones SQL o acciones administrativas.
- Registra errores técnicos sin almacenar contraseñas, tokens ni información sensible innecesaria.

## 6. Pruebas y conservación del proyecto

Antes de dar por finalizado cada cambio:

1. Ejecuta las pruebas existentes.
2. Comprueba que las pantallas y funcionalidades anteriores continúen funcionando.
3. Verifica que los textos y datos originales se mantengan sin cambios.
4. Prueba los estados de carga, errores y ausencia de datos.
5. Comprueba que la aplicación no dependa de datos hardcodeados para las funciones que ya estén conectadas a la base de datos.
6. Verifica que el chatbot no modifique información ni responda con datos que no pueda respaldar.
7. Revisa el diff de Git para detectar cambios accidentales.

No elimines ni debilites pruebas existentes para conseguir que pasen. Si una prueba falla por un problema previo, documenta el fallo por separado.

## 7. Forma de trabajo por etapas

No intentes transformar todo el proyecto en una sola operación. Trabaja en estas etapas:

### Etapa 1 — Auditoría, sin modificar código

- Analiza la estructura y tecnologías.
- Identifica los datos hardcodeados.
- Identifica las funcionalidades y contenidos que deben conservarse.
- Describe cómo integrar el chatbot.
- Identifica qué partes necesitan conexión a base de datos.
- Enumera los datos y documentos que necesitas recibir para integrar la base de datos.
- Presenta riesgos, incompatibilidades y archivos que sería necesario modificar.

**Al terminar esta etapa, entrega un informe y espera mi aprobación. No modifiques código todavía.**

### Etapa 2 — Preparación de arquitectura

Después de mi aprobación:

- Crea la estructura de servicios, repositorios, modelos e interfaces necesaria.
- Prepara la configuración de conexión sin inventar credenciales ni esquema.
- Integra la estructura visual y lógica base del chatbot.
- Conserva temporalmente el comportamiento anterior donde todavía no exista una fuente real de datos.

### Etapa 3 — Integración de la base de datos

Cuando te proporcione la base de datos:

- Inspecciona su esquema real.
- Presenta el mapeo con los modelos actuales.
- Señala incompatibilidades y solicita aprobación para cualquier cambio que afecte información.
- Implementa la conexión y sustituye progresivamente las fuentes hardcodeadas.
- Verifica que los datos se lean correctamente y que no se alteren.

### Etapa 4 — Integración del conocimiento del chatbot

- Conecta el chatbot con las fuentes de información autorizadas.
- Implementa recuperación de información y generación de respuestas mediante servicios separados.
- Comprueba que las respuestas estén fundamentadas en los datos disponibles.
- Verifica permisos y privacidad.

### Etapa 5 — Validación final

- Ejecuta pruebas funcionales y técnicas.
- Comprueba los módulos anteriores.
- Revisa seguridad, errores y rendimiento.
- Entrega un resumen de archivos modificados, funcionalidades implementadas, pruebas ejecutadas y pendientes.

---

## 8. Formato obligatorio de tus informes

Al finalizar cada etapa, informa:

- **Estado:** completado, parcial o bloqueado.
- **Archivos revisados.**
- **Archivos modificados o creados.**
- **Cambios realizados y motivo.**
- **Información que se conservó.**
- **Datos hardcodeados identificados y estado de cada uno.**
- **Pruebas ejecutadas y resultados.**
- **Riesgos o problemas detectados.**
- **Información que necesitas de mi parte.**
- **Siguiente paso propuesto.**

## Instrucción final prioritaria

La integridad del proyecto está por encima de la velocidad de implementación. Tu trabajo es incorporar el chatbot y preparar/conectar el proyecto a una base de datos **sin cambiar la información que ya existe**.

**Comienza exclusivamente con la Etapa 1: audita el proyecto y presenta el plan. No escribas, edites, elimines, formatees ni muevas archivos hasta que yo revise y apruebe el informe.**
