## Auditoria de cambios

### Resumen

- Se agrego el repositorio de estudiantes para crear y consultar estudiantes.
- Se extendio el repositorio de libros para guardar sala y alta_demanda, y se agrego la funcion de creacion.
- Se actualizo la inicializacion de SQLite para crear la tabla estudiantes y nuevas columnas en libros.
- Se agregaron los endpoints POST /estudiantes y POST /libros en el archivo de rutas principal.
- Se actualizo la documentacion de endpoints en endpoints.md.

### Archivos modificados o creados

- src/db/sqlite.ts
- src/index.ts
- src/repositories/libroRepository.ts
- src/repositories/estudianteRepository.ts (nuevo)
- endpoints.md (nuevo)

### Pruebas de integracion (cURL)

POST /estudiantes

```bash
curl -s -X POST http://localhost:3000/estudiantes \
  -H "Content-Type: application/json" \
  -d '{"id":"EST-PRE-01","nombre":"Ana Lopez","programa":"Ingenieria de Sistemas","semestre":5,"tipo":"pregrado"}'
```

POST /libros

```bash
curl -s -X POST http://localhost:3000/libros \
  -H "Content-Type: application/json" \
  -d '{"id":101,"titulo":"Ingenieria del Software","autor":"Pressman","sala":"Sala General","altaDemanda":false,"ejemplares":3}'
```
