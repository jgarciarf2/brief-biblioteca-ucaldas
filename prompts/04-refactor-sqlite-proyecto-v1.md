## Prompt #4

**Fecha y hora:** 2026-05-19 10:00

**Proposito en una linea:** Refactorizar proyecto-v1 para usar SQLite en lugar de datos quemados.

**Etapa del taller:** 3

**IA usada:** GitHub Copilot

---

### Prompt enviado (literal)

```
# Contexto y Rol
Actúa como un Arquitecto de Soluciones Senior experto en TypeScript y Node.js. Actualmente estás trabajando sobre el repositorio `proyecto-v1`.

# Objetivo Principal
Tu tarea fundamental es refactorizar la arquitectura actual del proyecto para eliminar por completo el uso de "datos quemados" (hardcoded data). Debes diseñar e implementar una solución que migre la persistencia de datos a **SQLite**, asegurando que todas las operaciones de lectura y escritura se realicen sobre esta base de datos.

# Requerimientos Técnicos y Tareas
1. **Configuración:** Configura e inicializa la conexión a la base de datos SQLite en el entorno de TypeScript (usando librerías recomendadas y modernas según el stack actual del proyecto).
2. **Modelado de Datos:** Analiza los datos quemados actuales y diseña las tablas/esquemas correspondientes en SQLite. Crea los scripts de migración o sincronización necesarios.
3. **Refactorización de Capas:** Modifica los servicios, repositorios o controladores actuales para que dejen de apuntar a los datos estáticos y pasen a ejecutar consultas SQL (o a través de un ORM/Query Builder si el proyecto ya integra uno) contra SQLite.
4. **Buenas Prácticas:** Asegúrate de manejar correctamente las asincronías, el tipado estricto de TypeScript para las entidades de la base de datos y la gestión de errores.

# Reglas de Salida y Documentación
Una vez analizada esta petición, debes documentar este prompt y la tarea a realizar en la carpeta correspondiente.
- **Destino:** Guarda este prompt en la carpeta `prompts/` ubicada en la raíz del proyecto. Si la carpeta no existe, créala.
- **Formato Estricto:** Es de carácter obligatorio que respetes la estructura y el formato definido en el archivo `02-tu-trabajo\plantilla-prompts.md`. Lee ese archivo antes de generar el documento final para asegurar que cumples con la plantilla.
```

---

### Resumen de la respuesta de la IA

Refactorizo proyecto-v1 a TypeScript con una capa de SQLite. Creo tsconfig, una conexion SQLite con inicializacion y seed, y repositorios para libros y prestamos. Agrego nuevas dependencias sqlite/sqlite3 y reemplaza los endpoints para leer y escribir en la base de datos.

---

### Mi evaluacion

**¿La respuesta cumplio con lo que pedi?**

- [x] Completamente.
- [ ] Parcialmente. Falto: [...]
- [ ] No, se desvio. Hizo: [...]

**¿La acepte tal cual o la modifique?**

- [x] Tal cual.
- [ ] La modifique a mano. Cambios: [...]
- [ ] Le pedi correccion con un prompt nuevo (ver prompt #[N+1]).
- [ ] La rechace completamente. Razon: [...]

**¿Que aprendi de esta interaccion?**

Convertir datos quemados a SQLite requiere crear esquema, seed inicial y repositorios asincronos antes de tocar los controladores.

---
