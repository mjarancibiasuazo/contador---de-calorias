// Importamos el tipo 'Category' desde el archivo de tipos ubicado en "../types/index".
// Esto nos asegura que las categorías que definamos cumplan con la estructura esperada de un objeto de tipo 'Category'.
import type { Category } from "../types/index"

// Definimos una constante 'categories' que es un arreglo de objetos de tipo 'Category'.
// Utilizamos el tipo 'Category[]' para indicar que 'categories' es un arreglo que contiene elementos de tipo 'Category'.
export const categories: Category[] = [
  // Cada objeto en este arreglo debe seguir la estructura definida por el tipo 'Category'.
  { id: 1, name: 'Comida' }, // Primera categoría con id 1 y nombre 'Comida'.
  { id: 2, name: 'Ejercicio' } // Segunda categoría con id 2 y nombre 'Ejercicio'.
]

/* Este código define un arreglo de categorías con un tipo específico para asegurar que cada objeto dentro del arreglo 
tenga una estructura consistente. */