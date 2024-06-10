// Exportamos un tipo 'Category' que describe la estructura de un objeto de categoría.
// Este tipo asegura que cualquier objeto de tipo 'Category' tenga las propiedades 'id' y 'name'.
export type Category = {
    id: number; // 'id' es un número que identifica de manera única a la categoría.
    name: string; // 'name' es una cadena de texto que representa el nombre de la categoría.
}

// Exportamos un tipo 'Activity' que describe la estructura de un objeto de actividad.
// Este tipo asegura que cualquier objeto de tipo 'Activity' tenga las propiedades 'id', 'category', 'name' y 'calories'.
export type Activity = {
    id: string; // 'id' es una cadena de texto que identifica de manera única a la actividad.
    category: number; // 'category' es un número que hace referencia al 'id' de una categoría, indicando a qué categoría pertenece la actividad.
    name: string; // 'name' es una cadena de texto que representa el nombre de la actividad.
    calories: number; // 'calories' es un número que indica la cantidad de calorías asociadas con la actividad.
}

/* Este archivo define y exporta los tipos Category y Activity, que se utilizan para asegurar que los objetos que representan 
categorías y actividades tengan una estructura consistente y predefinida en la aplicación. */