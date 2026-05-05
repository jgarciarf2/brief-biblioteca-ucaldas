# Cómo te evalúa el docente

**Total:** 100 puntos distribuidos en 6 dimensiones. Mínimo aprobatorio: 70.

---

## Dimensión 1 — Calidad de la especificación (20 pts)

| Criterio | Excelente (4) | Aceptable (2) | Insuficiente (0) |
|---|---|---|---|
| Modelo de datos | Entidades, campos, tipos y relaciones completos | Entidades presentes pero faltan algunos campos o relaciones | Modelo confuso o incompleto |
| Reglas de negocio numeradas | Cada regla con trigger, condición, acción exacta y código HTTP | Reglas presentes pero ambiguas | Reglas pegadas del correo sin reformular |
| Decisiones documentadas | 5+ decisiones con justificación | 3-4 decisiones | Menos de 3 o sin justificación |
| Preguntas para la cliente | 5+ preguntas concretas y bien formuladas | 3-4 preguntas | Menos de 3 o preguntas vagas |
| Endpoints definidos | Tabla completa con método, ruta, body, respuestas, códigos | Lista de rutas sin detalle de body o códigos | Lista incompleta |

**Trampa común que descuenta:** copiar literal frases del correo de la cliente como "reglas de negocio". Eso es transcripción, no especificación.

---

## Dimensión 2 — Calidad de los prompts (15 pts)

| Criterio | Excelente | Aceptable | Insuficiente |
|---|---|---|---|
| Estructura del prompt inicial | Contiene contexto, objetivo, modelo de datos, reglas, restricciones, rendición de cuentas | Le falta 1-2 elementos | Le falta más de 2 elementos |
| Acotamiento del alcance | Cada prompt restringe explícitamente lo que la IA debe y no debe hacer | Solo a veces | Casi nunca |
| Iteración consciente | Cuando un prompt no funcionó, lo reescribió con una corrección clara | Reescribió pero sin reflexión | Solo repitió o copió la respuesta |
| Trazabilidad | Cada prompt está numerado, fechado, con propósito declarado | Numerados pero sin propósito | Sin trazabilidad |

**Trampa común:** prompts copy-pega sin pensar. El docente lee la carpeta `prompts/` para detectar esto.

---

## Dimensión 3 — Auditoría humana (20 pts)

| Criterio | Excelente | Aceptable | Insuficiente |
|---|---|---|---|
| Hallazgos detectados | 8+ hallazgos reales | 5-7 hallazgos | Menos de 5 |
| Calidad de los hallazgos | Cada uno con archivo, línea, severidad, reproducción | Información incompleta | Hallazgos vagos |
| Distinción IA vs humano | Declara qué hallazgos detectó él vs cuáles la IA auditora | Mezclado | No distingue |
| Mapeo regla → código | Tabla completa para todas las reglas | Tabla parcial | Sin tabla |

**Trampa común:** "no encontré nada raro". Si auditaste 35 minutos y no encontraste nada, no auditaste — leíste por encima.

---

## Dimensión 4 — Tests con IA (15 pts)

| Criterio | Excelente | Aceptable | Insuficiente |
|---|---|---|---|
| Tests anclados a la especificación | Cada test tiene comentario referenciando RNX | Algunos sí, otros no | Tests confirmatorios del código |
| Cobertura de las reglas | Una prueba por cada regla mínimo | Solo algunas reglas | Cobertura aleatoria |
| Tests adversariales | Casos límite, body vacío, tipos incorrectos | Algunos casos límite | Solo happy path |
| Distinción fallo legítimo vs test mal escrito | Sabe identificar cuál es cuál | A veces confunde | No distingue |

**Trampa común:** la IA genera 30 tests, el estudiante ejecuta y reporta "todo verde, listo". El docente revisa los tests y descubre que no anclan a las reglas.

---

## Dimensión 5 — Detección y corrección de bugs (15 pts)

| Criterio | Excelente | Aceptable | Insuficiente |
|---|---|---|---|
| Bugs reales encontrados | 5+ bugs documentados con reproducción | 3-4 bugs | Menos de 3 |
| Correcciones quirúrgicas | Diff mínimo, sin tocar archivos colaterales | Correcciones mayores con regresiones | Reescribió archivos completos |
| Validación post-fix | Re-ejecutó tests y confirmó cero regresiones | Re-ejecutó pero hubo regresiones no vistas | No re-ejecutó |
| `diff-de-correcciones.md` | Tabla completa, separa IA vs manual | Tabla incompleta | Sin tabla |

**Trampa común:** corregir todo con un solo prompt enorme tipo "arregla todos los bugs que veas". Resultado: la IA reescribe el proyecto y el estudiante pierde el control.

---

## Dimensión 6 — Defensa oral (15 pts)

| Criterio | Excelente | Aceptable | Insuficiente |
|---|---|---|---|
| Demo funcional | Arranca, ejecuta llamados, todo responde correctamente | Arranca pero algún llamado falla | No arranca |
| Lectura crítica de su propio código | Explica cualquier línea que el docente señale | Explica algunas, otras no | "Eso lo hizo la IA, no sé qué hace" |
| Reflexión final | Respuestas concretas con ejemplos del taller | Respuestas genéricas | "Aprendí que la IA es útil" |
| Conocimiento de sus propios bugs | Recuerda 3+ bugs reportados y dónde estaban | Recuerda algunos | No recuerda |

**Trampa común:** "esta línea creo que es una validación... la generó Cursor... no estoy seguro de qué hace exactamente". Esto es deuda técnica visible y descuenta inmediatamente.

---

## Bonus (+5 pts máximo)

- **+2** por detectar un bug que el solucionario docente no tenía documentado.
- **+2** por una pregunta para la cliente especialmente perspicaz.
- **+1** por documentación adicional clara (README de su entrega, ejemplos de uso, etc.).

---

## Calificación final

| Rango | Calificación | Significado |
|---|---|---|
| 90 - 100 | A+ | Quality Guardian listo para industria |
| 80 - 89 | A | Vibecoder consciente, alto criterio |
| 70 - 79 | B | Aprobado, pero hay áreas claras de mejora |
| 60 - 69 | C | Reprobado en posgrado. Probablemente saltó etapas. |
| < 60 | F | Vibecodeó ciegamente. No recomendado promover. |

---

## Lo que NO califica el docente

- Que el código tenga 0 bugs. **No lo va a tener**, y está bien.
- Que la suite de tests esté 100% verde. **No lo necesita estar**, si los rojos están declarados.
- Que la IA haya generado código "elegante". **El criterio del estudiante** es lo que se evalúa, no la elegancia de un sistema generativo.

---

## Lo que SÍ califica el docente

- Que sepas defender cada decisión.
- Que distingas tu juicio del de la IA.
- Que documentes lo que sabes y lo que no sabes.
- Que reconozcas los huecos de tu propio trabajo.

**Esa es la diferencia entre un junior que vibe-codea y un Quality Guardian.**
