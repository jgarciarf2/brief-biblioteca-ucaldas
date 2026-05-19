# Auditoría Técnica — Módulo `v2`

---

**Fecha del documento:** 19 de Mayo de 2026

**Autor:** Auditor Senior Backend

**Versión auditada:** `proyecto-v2`

---

## 1. Diagnóstico Técnico

Tras una revisión exhaustiva del código fuente del módulo `v2`, se determina que **la gran mayoría o la totalidad de los comandos cURL documentados previamente NO existen ni funcionan en el código actual**.

Las rutas registradas actualmente en el módulo cubren únicamente operaciones de **consulta** (`GET`) sobre recursos secundarios (préstamos activos, historial, multas, ejemplares), y **carecen por completo de endpoints de registro (`POST`) para los recursos principales** definidos en la especificación:

| Recurso | Método `POST` | Estado actual |
|---|---|---|
| `/estudiantes` | Registrar estudiante | ❌ No existe |
| `/libros` | Registrar libro | ❌ No existe |
| `/prestamos` | Crear préstamo | ❌ No existe (solo `GET`) |

> **Conclusión:** Existe una brecha crítica entre la documentación de cURL previamente generada y la implementación real del backend. Los endpoints de escritura no están desarrollados.

---

## 2. Plan de Acción Inmediato

El paso obligatorio y bloqueante para continuar el desarrollo es **refactorizar el proyecto `v2`** con el objetivo de desarrollar y levantar los endpoints faltantes.

El orden de ejecución propuesto es:

1. **Definir entidades de dominio** actualizadas con los nuevos campos requeridos.
2. **Implementar los repositorios** de escritura en la capa de persistencia SQLite.
3. **Crear los casos de uso** de registro para cada recurso.
4. **Exponer los controladores y rutas `POST`** correspondientes.
5. **Validar con pruebas cURL** que los endpoints responden correctamente.

---

## 3. Alcance Inicial de la Refactorización

Por ahora, la refactorización se limitará estrictamente a **dos recursos prioritarios**:

### 3.1 Recurso `/estudiantes`

Se deberá implementar el endpoint `POST /estudiantes` con soporte explícito para las siguientes variaciones de tipo de estudiante:

- **`pregrado`** — Estudiante de programa de pregrado universitario.
- **`posgrado`** — Estudiante de programa de especialización, maestría o doctorado.

El campo `tipoEstudiante` es **obligatorio** y debe ser validado en la capa de dominio.

### 3.2 Recurso `/libros`

Se deberá implementar el endpoint `POST /libros`. El modelo de datos **debe incluir obligatoriamente** el campo booleano:

- **`altaDemanda`** (`boolean`) — Indica si el libro tiene alta circulación o reserva frecuente. Afecta las reglas de préstamo en versiones futuras.

---

## 4. Documentación Técnica y Pruebas

### 4.1 Especificación de Endpoints

#### `POST /api/v2/estudiantes`

Registra un nuevo estudiante en el sistema de biblioteca.

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `nombre` | `string` | ✅ | Nombre completo del estudiante |
| `codigo` | `string` | ✅ | Código institucional único |
| `correo` | `string` | ✅ | Correo electrónico institucional |
| `tipoEstudiante` | `"pregrado" \| "posgrado"` | ✅ | Modalidad académica del estudiante |
| `programa` | `string` | ✅ | Nombre del programa académico |
| `facultad` | `string` | ❌ | Facultad a la que pertenece |

**Respuesta exitosa:** `201 Created`

```json
{
  "id": 1,
  "nombre": "María Camila Torres",
  "codigo": "UCO-2026-001",
  "correo": "m.torres@ucaldas.edu.co",
  "tipoEstudiante": "pregrado",
  "programa": "Ingeniería de Sistemas",
  "facultad": "Ingeniería"
}
```

---

#### `POST /api/v2/libros`

