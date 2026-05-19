# Plantilla — Registro de Prompts

---

## Prompt #05

**Fecha y hora:** 2026-05-19 17:35

**Propósito en una línea:** Auditar el módulo `v2` y documentar la brecha entre los cURL especificados y los endpoints realmente implementados, definiendo el plan de refactorización inicial.

**Etapa del taller:** 3

**IA usada:** GitHub Copilot

---

### Prompt enviado (literal)

```
Rol: Desarrollador Senior Backend / Auditor de Código
Contexto: Estamos documentando el estado técnico del módulo `v2`. Hemos detectado una brecha crítica: las especificaciones basadas en comandos cURL no coinciden con la realidad del backend actual (los endpoints no existen o no responden).

Instrucciones de Creación del Archivo:
1. Ubicación: Crea un archivo Markdown (.md) en la raíz del módulo `v2`.
2. Nombre: Nómbralo estrictamente `auditoria-v2.md`.
3. Fecha: Registra explícitamente la fecha de hoy: 19 de Mayo de 2026.
4. Consistencia Visual: Antes de escribir, revisa los archivos `.md` de la carpeta `/prompts` en la raíz del proyecto para replicar de forma idéntica su estructura visual, fuentes de Markdown y estilo de encabezados.

Contenido Estricto que Debe Incluir el Archivo:

- Diagnóstico Técnico: Declara que tras revisar el proyecto `v2`, la gran mayoría o la totalidad de los comandos cURL documentados previamente NO existen ni funcionan en el código actual.
- Plan de Acción Inmediato: Detalla que el paso obligatorio es refactorizar el proyecto `v2` para desarrollar y levantar los endpoints faltantes.
- Alcance Inicial de la Refactorización: Define que por ahora solo se priorizarán dos recursos:
  * `/estudiantes`: Con soporte explícito para sus variaciones de 'pregrado' y 'posgrado'.
  * `/libros`: Debe incluir obligatoriamente el campo booleano `altaDemanda`.

- Documentación Técnica y Pruebas (Sección de Código):
  * Genera el bloque de documentación técnica de estos endpoints para `v2`.
  * Diseña y escribe ejemplos funcionales de pruebas cURL utilizando exclusivamente el método `POST` para registrar datos en estas nuevas rutas. Asegúrate de incluir cuerpos JSON realistas que reflejen las variaciones solicitadas (pregrado, posgrado, altaDemanda).

- Historial de Cambios (Changelog): 
  * Diseña una tabla al final del documento que sirva como historial. 
  * Registra una fila inicial con la versión `v2.0.0-audit`, fecha de hoy, tipo de cambio (Análisis/Diagnóstico) y una breve descripción de la auditoría efectuada como punto de partida para la nivelación de rutas. Guarda este prompt, según la estructura de los otros prompts en la carpeta de prompts con nombre actualización endpoints y auditoria
```

---

### Resumen de la respuesta de la IA

- Exploró la estructura del módulo `proyecto-v2` y los archivos de prompts existentes para replicar el estilo visual.
- Detectó que las rutas `POST` para `/estudiantes` y `/libros` no existen en el código actual.
- Generó `auditoria-v2.md` en la raíz de `proyecto-v2/` con: diagnóstico técnico, plan de acción, alcance de refactorización, documentación de endpoints con tablas de campos, 4 pruebas cURL (`POST` para pregrado, posgrado, libro con `altaDemanda: true` y `altaDemanda: false`) y tabla de changelog con versión `v2.0.0-audit`.
- Guardó este prompt como `05-actualizacion-endpoints-auditoria.md` en la carpeta `/prompts/`.

---

### Mi evaluación

**¿La respuesta cumplió con lo que pedí?**

- [ ] Completamente.
- [ ] Parcialmente. Faltó: [...]
- [ ] No, se desvió. Hizo: [...]

**¿La acepté tal cual o la modifiqué?**

- [ ] Tal cual.
- [ ] La modifiqué a mano. Cambios: [...]
- [ ] Le pedí corrección con un prompt nuevo (ver prompt #[N+1]).
- [ ] La rechacé completamente. Razón: [...]

**¿Qué aprendí de esta interacción?**

[Completar luego]
