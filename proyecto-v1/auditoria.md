## Auditoria inicial

### Metadatos

- Fecha: 2026-05-19
- Proyecto: proyecto-v1
- Alcance: rutas HTTP y documentacion tecnica

### Contexto

La estructura actual del proyecto no cubre endpoints necesarios para pruebas de integracion, lo que bloquea el flujo completo de carga de datos base.

### Hallazgos

- Faltan endpoints para registrar estudiantes y libros desde la API.
- La ausencia de estas rutas impide preparar datos para pruebas de reglas de negocio.

### Endpoints faltantes identificados

- POST /estudiantes
	- Proposito: crear estudiantes con tipo pregrado o posgrado.
	- Riesgo: sin este endpoint, no se pueden ejecutar pruebas RN1 y RN2.

- POST /libros
	- Proposito: registrar libros con indicador de alta demanda.
	- Riesgo: sin este endpoint, no se pueden cargar libros para prestamos.

### Evidencia

- No existe un handler de POST /estudiantes en las rutas actuales.
- No existe un handler de POST /libros en las rutas actuales.
