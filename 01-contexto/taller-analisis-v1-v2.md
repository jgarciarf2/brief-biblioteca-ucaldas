**Requisitos previos:** Haber explorado los proyectos `proyecto-v1` y `proyecto-v2` del repositorio

---

## Contexto

Durante este taller trabajarás con dos versiones de la misma API REST para gestión de préstamos de una biblioteca universitaria.

- **`proyecto-v1`** — Implementación simple en JavaScript con Express o . Sin validaciones formales, sin arquitectura en capas, sin tests.
- **`proyecto-v2`** — Implementación en TypeScript con Clean Architecture, validaciones con Zod, manejo de errores tipado y suite completa de tests unitarios e integración.

El objetivo no es determinar cuál versión es "mejor", sino comprender qué impacto tiene la estructura del código sobre la capacidad de probarlo.

---

## Antes de empezar

Levanta ambos servidores en terminales separadas:

```bash
# Terminal 1
cd proyecto-v1
node src/index.js
```

```bash
# Terminal 2
cd proyecto-v2
npm run dev
```

Verifica que ambos respondan:

```bash
curl http://localhost:3000/
curl http://localhost:3001/
```

---

## Bloque 1 — Lectura y comparación estructural

### Ejercicio 1.1 — Inventario de diferencias

Recorre ambos proyectos y completa la siguiente tabla en tu bitácora:

| Dimensión                          | v1  | v2  |
| ---------------------------------- | --- | --- |
| Lenguaje                           |     |     |
| Validación de entradas al servidor |     |     |
| Manejo de errores HTTP             |     |     |
| Arquitectura (número de capas)     |     |     |
| Tests incluidos                    |     |     |
| Tipado de datos                    |     |     |
| Forma de iniciar la aplicación     |     |     |

**Respuesta (Bloque 1.1)**

| Dimensión                          | v1                                                                                           | v2                                                                                             |
| ---------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Lenguaje                           | JavaScript (Node.js + Express).                                                              | TypeScript (Node.js + Express).                                                                |
| Validación de entradas al servidor | Validación minima en el handler de prestamos: solo campos requeridos, sin tipos ni formatos. | Validación basica en controladores (chequeo de presencia) y reglas de negocio en casos de uso. |
| Manejo de errores HTTP             | Respuestas directas con `res.status(...).json({ error })`.                                   | Errores tipados con `AppError` y handler central en cada controller.                           |
| Arquitectura (número de capas)     | Monolitico en un solo archivo.                                                               | Capas separadas: controllers, routes, use-cases, domain, infrastructure, shared.               |
| Tests incluidos                    | No hay tests.                                                                                | Tests unitarios e integracion en `tests/`.                                                     |
| Tipado de datos                    | Sin tipado.                                                                                  | Tipos y entidades en `src/domain`.                                                             |
| Forma de iniciar la aplicación     | `node app.js` (servidor definido en el mismo archivo).                                       | `src/index.ts` -> server -> app.                                                               |

### Ejercicio 1.2 — Rastreo de una regla de negocio

Localiza la **RN1: límite de préstamos simultáneos por tipo de estudiante** en ambas versiones y responde:

1. ¿En qué archivo está en v1? ¿En cuántas líneas se implementa?
2. ¿En qué archivo(s) está en v2? ¿Qué capas atraviesa?
3. Si el cliente pide cambiar el límite de pregrado de 3 a 4, ¿cuántos archivos hay que modificar en cada versión?
4. ¿Cómo sabrías que el cambio no rompió nada en cada versión?

**Respuesta (Bloque 1.2)**

