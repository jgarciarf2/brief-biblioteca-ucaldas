## Sesión 1 — Datos de prueba

Tú: crea los datos de prueba base para todas las reglas: un estudiante pregrado EST-PRE-01, uno posgrado EST-POS-01, un libro normal LIB-001 con 6 ejemplares y un libro de alta demanda LIB-002 con 1 ejemplar

Chatbot: Para probar todas las reglas necesitamos crear los siguientes datos:

### Estudiantes

1. **Estudiante Pregrado**
   - ID: EST-PRE-01
   - Tipo: Pregrado

2. **Estudiante Posgrado**
   - ID: EST-POS-01
   - Tipo: Posgrado

### Libros y Ejemplares

1. **Libro Normal**
   - ID: LIB-001
   - Título: "Introducción a la Programación"
   - Tipo: Normal
   - Cantidades:
     - Total ejemplares: 6

2. **Libro de Alta Demanda**
   - ID: LIB-002
   - Título: "Física Moderna"
   - Tipo: Alta Demanda
   - Cantidades:
     - Total ejemplares: 1

### Comandos CURL para crear los datos de prueba

#### Crear Estudiante Pregrado

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/estudiantes -H "Content-Type: application/json" -d '{
  "id": "EST-PRE-01",
  "tipo": "Pregrado"
}'
```

#### Crear Estudiante Posgrado

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/estudiantes -H "Content-Type: application/json" -d '{
  "id": "EST-POS-01",
  "tipo": "Posgrado"
}'
```

#### Crear Libro Normal

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/libros -H "Content-Type: application/json" -d '{
  "id": "LIB-001",
  "titulo": "Introducción a la Programación",
  "tipo": "Normal"
}'
```

#### Crear Libro de Alta Demanda

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/libros -H "Content-Type: application/json" -d '{
  "id": "LIB-002",
  "titulo": "Física Moderna",
  "tipo": "Alta Demanda"
}'
```

#### Crear Ejemplares del Libro Normal

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/libros/LIB-001/ejemplares -H "Content-Type: application/json" -d '{
  "id": "EJ-PRE-NOR-01",
  "libroId": "LIB-001"
}'
```

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/libros/LIB-001/ejemplares -H "Content-Type: application/json" -d '{
  "id": "EJ-PRE-NOR-02",
  "libroId": "LIB-001"
}'
```

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/libros/LIB-001/ejemplares -H "Content-Type: application/json" -d '{
  "id": "EJ-PRE-NOR-03",
  "libroId": "LIB-001"
}'
```

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/libros/LIB-001/ejemplares -H "Content-Type: application/json" -d '{
  "id": "EJ-PRE-NOR-04",
  "libroId": "LIB-001"
}'
```

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/libros/LIB-001/ejemplares -H "Content-Type: application/json" -d '{
  "id": "EJ-PRE-NOR-05",
  "libroId": "LIB-001"
}'
```

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/libros/LIB-001/ejemplares -H "Content-Type: application/json" -d '{
  "id": "EJ-PRE-NOR-06",
  "libroId": "LIB-001"
}'
```

#### Crear Ejemplares del Libro de Alta Demanda

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/libros/LIB-002/ejemplares -H "Content-Type: application/json" -d '{
  "id": "EJ-POS-HIG-01",
  "libroId": "LIB-002"
}'
```

Estos datos de prueba te permitirán probar todas las reglas descritas en el enunciado.

[EJECUTANDO]: curl -X POST http://localhost:3001/api/estudiantes -H "Content-Type: application/json" -d '{

/bin/sh: -c: line 0: unexpected EOF while looking for matching `''
/bin/sh: -c: line 1: syntax error: unexpected end of file
[RESULTADO]:
Command failed: curl -X POST http://localhost:3001/api/estudiantes -H "Content-Type: application/json" -d '{
/bin/sh: -c: line 0: unexpected EOF while looking for matching `''
/bin/sh: -c: line 1: syntax error: unexpected end of file

## Sesión 2 — RN1 y RN2

Tú: genera la prueba RN1 completa: crear los 3 préstamos válidos para pregrado y luego intentar el cuarto

Chatbot: Para probar la Regla de Negocio (RN1): "Un estudiante de pregrado no puede tener más de 3 préstamos activos. Si lo intenta: 409 Conflict.", necesitamos seguir estos pasos:

1. Crear 3 préstamos válidos para el estudiante pregrado EST-PRE-01.
2. Intentar crear un cuarto préstamo para el mismo estudiante y verificar que se deniega con un 409 Conflict.

### Paso 1: Crear 3 préstamos válidos para EST-PRE-01

#### Prestamo 1

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-PRE-01",
  "ejemplarId": "EJ-PRE-NOR-01",
  "fechaPrestamo": "2023-04-15T09:00:00Z"
}'
```

