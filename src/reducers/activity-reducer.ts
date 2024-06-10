// Importamos uuid para generar IDs únicos.
import { v4 as uuidv4 } from 'uuid';
// Importamos el tipo Activity desde el archivo de tipos.
import { Activity } from "../types";

// Definimos los tipos de acciones que puede manejar el reducer.
export type ActivityActions = 
  { type: 'save-activity', payload: { activity: Activity } } |
  { type: 'set-activeId', payload: { id: Activity['id'] } } |
  { type: 'delete-activity', payload: { id: Activity['id'] } } |
  { type: 'restart-app' }

// Definimos el estado de la aplicación.
export type ActivityState = {
  activities: Activity[], // Lista de actividades.
  activeId: Activity['id'] | null // ID de la actividad que está siendo editada.
}

// Función para obtener las actividades desde localStorage.
const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem('activities')
  return activities ? JSON.parse(activities) : []
}

// Estado inicial del reducer.
export const initialState: ActivityState = {
  activities: localStorageActivities(), // Inicia con las actividades almacenadas en localStorage.
  activeId: null // No hay ninguna actividad activa al inicio.
}

// Reducer para manejar el estado de las actividades.
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
): ActivityState => {
  // Acción para guardar una actividad.
  if (action.type === 'save-activity') {
    const existingActivityIndex = state.activities.findIndex(activity => activity.id === action.payload.activity.id);
    let updatedActivities;
    if (existingActivityIndex !== -1) {
      // Si la actividad ya existe, actualízala.
      updatedActivities = state.activities.map(activity => 
        activity.id === action.payload.activity.id ? action.payload.activity : activity
      );
    } else {
      // Si es una nueva actividad, agrégala con un ID único.
      updatedActivities = [...state.activities, { ...action.payload.activity, id: uuidv4() }];
    }
    return {
      ...state,
      activities: updatedActivities,
      activeId: null // Reiniciar activeId después de guardar.
    };
  } 
  
  // Acción para establecer la ID de la actividad activa.
  if (action.type === 'set-activeId') {
    return {
      ...state, // Retornamos una copia del estado actual.
      activeId: action.payload.id
    };
  }

  // Acción para eliminar una actividad.
  if (action.type === 'delete-activity') {
    return {
      ...state,
      activities: state.activities.filter(activity => activity.id !== action.payload.id),
      activeId: null // Reiniciar activeId después de eliminar.
    };
  }

  // Acción para reiniciar la aplicación.
  if (action.type === 'restart-app') {
    return {
      activities: [], // Reiniciamos las actividades a un arreglo vacío.
      activeId: '' // Reiniciamos activeId.
    }
  }

  // Retornar el estado actual si la acción no es reconocida.
  return state;
}

/* 
Descripción del Reducer
Importaciones:

uuidv4: Para generar IDs únicos para nuevas actividades.
Activity: Tipo que define la estructura de una actividad.

Tipos de Acciones:
save-activity: Para guardar o actualizar una actividad.
set-activeId: Para establecer el ID de la actividad que está siendo editada.
delete-activity: Para eliminar una actividad.
restart-app: Para reiniciar la aplicación y limpiar todas las actividades.
Estado de la Aplicación:

activities: Lista de actividades.
activeId: ID de la actividad actualmente activa (en edición).
Función localStorageActivities:

Recupera las actividades almacenadas en localStorage si existen, de lo contrario, retorna un arreglo vacío.
Estado Inicial (initialState):

Inicializa activities con las actividades obtenidas de localStorage.
activeId se inicializa como null.
Reducer activityReducer:

Maneja las diferentes acciones (save-activity, set-activeId, delete-activity, restart-app) y actualiza el estado en consecuencia.
Retorna el estado actualizado dependiendo de la acción recibida.
Si la acción no es reconocida, retorna el estado actual sin cambios.
*/