1. En v1, la RN1 (limite por tipo de estudiante) **no esta implementada**. Solo hay validacion de disponibilidad de ejemplares por libro en [proyecto-v1/app.js](proyecto-v1/app.js#L60-L81).

2. En v2 esta en el caso de uso de creacion de prestamo: `getLimitePrestamos` y la validacion de `actuales >= limite` en [proyecto-v2/src/use-cases/prestamos/createPrestamo.ts](proyecto-v2/src/use-cases/prestamos/createPrestamo.ts#L29-L97). Capas: controller -> use-case -> repositorio in-memory.

3. Cambio pregrado 3 -> 4:

- v1: no hay RN1, por lo tanto hoy no hay archivo a cambiar (habria que agregar logica nueva en [proyecto-v1/app.js](proyecto-v1/app.js#L60-L94) si se quisiera implementar).
- v2: un solo archivo: [proyecto-v2/src/use-cases/prestamos/createPrestamo.ts](proyecto-v2/src/use-cases/prestamos/createPrestamo.ts#L29-L33).

4. Verificacion de no romper nada:

- v1: pruebas manuales (curl / Postman) porque no hay suite de tests.
- v2: ejecutar `npm test` para validar unitarios e integracion, mas un par de pruebas manuales.

---

## Bloque 2 — Análisis de calidad y comportamiento ante errores

**Modalidad:** Parejas  
**Tiempo:** 30 minutos

### Ejercicio 2.1 — El request que no debería funcionar

Ejecuta el siguiente comando contra **v1**:

```bash
curl -s -X POST http://localhost:3000/api/prestamos \
  -H "Content-Type: application/json" \
  -d '{"estudianteId": "NO-EXISTE", "ejemplarId": "abc"}' | jq
```

Luego ejecuta el mismo request contra **v2** (ajusta el puerto si es necesario).

Responde en tu bitácora:

1. ¿Qué código HTTP devuelve cada versión?
2. ¿Qué información contiene el cuerpo de la respuesta en cada caso?
3. ¿Cuál respuesta es más útil para un cliente que consume la API?
4. ¿Qué pasa en v1 si `ejemplarId` llega como string en lugar de número? ¿Y en v2?

**Respuesta (Bloque 2.1)**

Nota: en el codigo real, los endpoints son `/prestamos` en ambas versiones, no `/api/prestamos`.

1. Codigo HTTP:

- v1: 400.
- v2: 400.

2. Cuerpo de respuesta:

- v1: `{ "error": "libroId y estudianteId son obligatorios" }` (porque falta `libroId`).
- v2: `{ "error": "body_invalido" }` (porque espera `estudiante_id` y `ejemplar_id`).

3. Utilidad para cliente:

- v1 es mas explicita sobre campos faltantes.
- v2 es mas consistente para un cliente que maneja codigos de error tipados.

4. `ejemplarId` como string:

- v1 no usa `ejemplarId`, solo `libroId`. Si `libroId` llega como string numerico funciona (se convierte con `Number`), si no es numerico termina en 404 "El libro no existe".
- v2 trabaja con ids string (`ejemplar_id`), asi que un string es el formato esperado.

### Ejercicio 2.2 — Comparar errores de dominio

Provoca el mismo error de negocio en ambas versiones: intenta prestar un ejemplar que ya está prestado.

Pasos sugeridos:

1. Crea un préstamo con el ejemplar 1
2. Intenta crear otro préstamo con el mismo ejemplar 1

Registra y compara:

| Aspecto                                   | v1  | v2  |
| ----------------------------------------- | --- | --- |
| Código HTTP                               |     |     |
| Campo `error` en la respuesta             |     |     |
| Mensaje legible                           |     |     |
| Información adicional (detalles)          |     |     |
| ¿Expone información interna del servidor? |     |     |

**Respuesta (Bloque 2.2)**

Prueba realizada:

- v1: crear prestamo con `libroId=3` dos veces (el libro tiene 1 ejemplar).
- v2: intentar crear prestamo dos veces con `user-1`/`ej-1`.

Resultado:

| Aspecto                                   | v1                                   | v2                                   |
| ----------------------------------------- | ------------------------------------ | ------------------------------------ |
| Código HTTP                               | 201 en el primero, 409 en el segundo | 201 en el primero, 409 en el segundo |
| Campo `error` en la respuesta             | `No hay ejemplares disponibles`      | `ejemplar_no_disponible`             |
| Mensaje legible                           | Si                                   | Si (codigo de dominio)               |
| Información adicional (detalles)          | No                                   | No                                   |
| ¿Expone información interna del servidor? | No                                   | No                                   |

Nota: para v2 se uso seed de datos base (usuario `user-1` y ejemplar `ej-1`).

---

## Bloque 3 — Análisis de los tests de v2

### Ejercicio 3.1 — Lectura de un test unitario

Abre el archivo `proyecto-v2/tests/unit/CrearPrestamo.test.ts` y responde:

1. ¿Qué técnica de aislamiento se usa? (mocks, stubs, fakes, spies)
2. ¿Se levanta algún servidor HTTP para ejecutar este test? ¿Por qué importa esto?
3. Identifica en qué línea(s) del archivo se prueba la **RN4** (multa pendiente) y la **RN3** (préstamos vencidos pendientes).
4. ¿Cuánto tiempo tarda en ejecutarse este test? Corre `npm test` o el comando de testing correspondiente y estima el impacto en el flujo de desarrollo.

**Respuesta (Bloque 3.1)**

1. **Técnica de aislamiento:** Se utilizan **Fakes** mediante repositorios *in-memory* que persisten en un estado centralizado (`dataStore.ts`) y se inicializan de forma limpia con `seedStore`. No se emplean mocks dinámicos ni spies de Jest/Vitest.
2. **Servidor HTTP:** No se levanta ningún servidor HTTP o Express. Se importa e invoca directamente la función del caso de uso (`createPrestamo.ts`). Esto importa críticamente porque elimina la latencia de red, evita pruebas frágiles (*flaky tests*) y garantiza ejecuciones ultrarrápidas y deterministas.
3. **Líneas de la RN3 y RN4:** Estas reglas de negocio (préstamos vencidos y multas pendientes) están implementadas mediante validaciones internas dentro del flujo de `src/use-cases/prestamos/createPrestamo.ts`, pero la suite de pruebas unitarias original no incluía casos de test aislados para comprobarlas en este archivo.
4. **Tiempo de ejecución:** (Completando el comando como `npm test`). Al tratarse de pruebas puramente *in-memory* libres de operaciones de I/O de disco o red, la suite unitaria tarda **menos de 1 segundo** en completarse, proporcionando un *feedback loop* inmediato ideal para TDD.

---

## Bloque 4 — Escritura de tests

### Ejercicio 4.1 — Un test que v1 no puede tener con la misma velocidad

En `proyecto-v2`, escribe un test unitario para `CrearPrestamo` que verifique que un estudiante de **posgrado** puede tener hasta 5 préstamos simultáneos pero falla al intentar el sexto.

Plantilla de inicio:

```typescript
it("RN1 — posgrado falla al intentar el sexto préstamo", async () => {
  const vigentes: Prestamo[] = Array.from({ length: 5 }, (_, i) => ({
  }));
  // verifica que lanza LimitePrestamosAlcanzado
});
```

Una vez terminado, reflexiona: ¿por qué sería más lento o difícil escribir este test en v1?

**Respuesta (Bloque 4.1)**

Para verificar la RN1 en estudiantes de posgrado, se implementó el caso de prueba unitario en `tests/unit/CrearPrestamo.test.ts`.

El test sigue esta lógica:
- Se limpia el estado con `resetStore()` en `beforeEach`.
- Se crea un helper `buildPrestamo` para evitar duplicación y se generan 5 préstamos activos con `Array.from()`.
- Se siembra el *data store* con un usuario `estudiante_posgrado`, un libro y 6 ejemplares (el 6 disponible).
- Se invoca `executeCreatePrestamo` con `ej-6` y se valida con `try/catch` que lance `AppError` con `"limite_prestamos_alcanzado"`, `statusCode` 409 y detalles `{ limite: 5, actuales: 5 }`.

### Reflexión
En `proyecto-v1` sería más lento porque no hay inyección de dependencias ni repositorios *in-memory*: habría que levantar el servidor, hacer múltiples requests HTTP reales y limpiar estado global entre pruebas, lo cual hace el ciclo de feedback más lento y frágil.