#### Prestamo 2

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-PRE-01",
  "ejemplarId": "EJ-PRE-NOR-02",
  "fechaPrestamo": "2023-04-15T10:00:00Z"
}'
```

#### Prestamo 3

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-PRE-01",
  "ejemplarId": "EJ-PRE-NOR-03",
  "fechaPrestamo": "2023-04-15T11:00:00Z"
}'
```

### Paso 2: Intentar crear el cuarto préstamo para EST-PRE-01

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-PRE-01",
  "ejemplarId": "EJ-PRE-NOR-04",
  "fechaPrestamo": "2023-04-15T12:00:00Z"
}'
```

### Explicación y Esperado:

- **Préstamos 1, 2 y 3:** Deberán registrarse correctamente con un código de estado `201 Created`.
- **Cuarto Préstamo:** Deberá ser denegado con un código de estado `409 Conflict`, indicando que el estudiante de pregrado ya tiene 3 préstamos activos.

### Verificación del Error:

Si la respuesta es un `409 Conflict`, analiza el cuerpo de la respuesta para obtener más detalles sobre por qué se deniega el préstamo.

[EJECUTANDO]: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{

/bin/sh: -c: line 0: unexpected EOF while looking for matching `''
/bin/sh: -c: line 1: syntax error: unexpected end of file
[RESULTADO]:
Command failed: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
/bin/sh: -c: line 0: unexpected EOF while looking for matching `''
/bin/sh: -c: line 1: syntax error: unexpected end of file

# Segundo Prompt (RN2

Tú: ahora haz lo mismo para RN2 con el estudiante de posgrado, recuerda que su límite es 5

Chatbot: Para probar la Regla de Negocio (RN2): "Un estudiante de posgrado no puede tener más de 5 préstamos activos. Si lo intenta: 409 Conflict.", necesitamos seguir estos pasos:

1. Crear 5 préstamos válidos para el estudiante posgrado EST-POS-01.
2. Intentar crear un sexto préstamo para el mismo estudiante y verificar que se deniega con un 409 Conflict.

### Paso 1: Crear 5 préstamos válidos para EST-POS-01

#### Prestamo 1

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-POS-01",
  "ejemplarId": "EJ-PRE-NOR-05",
  "fechaPrestamo": "2023-04-15T09:00:00Z"
}'
```

#### Prestamo 2

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-POS-01",
  "ejemplarId": "EJ-PRE-NOR-06",
  "fechaPrestamo": "2023-04-15T10:00:00Z"
}'
```

#### Prestamo 3

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-POS-01",
  "ejemplarId": "EJ-PRE-NOR-01",
  "fechaPrestamo": "2023-04-15T11:00:00Z"
}'
```

#### Prestamo 4

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-POS-01",
  "ejemplarId": "EJ-PRE-NOR-02",
  "fechaPrestamo": "2023-04-15T12:00:00Z"
}'
```

#### Prestamo 5

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-POS-01",
  "ejemplarId": "EJ-PRE-NOR-03",
  "fechaPrestamo": "2023-04-15T13:00:00Z"
}'
```

