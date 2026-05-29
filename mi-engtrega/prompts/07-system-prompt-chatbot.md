# Plantilla - Registro de Prompts

---

## Prompt #06

**Fecha y hora:** 2026-05-29 00:00

**Proposito en una linea:** Revisar y alinear los endpoints del proyecto-v2 con la especificacion y los cURL de pruebas, documentando brechas y proponiendo cambios concretos.

**Etapa del taller:** 4

**IA usada:** GitHub Copilot

---

### Prompt enviado (literal)

```
Rol: Desarrollador Senior Backend / Auditor de Rutas
Contexto: Estamos trabajando sobre el modulo `proyecto-v2`. Necesito revisar las rutas reales y compararlas con la especificacion y los comandos cURL de pruebas del taller. Mi objetivo es detectar inconsistencias y proponer la correccion puntual de endpoints, sin cambiar la logica de negocio.

Alcance estricto:
1) Revisa las rutas registradas en `proyecto-v2/src/app/routes` y confirma si el servidor monta rutas con o sin prefijo `/api`.
2) Compara esas rutas con los cURL de pruebas (incluyendo endpoints de estudiantes, libros, ejemplares, prestamos y devoluciones/renovaciones).
3) Entrega un listado de brechas: rutas faltantes, rutas duplicadas, metodos HTTP incorrectos, o paths que no coinciden.
4) Propon una solucion concreta por cada brecha: ajustar el path, agregar alias, o actualizar el cURL esperado.
5) Si hay endpoints ambiguos (ej. `/historial` vs `/historial-prestamos`), recomienda uno y justifica por que.

Salida requerida:
- Resumen ejecutivo (3 a 5 bullets).
- Tabla con las rutas reales actuales (method + path) agrupadas por recurso.
- Tabla con las rutas esperadas por cURL.
- Tabla de diferencias y acciones sugeridas (brecha, causa, fix propuesto).
- Checklist final para ejecutar el plan de ajustes.

Importante:
- No inventes rutas. Usa solo las que existan en el codigo.
- No hagas cambios en archivos; solo analiza y propone.
- Mantener tono tecnico, directo y accionable.
```

---

### Resumen de la respuesta de la IA

- [Completar luego]

---

### Mi evaluacion

**La respuesta cumplio con lo que pedi?**

- [ ] Completamente.
- [ ] Parcialmente. Falto: [...]
- [ ] No, se desvio. Hizo: [...]

**La acepte tal cual o la modifique?**

- [ ] Tal cual.
- [ ] La modifique a mano. Cambios: [...]
- [ ] Le pedi correccion con un prompt nuevo (ver prompt #[N+1]).
- [ ] La rechace completamente. Razon: [...]

**Que aprendi de esta interaccion?**

[Completar luego]
