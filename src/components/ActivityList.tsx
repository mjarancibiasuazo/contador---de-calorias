// Importamos el tipo Activity desde el archivo de tipos.
import { Activity } from "../types";
// Importamos las categorías desde el archivo de datos.
import { categories } from "../data/categories";
// Importamos el tipo Dispatch desde React.
import { Dispatch } from "react";
// Importamos los íconos de Heroicons para editar y eliminar actividades.
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
// Importamos los tipos de acciones del reducer.
import { ActivityActions } from "../reducers/activity-reducer";

// Definimos los props que recibirá el componente ActivityList.
type ActivityListProps = {
  activities: Activity[], // Lista de actividades.
  dispatch: Dispatch<ActivityActions> // Función dispatch para enviar acciones al reducer.
}

// Definimos el componente funcional ActivityList.
export default function ActivityList({ activities, dispatch }: ActivityListProps) {
  // Función para obtener el nombre de la categoría basado en su ID.
  const getCategoryName = (category: Activity['category']) => {
    const categoryObj = categories.find(cat => cat.id === category);
    return categoryObj ? categoryObj.name : '';
  }

  return (
    <>
      {/* Título del listado de actividades */}
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>

      {/* Mensaje cuando no hay actividades */}
      {activities.length === 0 ? (
        <p className="text-center mt-10">No hay actividades aún....</p>
      ) : null}

      {/* Mapeamos las actividades para mostrarlas */}
      {activities.map(activity => (
        <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
          <div className="space-y-2 relative">
            {/* Nombre de la categoría */}
            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-red-500'}`}>
              {getCategoryName(activity.category)}
            </p>
            {/* Nombre de la actividad */}
            <p className="text-2xl font-bold pt-5">{activity.name}</p>
            {/* Calorías de la actividad */}
            <p className="font-black text-4xl text-lime-500">
              {activity.calories} {''}
              <span>Calorías</span>
            </p>
          </div>
          <div className="flex gap-5 items-center">
            {/* Botón para editar la actividad */}
            <button 
              onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}
            >
              <PencilSquareIcon 
                className="h-8 w-8 text-gray-800" 
              />
            </button>

            {/* Botón para eliminar la actividad */}
            <button 
              onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}
            >
              <XCircleIcon
                className="h-8 w-8 text-red-500" 
              />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

/* Este componente ActivityList se encarga de mostrar una lista de actividades. Utiliza la función dispatch para manejar 
las acciones de editar (set-activeId) y eliminar (delete-activity) actividades. También se incluye una función getCategoryName 
para obtener el nombre de la categoría correspondiente a cada actividad. Si no hay actividades, muestra un mensaje indicándolo.*/