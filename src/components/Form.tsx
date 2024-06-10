// Importamos los hooks useState, useEffect y los tipos ChangeEvent, FormEvent, Dispatch desde React.
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
// Importamos la función uuidv4 para generar IDs únicos.
import { v4 as uuidv4 } from 'uuid';
// Importamos el tipo Activity desde el archivo de tipos.
import { Activity } from "../types";
// Importamos las categorías desde el archivo de datos.
import { categories } from "../data/categories";
// Importamos los tipos ActivityActions y ActivityState desde el archivo del reducer.
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

// Definimos los props que recibirá el componente Form.
type FormProps = {
    dispatch: Dispatch<ActivityActions>, // Función dispatch para enviar acciones al reducer.
    state: ActivityState // Estado actual de las actividades.
}

// Estado inicial para una nueva actividad.
const initialState: Activity = {
    id: '', // ID único de la actividad.
    category: 1, // ID de la categoría a la que pertenece la actividad.
    name: '', // Nombre de la actividad.
    calories: 0 // Cantidad de calorías asociadas con la actividad.
}

// Definimos el componente funcional Form.
export default function Form({ dispatch, state }: FormProps) {
    // Utilizamos el hook useState para manejar el estado local de la actividad.
    const [activity, setActivity] = useState<Activity>(initialState);

    // Utilizamos el hook useEffect para actualizar el formulario cuando cambia la actividad activa.
    useEffect(() => {
        if (state.activeId) {
            const activeActivity = state.activities.find(activity => activity.id === state.activeId);
            if (activeActivity) {
                setActivity(activeActivity); // Si hay una actividad activa, la cargamos en el estado local.
            }
        } else {
            setActivity(initialState); // Si no hay una actividad activa, volvemos al estado inicial.
        }
    }, [state.activeId, state.activities]);

    // Función para manejar cambios en los campos del formulario.
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value // Actualizamos el estado local.
        });
    }

    // Función para validar si la actividad es válida.
    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0; // La actividad debe tener un nombre y calorías mayores a 0.
    }

    // Función para manejar el envío del formulario.
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: "save-activity", payload: { activity } }); // Enviamos la acción para guardar la actividad.
        setActivity({ ...initialState, id: uuidv4() }); // Reiniciamos el formulario con un nuevo ID.
    }

    return (
        <form 
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <p className="text-center font-bold">Formulario</p>
            
            <div className="grid grid-cols-1 gap-3">
                <label className="text-bold" htmlFor="category">Categoría:</label>
                <select 
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label className="text-bold" htmlFor="name">Actividad:</label>
                <input 
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicios, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label className="text-bold" htmlFor="calories">Calorías:</label>
                <input 
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    placeholder="Calorías. ej. 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 rounded-lg font-bold uppercase text-white 
                cursor-pointer disabled:opacity-10"
                value={activity.id ? 'Actualizar Actividad' : 'Guardar Actividad'}
                disabled={!isValidActivity()} // Deshabilitamos el botón si la actividad no es válida.
            />
        </form>
    );
}

/* Este componente Form permite a los usuarios agregar o actualizar actividades, gestionando su estado localmente y actualizando el 
estado global mediante el uso del dispatch de useReducer. Además, persiste en el localStorage y se actualiza según el state.activeId 
para la edición de actividades. */