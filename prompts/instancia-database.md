# Plantilla — Registro de Prompts

---

## Prompt #04

**Fecha y hora:** 2026-05-19 10:00

**Propósito en una línea:** Migrar la persistencia del proyecto de datos en memoria a SQLite utilizando la librería nativa sqlite3.

**Etapa del taller:** 3

**IA usada:** GitHub Copilot

---

### Prompt enviado (literal)

```
Rol: Desarrollador Senior Backend
Contexto: Estamos migrando la persistencia del proyecto de datos en memoria a SQLite.

Instrucciones Principales:
1. Alcance: Trabaja ÚNICAMENTE sobre la carpeta o módulo `v2`. No modifiques nada fuera de este directorio.
2. Estructura de Base de Datos:
   - Crea exclusivamente una carpeta llamada `db` dentro de `v2`.
   - Dentro de esa carpeta, inicializa un único archivo físico para la base de datos SQLite (ej. `database.db`). No crees múltiples archivos ni estructuras complejas.
3. Dependencias y Código:
   - Utiliza la librería estándar/nativa de SQLite (por ejemplo, `sqlite3` en el archivo package.json, evitando wrappers complejos como better-sqlite3 u ORMs).
   - Implementa la capa de datos (repositorios) necesaria para gestionar las operaciones CRUD conectándose directamente a ese archivo de SQLite.
   - Mantén estrictamente la consistencia en el tipado y el manejo de errores.
   - No rompas los contratos ni las firmas de los servicios o controladores existentes que consumen estos datos.

Instrucciones de Guardado del Prompt:
- Al finalizar, crea un archivo en la raíz en: `/prompts/instancia-database.md`.
- Copia este prompt exacto dentro de ese archivo.
- Revisa los otros `.md` en `/prompts` and replica exactamente su misma estructura visual y formato.
```

---

### Resumen de la respuesta de la IA

- Instalación de la dependencia `sqlite3` y sus tipos.
- Creación de la carpeta `db` dentro de `proyecto-v2` con el archivo `database.db`.
- Implementación de la capa de persistencia en `src/infrastructure/persistence/sqlite/` incluyendo la conexión y los esquemas.
- Adaptación de todos los repositorios para utilizar SQLite de forma asíncrona.
- Refactorización de casos de uso y controladores para que soporten la naturaleza asíncrona de la base de datos, manteniendo la lógica de negocio y el manejo de errores.
- Creación de un sistema de generación de IDs (`nextId`) basado en una tabla de contadores en SQLite.
- Implementación de un proceso de seed para cargar datos iniciales.