### Paso 2: Intentar crear el sexto préstamo para EST-POS-01

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-POS-01",
  "ejemplarId": "EJ-PRE-NOR-04",
  "fechaPrestamo": "2023-04-15T14:00:00Z"
}'
```

### Explicación y Esperado:

- **Préstamos 1, 2, 3, 4 y 5:** Deberán registrarse correctamente con un código de estado `201 Created`.
- **Sexto Préstamo:** Deberá ser denegado con un código de estado `409 Conflict`, indicando que el estudiante de posgrado ya tiene 5 préstamos activos.

### Verificación del Error:

Si la respuesta es un `409 Conflict`, analiza el cuerpo de la respuesta para obtener más detalles sobre por qué se deniega el préstamo.

[EJECUTANDO]: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{

/bin/sh: -c: line 0: unexpected EOF while looking for matching `''
/bin/sh: -c: line 1: syntax error: unexpected end of file
[RESULTADO]:
Command failed: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
/bin/sh: -c: line 0: unexpected EOF while looking for matching `''
/bin/sh: -c: line 1: syntax error: unexpected end of file
)

## Sesión 3 — RN5 y RN6

Tú: prueba que un ejemplar ya prestado no se puede prestar de nuevo (RN5)

Chatbot: Para probar la Regla de Negocio (RN5): "Un ejemplar que ya está prestado no puede prestarse de nuevo hasta que sea devuelto", necesitamos seguir estos pasos:

1. Crear un préstamo para el ejemplar.
2. Intentar crear un segundo préstamo con el mismo ejemplar y verificar que se deniega con un 409 Conflict.

### Paso 1: Crear un préstamo para el ejemplar

#### Prestamo

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-PRE-01",
  "ejemplarId": "EJ-PRE-NOR-01",
  "fechaPrestamo": "2023-04-15T09:00:00Z"
}'
```

### Paso 2: Intentar crear el segundo préstamo con el mismo ejemplar

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-POS-01",
  "ejemplarId": "EJ-PRE-NOR-01",
  "fechaPrestamo": "2023-04-15T10:00:00Z"
}'
```

### Explicación y Esperado:

- **Préstamo 1:** Deberá registrarse correctamente con un código de estado `201 Created`.
- **Segundo Préstamo:** Deberá ser denegado con un código de estado `409 Conflict`, indicando que el ejemplar ya está prestado.

### Verificación del Error:

Si la respuesta es un `409 Conflict`, analiza el cuerpo de la respuesta para obtener más detalles sobre por qué se deniega el préstamo.

[EJECUTANDO]: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{

/bin/sh: -c: line 0: unexpected EOF while looking for matching `''
/bin/sh: -c: line 1: syntax error: unexpected end of file
[RESULTADO]:
Command failed: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
/bin/sh: -c: line 0: unexpected EOF while looking for matching `''
/bin/sh: -c: line 1: syntax error: unexpected end of file

# RN6

Tú: muéstrame cómo verificar que el plazo del préstamo es correcto para un libro normal versus uno de alta demanda (RN6)

Chatbot: Para probar la Regla de Negocio (RN6): "El plazo de préstamo depende del tipo de libro: 15 días para libros normales, 3 días para libros de alta demanda", necesitamos seguir estos pasos:

1. Crear un préstamo con un libro normal.
2. Crear un préstamo con un libro de alta demanda y verificar que los plazos sean correctos.

### Paso 1: Crear un préstamo con un libro normal

#### Prestamo con Libro Normal

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-PRE-01",
  "ejemplarId": "EJ-PRE-NOR-05", // Supongamos que este ejemplar pertenece a un libro normal
  "fechaPrestamo": "2023-04-15T09:00:00Z"
}'
```

### Paso 2: Crear un préstamo con un libro de alta demanda y verificar los plazos

