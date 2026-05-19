import { listLibros } from "../../infrastructure/persistence/sqlite/libroRepository";
import { listEjemplares } from "../../infrastructure/persistence/sqlite/ejemplarRepository";

export const executeListLibros = async (filters: {
  titulo?: string;
  autor?: string;
  sala?: string;
  disponible?: boolean;
}) => {
  const libros = await listLibros();
  const ejemplares = await listEjemplares();

  return libros.filter((libro) => {
    if (
      filters.titulo &&
      !libro.titulo.toLowerCase().includes(filters.titulo)
    ) {
      return false;
    }
    if (filters.autor && !libro.autor.toLowerCase().includes(filters.autor)) {
      return false;
    }
    if (filters.sala && libro.sala !== filters.sala) {
      return false;
    }
    if (filters.disponible !== undefined) {
      const disponibles = ejemplares.some(
        (ejemplar) =>
          ejemplar.libro_id === libro.id && ejemplar.estado === "disponible",
      );
      if (filters.disponible !== disponibles) {
        return false;
      }
    }
    return true;
  });
};
