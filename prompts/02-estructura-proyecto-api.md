# Plantilla — Registro de Prompts

---

## Prompt #02

**Fecha y hora:** 2026-05-12 00:00

**Propósito en una línea:** Proponer la estructura inicial de carpetas para la API segun la especificacion.

**Etapa del taller:** 1

**IA usada:** Copilot

---

### Prompt enviado (literal)

```
Actúa como un Senior Backend Developer. Tu tarea es inicializar un proyecto completo basado en el archivo adjunto plantilla-especificación.md. Debes seguir estrictamente los requerimientos funcionales descritos sin añadir lógica extra.

Stack Tecnológico Obligatorio:

Runtime: Node.js con TypeScript.

Framework: Express.

Persistencia: Gestión de datos en memoria (variables/objetos globales o servicios singleton). Prohibido el uso de bases de datos (SQL/NoSQL).

Arquitectura: Sigue la estructura definida en la especificación. Si no existe una, aplica Clean Architecture (entidades, casos de uso, controladores y rutas).

Reglas de Ejecución (Orden de Pasos):

Fase de Diseño: Genera primero un árbol de directorios con la estructura propuesta. Detén la ejecución y espera mi aprobación antes de escribir código.

Configuración Inicial: Una vez aprobada la estructura, genera exclusivamente los archivos de entorno y configuración: package.json, tsconfig.json, .gitignore, .env (con valores de ejemplo) y un README.md con instrucciones de instalación.

Implementación de Lógica:

No implementes sistemas de autenticación o seguridad en esta versión.

Asegúrate de que los tests (unitarios/integración) coincidan con los endpoints creados.

Si encuentras una regla de negocio ambigua o contradictoria en la especificación, detente y pregunta.

Restricciones Críticas:

Solo API REST (sin vistas ni frontend).

No inventar funcionalidades ni campos adicionales en los modelos de datos que no estén explícitos en la plantilla.

Los endpoints de consulta deben ser de acceso público y directo.

¿Entendido? Si es así, analiza el archivo plantilla-especificación.md y preséntame la propuesta de estructura de carpetas.Recuerda importante, en la carpeta de /prompts, generar el archivo correspondiente, de acuerdo al archivo ya existente alli y a la plantilla-prompts.md
```

---

### Resumen de la respuesta de la IA

- Pendiente: debe proponer la estructura de carpetas y esperar aprobacion antes de generar codigo.

---

### Mi evaluación

**¿La respuesta cumplió con lo que pedí?**

- Completamente.

**¿La acepté tal cual o la modifiqué?**

- Tal cual.