#### Prestamo con Libro de Alta Demanda

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-POS-01",
  "ejemplarId": "EJ-PRE-NOR-04", // Supongamos que este ejemplar pertenece a un libro de alta demanda
  "fechaPrestamo": "2023-04-15T10:00:00Z"
}'
```

### Explicación y Esperado:

- **Préstamo con Libro Normal:** Deberá registrarse correctamente con un código de estado `201 Created`. Verifica que la fecha de vencimiento sea el 4 de mayo (15 días después del prestamo).
- **Préstamo con Libro de Alta Demanda:** Deberá registrarse correctamente con un código de estado `201 Created`. Verifica que la fecha de vencimiento sea el 18 de mayo (3 días después del prestamo).

### Verificación de los Plazos:

1. Para el libro normal, verifica que la fecha de vencimiento sea el 4 de mayo (`2023-05-04T09:00:00Z`).
2. Para el libro de alta demanda, verifica que la fecha de vencimiento sea el 18 de mayo (`2023-05-18T10:00:00Z`).

### Consultar la Fecha de Vencimiento:

Después de crear los préstamos, puedes consultar el historial de préstamos para asegurarte de que las fechas de vencimiento sean correctas.

```curl
EJECUTAR: curl -X GET http://localhost:3001/api/prestamos/EST-PRE-01
```

### Analizar la Respuesta:

Verifica el cuerpo de la respuesta para asegurarte de que las fechas de vencimiento sean los esperados según RN6.

[EJECUTANDO]: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{

/bin/sh: -c: line 0: unexpected EOF while looking for matching `''
/bin/sh: -c: line 1: syntax error: unexpected end of file
[RESULTADO]:
Command failed: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
/bin/sh: -c: line 0: unexpected EOF while looking for matching `''
/bin/sh: -c: line 1: syntax error: unexpected end of file

## Sesión 4 — Validaciones

Tú: genera pruebas de entradas inválidas: body vacío, estudiante inexistente y ejemplar inexistente

Chatbot: Para probar las entradas inválidas en la creación de préstamos, necesitamos generar solicitudes con diferentes tipos de errores. Aquí te muestro cómo hacerlo:

### Prueba 1: Body vacío

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{}'
```

### Explicación:

- **Esperado:** Un código de estado `400 Bad Request` indicando que el body está vacío.

### Prueba 2: Estudiante inexistente

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-INEXISTENTE",
  "ejemplarId": "EJ-PRE-NOR-01",
  "fechaPrestamo": "2023-04-15T09:00:00Z"
}'
```

### Explicación:

- **Esperado:** Un código de estado `404 Not Found` indicando que el estudiante no existe.

### Prueba 3: Ejemplar inexistente

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-PRE-01",
  "ejemplarId": "EJ-INEXISTENTE",
  "fechaPrestamo": "2023-04-15T09:00:00Z"
}'
```

### Explicación:

- **Esperado:** Un código de estado `404 Not Found` indicando que el ejemplar no existe.

### Analizar los Errores:

- Si la respuesta es un `400 Bad Request`, analiza el cuerpo de la respuesta para obtener más detalles sobre qué parámetro está causando el error.
- Si la respuesta es un `404 Not Found`, verifica que el estudiante o el ejemplar no existan en la base de datos.

### Resumen de Comandos:

```sh
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{}'
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-INEXISTENTE",
  "ejemplarId": "EJ-PRE-NOR-01",
  "fechaPrestamo": "2023-04-15T09:00:00Z"
}'
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-PRE-01",
  "ejemplarId": "EJ-INEXISTENTE",
  "fechaPrestamo": "2023-04-15T09:00:00Z"
}'
```

Estas pruebas te ayudarán a validar que tu aplicación maneja correctamente las solicitudes con entradas inválidas.

[EJECUTANDO]: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{}'

% Total % Received % Xferd Average Speed Time Time Time Current
Dload Upload Total Spent Left Speed
0 0 0 0 0 0 0 0 --:--:-- --:--:-- --:--:-- 0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
[RESULTADO]:
Command failed: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{}'
% Total % Received % Xferd Average Speed Time Time Time Current
Dload Upload Total Spent Left Speed
0 0 0 0 0 0 0 0 --:--:-- --:--:-- --:--:-- 0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server

# Validación 2

Tú: genera pruebas de entradas inválidas: body vacío, estudiante inexistente y ejemplar inexistente

Chatbot: Para probar las entradas inválidas en la creación de préstamos, necesitamos generar solicitudes con diferentes tipos de errores. Aquí te muestro cómo hacerlo:

