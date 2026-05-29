# Bitacora del Taller — [Tu nombre]

> **Documento vivo.** Llenalo a medida que avanzas. No esperes al final.

---

## Seccion 1 — Hallazgos de la auditoria humana (Etapa 3)

### Inventario inicial

- **Archivos generados por la IA:** [lista]
- **Dependencias instaladas:** [lista]
- **Dependencias que NO pediste pero la IA agrego:** [lista]
- **Archivos que NO pediste pero la IA genero:** [lista]

### Mapeo de reglas a codigo

| Regla       | Archivo y linea aproximada | ¿Aplica correctamente? | Notas |
| ----------- | -------------------------- | ---------------------- | ----- |
| RN1 — [...] | [archivo:linea]            | Si / No / Parcial      | [...] |
| RN2 — [...] |                            |                        |       |
| RN3 — [...] |                            |                        |       |
| RN4 — [...] |                            |                        |       |
| RN5 — [...] |                            |                        |       |
| ...         |                            |                        |       |

### Hallazgos detectados

#### Hallazgo H1

- **Archivo:** [archivo y linea]
- **Tipo:** [bug / omision / decision cuestionable / codigo duplicado / etc.]
- **Severidad:** [alta / media / baja]
- **Regla violada:** [RNX o "ninguna especifica"]
- **Descripcion:** [que esta mal y como se manifiesta]
- **Como lo detecte:** [lectura humana / IA auditora / test fallando / llamado manual]
- **Reproduccion:** [pasos exactos para reproducirlo]

#### Hallazgo H2

[Repite la estructura. Minimo 5 hallazgos para una calificacion aceptable. 8+ para excelente.]

---

## Seccion 2 — Resultados de los tests (Etapa 4)

### Primera ejecucion

- **Tests totales:** [N]
- **Pasaron:** [N]
- **Fallaron:** [N]

### Analisis de los fallos

| Test           | Tipo de fallo  | ¿Bug del codigo o test mal escrito?   | Accion tomada   |
| -------------- | -------------- | ------------------------------------- | --------------- |
| `test_RN1_...` | AssertionError | Bug del codigo                        | Anotado como H6 |
| `test_RN2_...` | TypeError      | Test mal escrito (campo mal nombrado) | Corregi el test |
| ...            |                |                                       |                 |

### Ultima ejecucion (post-correcciones)

- **Tests totales:** [N]
- **Pasaron:** [N]
- **Fallaron:** [N — si quedo alguno, declarar abajo]

### Tests rojos declarados (bugs no corregidos por tiempo)

- [Lista de bugs que documentaste pero no alcanzaste a corregir, con justificacion]

---

## Seccion 3 — Bugs corregidos (Etapa 5)

### Bug B1

- **Hallazgo asociado:** H1 (de la seccion 1)
- **Descripcion del bug:** [...]
- **Test que lo revelo:** [nombre del test]
- **Correccion aplicada:** [resumen de la correccion]
- **Tipo de correccion:** [por mi a mano / por IA con prompt acotado / mixta]
- **Resultado:** test ahora pasa. Sin regresiones.

### Bug B2

[Repite]

---

## Seccion 4 — Aprendizajes (minimo 3)

### Aprendizaje A1

[Una observacion honesta de algo que descubriste hoy. No respondas lo politicamente correcto. Se especifico.]

**Ejemplo bueno:**

> "La IA genero codigo que parecia manejar correctamente las fechas, pero al ejecutar los tests descubri que estaba comparando strings ISO directamente con `<` y `>`, lo cual funciona por accidente con fechas del mismo ano pero rompe en otros casos. Aprendi que la IA confia en heuristicas que pueden ser fragiles."

**Ejemplo malo:**

> "Aprendi que la IA es util pero hay que revisarla."

### Aprendizaje A2

### Aprendizaje A3

[Minimo 3. Si tienes mas, mejor.]

---

## Seccion 5 — Decisiones de prompt (autorreflexion)

¿Hubo algun prompt que reescribiste a mitad de la sesion? Por ejemplo, primero le pediste a la IA "genera tests" y luego cambiaste a "genera tests anclados a las reglas de negocio sin mirar el codigo". Si paso algo asi, describelo.

[Tu respuesta]

¿Hubo algun momento en que la IA "dijo que termino" pero al verificar tu descubriste que no? Describelo.

[Tu respuesta]

---

## Chatbot Ollama — Registro

### Modelo usado

- Nombre: qwen2.5-coder:7b
- RAM consumida aproximada: 8 GB (estimado)

### Preguntas utiles que genero el chatbot

| Pregunta que hice                                                      | Que genero el chatbot                                                              | ¿Fue util?      |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------- |
| Crear datos base (estudiantes, libros, ejemplares)                     | cURL con endpoints `/api/estudiantes`, `/api/libros`, `/api/libros/:id/ejemplares` | Si, con ajustes |
| RN1: 3 prestamos y el 4to debe fallar                                  | cURL para crear 3 prestamos y un 4to                                               | Si, con ajustes |
| RN2: 5 prestamos y el 6to debe fallar                                  | cURL para crear 5 prestamos y un 6to                                               | Si, con ajustes |
| RN5: ejemplar ya prestado                                              | cURL para prestar dos veces el mismo ejemplar                                      | Si, con ajustes |
| RN6: plazo segun tipo de libro                                         | cURL y verificacion de fechas                                                      | Parcial         |
| Validaciones: body vacio, estudiante inexistente, ejemplar inexistente | cURL de pruebas de validacion                                                      | Si              |
| Analisis: devuelve 200 en vez de 409                                   | Explicacion de la regla violada y donde buscar                                     | Parcial         |

### Limitaciones observadas

- Invento campos que no estan en la especificacion (por ejemplo `tipo` en libro, y `fechaPrestamo` en varios cURL).
- Metio comentarios dentro del JSON (`// ...`), lo cual rompe el request.
- Creo cURL multilinea que termino en error de comillas (EOF al ejecutar).
- Asumio endpoints no confirmados (por ejemplo `GET /api/prestamos/EST-PRE-01`).
- No detecto que el servidor no estaba levantado en algunos momentos (errores de conexion).

### Comparacion: chatbot local vs ChatGPT/Claude en la nube

- Calidad: el local fue mas rapido, pero menos preciso con detalles de la API.
- Ventajas local: privacidad total y control del modelo.
- Desventajas local: mas alucinaciones de rutas y campos, necesita mas verificacion manual.
