# Endpoints - proyecto-v1

## Base

- GET /

## Libros

- GET /libros
  - Respuesta 200: lista de libros con disponibilidad.

- POST /libros
  - Body:
    {
      "id": 101,
      "titulo": "Ingenieria del Software",
      "autor": "Pressman",
      "sala": "Sala General",
      "altaDemanda": false,
      "ejemplares": 3
    }
  - Respuesta 201:
    {
      "id": 101,
      "titulo": "Ingenieria del Software",
      "autor": "Pressman",
      "sala": "Sala General",
      "ejemplares": 3,
      "altaDemanda": false
    }
  - Errores:
    - 400: id, titulo, autor y sala son obligatorios.
    - 400: id invalido o ejemplares invalido.
    - 409: El libro ya existe.

## Estudiantes

- POST /estudiantes
  - Body:
    {
      "id": "EST-PRE-01",
      "nombre": "Ana Lopez",
      "programa": "Ingenieria de Sistemas",
      "semestre": 5,
      "tipo": "pregrado"
    }
  - Respuesta 201:
    {
      "id": "EST-PRE-01",
      "nombre": "Ana Lopez",
      "programa": "Ingenieria de Sistemas",
      "semestre": 5,
      "tipo": "pregrado"
    }
  - Errores:
    - 400: id, nombre, programa, semestre y tipo son obligatorios.
    - 400: tipo invalido o semestre invalido.
    - 409: El estudiante ya existe.

## Prestamos

- POST /prestamos
- POST /prestamos/:id/devolver
- GET /prestamos/vigentes