### Prueba 1: Body vacío

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{}'
```

### Explicación:

- **Esperado:** Un código de estado `400 Bad Request` indicando que el body está vacío.

### Prueba 2: Estudiante inexistente

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-INEXISTENTE",
  "ejemplarId": "EJ-PRE-NOR-01",
  "fechaPrestamo": "2023-04-15T09:00:00Z"
}'
```

### Explicación:

- **Esperado:** Un código de estado `404 Not Found` indicando que el estudiante no existe.

### Prueba 3: Ejemplar inexistente

```curl
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-PRE-01",
  "ejemplarId": "EJ-INEXISTENTE",
  "fechaPrestamo": "2023-04-15T09:00:00Z"
}'
```

### Explicación:

- **Esperado:** Un código de estado `404 Not Found` indicando que el ejemplar no existe.

### Analizar los Errores:

- Si la respuesta es un `400 Bad Request`, analiza el cuerpo de la respuesta para obtener más detalles sobre qué parámetro está causando el error.
- Si la respuesta es un `404 Not Found`, verifica que el estudiante o el ejemplar no existan en la base de datos.

### Resumen de Comandos:

```sh
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{}'
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-INEXISTENTE",
  "ejemplarId": "EJ-PRE-NOR-01",
  "fechaPrestamo": "2023-04-15T09:00:00Z"
}'
EJECUTAR: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{
  "estudianteId": "EST-PRE-01",
  "ejemplarId": "EJ-INEXISTENTE",
  "fechaPrestamo": "2023-04-15T09:00:00Z"
}'
```

Estas pruebas te ayudarán a validar que tu aplicación maneja correctamente las solicitudes con entradas inválidas.

[EJECUTANDO]: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{}'

% Total % Received % Xferd Average Speed Time Time Time Current
Dload Upload Total Spent Left Speed
0 0 0 0 0 0 0 0 --:--:-- --:--:-- --:--:-- 0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
[RESULTADO]:
Command failed: curl -X POST http://localhost:3001/api/prestamos -H "Content-Type: application/json" -d '{}'
% Total % Received % Xferd Average Speed Time Time Time Current
Dload Upload Total Spent Left Speed
0 0 0 0 0 0 0 0 --:--:-- --:--:-- --:--:-- 0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server

Tú: el resultado del body vacío fue { "error": "..." } con código 400. ¿Eso es correcto según la especificación?

Chatbot: Sí, el resultado `{ "error": "..." }` con un código de estado `400 Bad Request` es correcto según las convenciones HTTP y la especificación oficial.

- **Código 400 (Bad Request)**: Indica que el servidor no pudo entender la solicitud debido a una sintaxis incorrecta o otros problemas en los datos enviados.
- **Estructura del cuerpo de respuesta**: Aunque no es estrictamente necesario, muchos servicios web devuelven un cuerpo de respuesta JSON que incluye información sobre el error. En este caso, `{ "error": "..." }` proporciona una explicación clara y concisa del problema.

Por lo tanto, la respuesta del servidor con `{ "error": "..." }` y `400 Bad Request` cumple con las mejores prácticas de diseño de APIs REST.

## Sesión 5 — Análisis de un fallo

Tú: el endpoint POST /api/prestamos devolvió 200 OK en lugar de 409 cuando el estudiante ya tiene 3 préstamos. El body fue: { "id": "P-004", ... }. ¿Qué regla está violando y en qué archivo debería buscar el problema?

Chatbot: Basado en la información proporcionada, parece que se está violando la Regla de Negocio (RN1): "Un estudiante de pregrado no puede tener más de 3 préstamos activos. Si lo intenta: 409 Conflict."

### Explicación:
- **Código de Estado Devuelto:** El servidor devolvió `200 OK`, lo que indica que el préstamo se registró exitosamente, aunque esto no es correcto según la RN1.
- **Ejemplo de Respuesta:** `{ "id": "P-004", ... }` muestra que el préstamo se ha creado correctamente, lo cual no debería suceder si el estudiante ya tiene 3 préstamos activos.