Registra un nuevo libro en el catálogo de la biblioteca.

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `titulo` | `string` | ✅ | Título completo del libro |
| `autor` | `string` | ✅ | Nombre del autor o autores |
| `isbn` | `string` | ✅ | Identificador ISBN único |
| `anioPublicacion` | `number` | ✅ | Año de publicación |
| `editorial` | `string` | ❌ | Editorial del libro |
| `altaDemanda` | `boolean` | ✅ | Indica si el libro es de alta circulación |
| `ejemplaresDisponibles` | `number` | ✅ | Número de copias físicas disponibles |

**Respuesta exitosa:** `201 Created`

```json
{
  "id": 1,
  "titulo": "Introducción a los Algoritmos",
  "autor": "Cormen, Leiserson, Rivest, Stein",
  "isbn": "978-0262033848",
  "anioPublicacion": 2022,
  "editorial": "MIT Press",
  "altaDemanda": true,
  "ejemplaresDisponibles": 3
}
```

---

### 4.2 Pruebas cURL — Método `POST`

Los siguientes comandos están diseñados para validar el funcionamiento de los nuevos endpoints una vez implementados. El servidor debe estar corriendo en `http://localhost:3000`.

---

#### Prueba 1 — Registrar estudiante de **pregrado**

```bash
curl -X POST http://localhost:3000/api/v2/estudiantes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María Camila Torres Ríos",
    "codigo": "UCO-2026-001",
    "correo": "m.torres@ucaldas.edu.co",
    "tipoEstudiante": "pregrado",
    "programa": "Ingeniería de Sistemas",
    "facultad": "Ingeniería"
  }'
```

**Resultado esperado:** `HTTP 201 Created` con el objeto del estudiante creado.

---

#### Prueba 2 — Registrar estudiante de **posgrado**

```bash
curl -X POST http://localhost:3000/api/v2/estudiantes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Carlos Andrés Mejía Posada",
    "codigo": "UCO-2026-002",
    "correo": "c.mejia@ucaldas.edu.co",
    "tipoEstudiante": "posgrado",
    "programa": "Maestría en Computación",
    "facultad": "Ingeniería"
  }'
```

**Resultado esperado:** `HTTP 201 Created` con el objeto del estudiante creado.

---

#### Prueba 3 — Registrar libro con `altaDemanda: true`

```bash
curl -X POST http://localhost:3000/api/v2/libros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Introducción a los Algoritmos",
    "autor": "Cormen, Leiserson, Rivest, Stein",
    "isbn": "978-0262033848",
    "anioPublicacion": 2022,
    "editorial": "MIT Press",
    "altaDemanda": true,
    "ejemplaresDisponibles": 3
  }'
```

**Resultado esperado:** `HTTP 201 Created`. El campo `altaDemanda: true` activa las restricciones de préstamo en versiones futuras.

---

#### Prueba 4 — Registrar libro con `altaDemanda: false`

```bash
curl -X POST http://localhost:3000/api/v2/libros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "El Quijote de la Mancha",
    "autor": "Miguel de Cervantes Saavedra",
    "isbn": "978-8491050643",
    "anioPublicacion": 2015,
    "editorial": "Planeta",
    "altaDemanda": false,
    "ejemplaresDisponibles": 8
  }'
```

**Resultado esperado:** `HTTP 201 Created`. Libro disponible sin restricciones adicionales de circulación.

---

## 5. Historial de Cambios (Changelog)

| Versión | Fecha | Tipo de Cambio | Descripción |
|---|---|---|---|
| `v2.0.0-audit` | 2026-05-19 | Análisis / Diagnóstico | Auditoría inicial del módulo `v2`. Se detecta brecha crítica entre los comandos cURL documentados y los endpoints reales del backend. Se define el alcance de refactorización prioritario: `POST /estudiantes` (pregrado/posgrado) y `POST /libros` (con campo `altaDemanda`). Sirve como punto de partida formal para la nivelación de rutas. |