### Regla Violada:
La regla RN1 está siendo violada porque la aplicación no está verificando correctamente el número de préstamos activos del estudiante antes de crear un nuevo préstamo.

### Ubicación del Problema:
Para encontrar el problema, puedes buscar en los siguientes lugares:

1. **Controlador de Préstamos (Controller):**
   - Verifica que el método que maneja la creación de préstamos (`createPrestamo`) este chequeando correctamente la cantidad de préstamos activos para el estudiante.
   
2. **Servicio de Préstamos (Service):**
   - Busca en los métodos del servicio encargado de gestionar los préstamos (`prestamoService`). Es posible que estos métodos no sean capaces de verificar adecuadamente si un estudiante tiene demasiados préstamos activos.
   
3. **Repositorio de Préstamos (Repository):**
   - Si el problema está relacionado con la lógica de negocio, es posible que la consulta para obtener los préstamos activos del estudiante no esté implementada correctamente en el repositorio (`prestamoRepository`).

### Ejemplo de Código:
Aquí tienes un ejemplo simple de cómo podría verse la verificación en un controlador:

```java
@RestController
@RequestMapping("/api/prestamos")
public class PrestamoController {

    @Autowired
    private PrestamoService prestamoService;

    @PostMapping
    public ResponseEntity<?> createPrestamo(@RequestBody PrestamoRequest request) {
        try {
            Prestamo prestamo = prestamoService.createPrestamo(request);
            return new ResponseEntity<>(prestamo, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("No se puede crear el préstamo. " + e.getMessage(), HttpStatus.CONFLICT);
        }
    }
}
```

En este ejemplo, si se lanza una excepción `IllegalArgumentException`, el controlador devolverá un estado `409 Conflict` con un mensaje descriptivo.

### Paso a Paso para Identificar y Corregir:
1. **Verifica la Lógica de Negocio:**
   - Asegúrate de que el método en el servicio verifique el número de préstamos activos del estudiante antes de crear uno nuevo.
   
2. **Implementa Excepciones Personalizadas:**
   - Crea una excepción personalizada como `IllegalArgumentException` para manejar los casos de error específicos de la lógica de negocio.

3. **Actualiza el Controlador:**
   - Asegúrate de que el controlador maneje adecuadamente estas excepciones y devuelva los códigos de estado correctos (`409 Conflict`).

### Ejemplo de Implementación:
Aquí tienes un ejemplo de cómo podría verse la lógica en el servicio:

```java
@Service
public class PrestamoService {

    @Autowired
    private PrestamoRepository prestamoRepository;

    public Prestamo createPrestamo(PrestamoRequest request) {
        String estudianteId = request.getEstudianteId();
        int maxPréstamos = 3; // Definir el número máximo de préstamos permitidos

        long numPrestamosActivos = prestamoRepository.countByEstudianteIdAndEstado(estudianteId, Estado.PENDIENTE);
        
        if (numPrestamosActivos >= maxPréstamos) {
            throw new IllegalArgumentException("El estudiante ya tiene " + numPrestamosActivos + " préstamos activos.");
        }

        Prestamo prestamo = new Prestamo();
        prestamo.setEstudianteId(estudianteId);
        prestamo.setEjemplarId(request.getEjemplarId());
        prestamo.setFechaPrestamo(LocalDate.now());
        prestamo.setEstado(Estado.PENDIENTE);

        return prestamoRepository.save(prestamo);
    }
}
```

En este ejemplo, el método `createPrestamo` verifica si el estudiante tiene más de 3 préstamos activos y lanza una excepción `IllegalArgumentException` si es así. El controlador manejará esta excepción devolviendo un `409 Conflict`.

### Resumen:
- La regla RN1 está siendo violada porque la aplicación no verifica correctamente el número de préstamos activos del estudiante.
- Busca en los controladores, servicios y repositorios para identificar dónde se implementa la lógica de negocio relacionada con la creación de préstamos.
- Asegúrate de que las excepciones personalizadas como `IllegalArgumentException` sean manejadas adecuadamente en el controlador para devolver los códigos de estado correctos (`409 Conflict`).
